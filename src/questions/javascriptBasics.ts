import {Answered} from "../enums/answered";
import {JavascriptCategories} from "../enums/javascriptCategories";

const initialQuestions = [
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
                explanation: "This is incorrect due to ..."
            }
        ]
    },
    {
        question: "What is an Array?",
        category: JavascriptCategories.Tech,
        answered: Answered.no,
        options: [
            {
                choice: "An object containing multiple values",
                isCorrect: true,
                explanation: "A primitive data type that stores multiple values"
            },
            {
                choice: "A type of function",
                isCorrect: false,
                explanation: "There are Functions or Methods. Methods are functions that are inside of a class"
            },
            {
                choice: "Multiple string variables",
                isCorrect: false,
                explanation: "An Array can contain multiple string values"
            },
            {
                choice: "A function of a class",
                isCorrect: false,
                explanation: "This is called a Method"
            }
        ]
    },
    {
        question: "What Object do you target in order to target DOM Nodes in the browser?",
        answered: Answered.no,
        category: JavascriptCategories.Tools,
        options: [
            {
                choice: "Document",
                isCorrect: true,
                explanation: "The Document object contains everything that is on your website"
            },
            {
                choice: "Window",
                isCorrect: false,
                explanation: "The window object is the whole browser window"
            },
            {
                choice: "View",
                isCorrect: false,
                explanation: "This is incorrect due to ..."
            },
            {
                choice: "Dom",
                isCorrect: false,
                explanation: "This is incorrect due to ..."
            }
        ]
    },
    {
        question: "How do you write a Class?",
        category: JavascriptCategories.Language,
        answered: Answered.no,
        options: [
            {
                choice: "Class X {}",
                isCorrect: true,
                explanation: "This is incorrect due to ..."
            },
            {
                choice: "New Class X {}",
                isCorrect: false,
                explanation: "This is incorrect due to ..."
            },
            {
                choice: "Class Object X {}",
                isCorrect: false,
                explanation: "This is incorrect due to ..."
            },
            {
                choice: "Class {}",
                isCorrect: false,
                explanation: "This is incorrect due to ..."

            }
        ]
    },
    {
        question: "What is [] + []?",
        category: JavascriptCategories.Tech,
        answered: Answered.no,
        options: [
            {
                choice: "Object",
                isCorrect: true,
                explanation: "An Array is an object"
            },
            {
                choice: "Array",
                isCorrect: false,
                explanation: "This is incorrect due to ..."
            },
            {
                choice: "Double Array",
                isCorrect: false,
                explanation: "This is incorrect due to ..."
            },
            {
                choice: "Who cares?",
                isCorrect: false,
                explanation: "This is incorrect due to ..."
            }
        ]
    }
];

export default {initialQuestions};

