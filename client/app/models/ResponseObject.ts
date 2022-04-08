export interface ResponseObject<T> {
    status: number;
    message: string;
    body: T[] | string;
}