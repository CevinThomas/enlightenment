import {IsAnswered} from "../enums/isAnswered";

export function shuffle(array: any) {
    array.sort(() => Math.random() - 0.5);
}

// TODO: Ask Stack Overflow if there is a better way of approaching this (Do not want double loop)
export function resetQuestions(allQuestions: []): [] {
    const toReset = allQuestions.find(question => question.answered !== IsAnswered.no);
    if (toReset !== undefined) {
        allQuestions.forEach(question => {
            if (question.answered === IsAnswered.yes) {
                question.answered = IsAnswered.no
                return question.options.forEach(option => {
                    if (option.chosen === IsAnswered.yes) {
                        option.chosen = IsAnswered.no;
                    }
                })
            }
        })
        return allQuestions;
    }
}

export default function capitalizeFirstLetter(nameOfCategory: string) {
    return nameOfCategory.charAt(0).toUpperCase() + nameOfCategory.slice(1);
}

