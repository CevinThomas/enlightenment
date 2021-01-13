import DatabaseOperations from "../../../classes/database/databaseOperations";
import RouteResponseClass from "../../../classes/routes/routeResponseClass";
import Results, { NewResults } from "../../../interfaces/results";

async function getResults(email: string): Promise<RouteResponseClass> {
  const database = new DatabaseOperations();
  await database.initiateConnection();

  try {
    const results = await database.getResultProperty(email);
    if (!results) {
      return new RouteResponseClass(203, "No results found", {});
    }
    const propertiesWeWant = results.results.map((results: Results) => {
      return {
        id: results.id,
        subjectName: results.subjectName,
        category: results.category,
        groupName: results.groupName,
        individualQuestions: results.individualQuestions,
        areaName: results.areaName,
        tags: results.tags,
        totalQuestions: results.totalQuestions,
        correct: results.correct,
        percentage: results.percentage,
      };
    });
    let uniqueSubjectNames: Array<string> = [];
    let uniqueAreaNames: Array<string> = [];

    const uniqueAreaNameWithSubjects: Array<{
      areaName: string;
      subjects: Array<string>;
    }> = [];

    propertiesWeWant.forEach((result: NewResults) => {
      if (!uniqueAreaNames.includes(result.areaName)) {
        uniqueAreaNameWithSubjects.push({
          areaName: result.areaName,
          subjects: [result.subjectName],
        });
        uniqueAreaNames.push(result.areaName);
        uniqueSubjectNames.push(result.subjectName);
      }

      if (
        uniqueAreaNames.includes(result.areaName) &&
        !uniqueSubjectNames.includes(result.subjectName)
      ) {
        const elementToUpdate = uniqueAreaNameWithSubjects.find(
          (area) => area.areaName === result.areaName
        );
        elementToUpdate?.subjects.push(result.subjectName);
        uniqueSubjectNames.push(result.subjectName);
      }
    });

    return new RouteResponseClass(200, "Here is the results.", {
      results: propertiesWeWant,
      uniqueAreaAndSubjects: uniqueAreaNameWithSubjects,
    });
  } catch (e) {
    console.log(e);
    return new RouteResponseClass(500, "Results could not be gathered", {});
  } finally {
    await database.terminateConnection();
  }
}

module.exports = getResults;
