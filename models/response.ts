export class Response {
    code: number;
    data: any;

    constructor(code: number, data: any) {
        this.code = code;
        this.data = data;
    }
}