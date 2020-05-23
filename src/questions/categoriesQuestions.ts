import {JavascriptCategories} from "../enums/javascriptCategories";
import {Answered} from "../enums/answered";

const javascript = {
    variables: {
        questions: [
            {
                question: "How do you declare a variable?",
                category: JavascriptCategories.Language,
                answered: Answered.no,
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




export default javascript
