export default class ApiResponse{
    public constructor(public data: object | undefined, public message: string, public success: boolean, public statusCode: number){
        this.data = data;
        this.message = message;
        this.success = success;
        this.statusCode = statusCode;
    }   
}
