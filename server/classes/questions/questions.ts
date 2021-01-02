const {ObjectID} = require('mongodb');

class Questions {

    questionsData: any | undefined;

    constructor(questions: any) {
        this.questionsData = questions;
    }

    generateObjectIdForGroupId() {
        const idToUse = new ObjectID();
        this.questionsData.forEach((question: { groupId: any; }) => {
            question.groupId = idToUse;
        });
    }

    generateLowerCaseProperties() {
        this.questionsData.forEach((question: {category: string, groupName: string}) => {
            question.category = question.category.toLowerCase();
            question.groupName = question.groupName.toLowerCase();
        })
    }
}

export = Questions
