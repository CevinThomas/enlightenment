import {BasicUser} from "../../interfaces/basicUser";

class HasPermissions {

    private user: BasicUser
    private hasAccess: boolean | string
    private licenceId: string

    constructor(user: BasicUser) {
        this.licenceId = user.licenceId
        this.hasAccess = false;
        this.user = user;
        this.hasPermissions();
    }

    private hasPermissions() {
        if (this.user.role !== "admin") return this.hasAccess = false;
        this.hasAccess = true;
        this.licenceId = this.user.licenceId;
    }

    public retrieveAccess() {
        return this.hasAccess;
    }

    public retrieveLicenceId() {
        return this.licenceId
    }

}

export default HasPermissions
