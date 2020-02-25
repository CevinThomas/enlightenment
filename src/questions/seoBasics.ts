const initialQuestions = [
    {
        question: "What is your favorite color?",
        options: [
            {
                choice: "Red",
                isCorrect: false
            },
            {
                choice: "Blue",
                isCorrect: false,
            },
            {
                choice: "Orange",
                isCorrect: false,
            },
            {
                choice: "Purple",
                isCorrect: true
            }
        ]
    },
    {
        question: "What is your favorite food?",
        options: [
            {
                choice: "Tacos",
                isCorrect: false
            },
            {
                choice: "Fish",
                isCorrect: true,
            },
            {
                choice: "Meat",
                isCorrect: false,
            },
            {
                choice: "Fruits",
                isCorrect: false
            }
        ]
    }
];

export default {initialQuestions};

