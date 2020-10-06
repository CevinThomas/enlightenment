import {IsAnswered} from "../enums/isAnswered";
import * as SecureStore from "expo-secure-store";

export function shuffle(array: any) {
    array.sort(() => Math.random() - 0.5);
}

// TODO: Ask Stack Overflow if there is a better way of approaching this (Do not want double loop)
export function resetQuestions(allQuestions: []): [] {
    const toReset = allQuestions.find(question => question.answered !== IsAnswered.no);
    if (toReset !== undefined) {
        allQuestions.forEach(question => {
            if (question.answered === IsAnswered.yes) {
                question.answered = IsAnswered.no;
                return question.options.forEach(option => {
                    if (option.chosen === IsAnswered.yes) {
                        option.chosen = IsAnswered.no;
                    }
                });
            }
        });
    }
    return allQuestions;
}

export async function makeHttpsRequest(url: string, method: string, dataToPost?: any): Promise<any> {
    if (method === "POST") {
        return fetch(url, {
            method: "POST",
            mode: 'no-cors',
            body: JSON.stringify(dataToPost)
        }).then(response => response.json()).then(response => response);
    } else if (method === "GET") {
        const token = await SecureStore.getItemAsync("token");
        return fetch(url, {
            method: "GET",
            headers: {
                Accept: 'application/json',
                Authorization: token,
                "Content-type": "application/json"
            },
            mode: "no-cors",
        }).then(response => response.json()).then(response => response).catch(e => console.log(e));
    }
}

export default function capitalizeFirstLetter(nameOfCategory: string) {
    return nameOfCategory.charAt(0).toUpperCase() + nameOfCategory.slice(1);
}

