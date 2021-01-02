import {ProgrammingCategories} from "../enums/programmingCategories";
import {IsAnswered} from "../enums/isAnswered";

const pythonQuestions = {
    variables: {
        questions: [
            {
                question: "How do you declare a variable?",
                category: ProgrammingCategories.Language,
                answered: IsAnswered.no,
                options: [
                    {
                        choice: "Let, Const or Var =",
                        isCorrect: true,
                        explanation: "ES6 new way of declaring."
                    },
                    {
                        choice: "Variable =",
                        isCorrect: false,
                        explanation: "This is incorrect due to ..."
                    },
                    {
                        choice: "New Variable =",
                        isCorrect: false,
                        explanation: "This is incorrect due to ..."
                    },
                    {
                        choice: "Varr =",
                        isCorrect: false,
                        explanation: "This is incorrect due to ...",
                    }
        ]
    }],
},
    functions: {

    }
}




export default pythonQuestions
