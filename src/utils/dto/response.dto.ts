export class ResponseDto<T> {
    constructor(
        public readonly data: T,
        public readonly message: string = 'success',
        public readonly statusCode: number = 200,
    ) { }
}