import React, {useEffect, useState} from 'react';
import AllQuestionsView from "./allQuestionsView";
import Cookies from 'universal-cookie';
import {Redirect} from "react-router-dom";
import Axios from "axios"
import EnvVariables from "../../envVariables";
import {QuestionsData} from "../../interfaces/questionsData";

const AllQuestionsContainer = () => {

    const [fetchedQuestions, setFetchedQuestions] = useState<Array<QuestionsData>>([]);

    useEffect(() => {
        fetchAdminsLicenceGroup().then(r => {
            if (r.data.data !== undefined) return fetchStoredQuestions(r.data.data).then(r => {
                if (r.data.data !== undefined) return setFetchedQuestions(r.data.data)
            }).catch(e => console.log(e))
        }).catch(e => console.log(e));
    }, [])

    const ComponentToShow = () => {
        const cookie = new Cookies()
        if (cookie.get("token") !== undefined) {
            return <AllQuestionsView fetchedQuestions={fetchedQuestions}/>
        } else {
            return <Redirect to={"/"}/>
        }
    }

    async function fetchAdminsLicenceGroup() {
        const cookie = new Cookies()
        return await Axios.get(`${EnvVariables.API_ENDPOINTS.GETUSERLICENCE}`, {
            headers: {
                Authorization: cookie.get("token")
            }
        });
    }

    async function fetchStoredQuestions(userLicence: string) {
        const cookie = new Cookies()
        return await Axios.get(`${EnvVariables.API_ENDPOINTS.GETQUESTIONSBYLICENCE}?licence=${userLicence}`, {
            headers: {
                Authorization: cookie.get("token")
            }
        });
    }



    return (
        <ComponentToShow/>
    );
};

export default AllQuestionsContainer;
