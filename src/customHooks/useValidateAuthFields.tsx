import React, {useEffect} from 'react';

const UseValidateAuthFields = (name, email, password) => {

    const [nameError, setNameError] = React.useState("");
    const [emailError, setEmailError] = React.useState("");
    const [passwordError, setPasswordError] = React.useState("");

    useEffect(() => {
        validateNameHandler(name);
        validateEmailHandler(email);
        validatePasswordHandler(password);
    }, [name, email, password]);


    function validateNameHandler(name) {
        if (name.length === 0) return setNameError("Name cannot be empty.");
        setNameError("");
    }

    function validateEmailHandler(email) {
        if (email.length === 0) return setEmailError("Email cannot be empty.");
        setEmailError("");
    }

    function validatePasswordHandler(password) {
        if (password === "") return setPasswordError("Password cannot be empty.");
        if (password.length < 8) return setPasswordError("Password must be at least 8 symbols.");
        setPasswordError("");
    }

    return [nameError, emailError, passwordError];
};

export default UseValidateAuthFields;
