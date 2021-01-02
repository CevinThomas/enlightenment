interface UserInformation {
    name: string;
    email: string;
    licenceId: string;
}

interface UserInformationWithPassword extends UserInformation {
    password: string
}
