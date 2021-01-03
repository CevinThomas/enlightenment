import * as SecureStore from "expo-secure-store";
import { IsAnswered } from "../enums/isAnswered";

export function shuffle(array: any) {
  array.sort(() => Math.random() - 0.5);
}

export function resetQuestions(allQuestions: []): [] {
  const toReset = allQuestions.find(
    (question) => question.answered !== IsAnswered.no
  );
  if (toReset !== undefined) {
    allQuestions.forEach((question) => {
      if (question.answered === IsAnswered.yes) {
        question.answered = IsAnswered.no;
      }
      if (question.answeredCorrectly === IsAnswered.yes) {
        question.answeredCorrectly = IsAnswered.no;
      }
    });
  }
  return allQuestions;
}

export async function makeHttpsRequest(
  url: string,
  method: string,
  dataToPost?: any
): Promise<any> {
  if (method === "POST") {
    const token = await SecureStore.getItemAsync("token");
    return fetch(url, {
      method: "POST",
      mode: "no-cors",
      headers: {
        Authorization: token,
        "Content-type": "application/json",
      },
      body: JSON.stringify(dataToPost),
    })
      .then((response) => response.json())
      .then((response) => response)
      .catch((e) => console.log(e));
  } else if (method === "GET") {
    const token = await SecureStore.getItemAsync("token");
    return fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: token,
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => response)
      .catch((e) => console.log(e));
  }
}

export default function capitalizeFirstLetter(nameOfCategory: string): string {
  return nameOfCategory.charAt(0).toUpperCase() + nameOfCategory.slice(1);
}

export function capitalizeFirstLetterInArray(array: Array<string>) {
  const arrayWithCapitalized = array.map((str) => {
    return capitalizeFirstLetter(str);
  });
  return arrayWithCapitalized;
}
