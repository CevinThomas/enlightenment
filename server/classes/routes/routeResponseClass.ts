class RouteResponseClass implements RouteResponse {

    message: string | undefined;
    statusCode: number | undefined;
    data?: any | undefined;

    constructor(statusCode: number, message: string, data?: any) {
        this.message = message;
        this.statusCode = statusCode;
        this.data = data;
    }
}

export = RouteResponseClass
