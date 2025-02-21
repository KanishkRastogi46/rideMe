export default class ApiError extends Error {
    public success: boolean;

    public constructor(public message: string, public statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.success = false;
        this.stack = new Error().stack;

        if (this.stack) {
            console.log(this.stack);
            process.exit(1);
        }
    }
}