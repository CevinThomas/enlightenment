import {SeoCategories} from "../enums/seo";
import {Answered} from "../enums/answered";

const initialQuestions = [
    {
        question: "What is Pogo Sticking?",
        category: SeoCategories.analytics,
        answered: Answered.no,
        options: [
            {
                choice: "The act of visiting a website, then quickly leaving it",
                isCorrect: true,
                explanation: "This is incorrect due to ...",
            },
            {
                choice: "An SEO Tool",
                isCorrect: false,
                explanation: "This is incorrect due to ..."
            },
            {
                choice: "A way of Working",
                isCorrect: false,
                explanation: "This is incorrect due to ..."
            },
            {
                choice: "A website that is down",
                isCorrect: false,
                explanation: "This is incorrect due to ..."
            }
        ]
    },
    {
        question: "What tool can you use to track SEO of a website?",
        category: SeoCategories.analytics,
        answered: Answered.no,
        options: [
            {
                choice: "SEO Spider",
                isCorrect: true,
                explanation: "This is incorrect due to ..."
            },
            {
                choice: "Geometrix",
                isCorrect: false,
                explanation: "This is incorrect due to ..."
            },
            {
                choice: "Pingdom",
                isCorrect: false,
                explanation: "This is incorrect due to ..."
            },
            {
                choice: "Javascript",
                isCorrect: false,
                explanation: "This is incorrect due to ..."
            }
        ]
    },
    {
        question: "What do you mean by Backlink?",
        category: SeoCategories.analytics,
        answered: Answered.no,
        options: [
            {
                choice: "Incoming Links",
                isCorrect: true,
                explanation: "The incoming links to your website or webpage are referred to as Backlink. It is also called as an inbound link."
            },
            {
                choice: "Option 26",
                isCorrect: false,
                explanation: "This is incorrect due to ..."
            },
            {
                choice: "Option 34",
                isCorrect: false,
                explanation: "This is incorrect due to ..."
            },
            {
                choice: "Option 47",
                isCorrect: false,
                explanation: "This is incorrect due to ..."
            }
        ]
    },
    {
        question: "What is the main purpose of using keyword in SEO?",
        category: SeoCategories.tools,
        answered: Answered.no,
        options: [
            {
                choice: "Keywords are used by search engines to populate the subjects over the internet",
                isCorrect: true,
                explanation: "Search engine stores keywords in the database, and when a search is done, it will come up with the best possible match."
            },
            {
                choice: "Option 24",
                isCorrect: false,
                explanation: "This is incorrect due to ..."
            },
            {
                choice: "Option 32",
                isCorrect: false,
                explanation: "This is incorrect due to ..."
            },
            {
                choice: "Option 41",
                isCorrect: false,
                explanation: "This is incorrect due to ..."

            }
        ]
    },
    {
        question: "What is keyword stemming?",
        category: SeoCategories.tools,
        answered: Answered.no,
        options: [
            {
                choice: "The process of finding out new keywords",
                isCorrect: true,
                explanation: "TThe process of finding out new keywords from the root keyword from the search query is referred to as keywords stemming. Adding a prefix, suffix, or pluralization can be used to create the new keyword."
            },
            {
                choice: "Option 2",
                isCorrect: false,
                explanation: "This is incorrect due to ..."
            },
            {
                choice: "Option 3",
                isCorrect: false,
                explanation: "This is incorrect due to ..."
            },
            {
                choice: "Option 4",
                isCorrect: false,
                explanation: "This is incorrect due to ..."
            }
        ]
    }
];

export default {initialQuestions};

