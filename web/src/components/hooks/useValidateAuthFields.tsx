import React, {useEffect} from 'react';

const UseValidateAuthFields = (email: string | undefined, password: string | undefined) => {

    const [emailError, setEmailError] = React.useState("");
    const [passwordError, setPasswordError] = React.useState("");

    useEffect(() => {
        validateEmailHandler(email);
        validatePasswordHandler(password);
    }, [email, password]);

    function validateEmailHandler(email: string | undefined) {
        if (email !== undefined) {
            const valid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            const isValidEmail = valid.test(String(email).toLowerCase());
            if (email.length === 0) return setEmailError("Email cannot be empty.");
            if (isValidEmail === false) return setEmailError("Please enter a valid email address.");
            setEmailError("");
        }
    }

    function validatePasswordHandler(password: string | undefined) {
        if (password !== undefined) {
            if (password === "") return setPasswordError("Password cannot be empty.");
            if (password.length < 8) return setPasswordError("Password must be at least 8 symbols.");
            setPasswordError("");
        }
    }

    return [emailError, passwordError];
};

export default UseValidateAuthFields;
