import {Answered} from "../enums/answered";

export function shuffle(array: any) {
    array.sort(() => Math.random() - 0.5);
}

// TODO: Ask Stack Overflow if there is a better way of approaching this (Do not want double loop)
export function resetQuestions(allQuestions: []): void {
    const toReset = allQuestions.find(question => question.answered !== Answered.no);
    if (toReset !== undefined) {
        allQuestions.forEach(question => {
            if (question.answered === Answered.yes) {
                question.answered = Answered.no
                return question.options.forEach(option => option.chosen === Answered.yes ? option.chosen = Answered.no : null)
            }
        })
    }
}
