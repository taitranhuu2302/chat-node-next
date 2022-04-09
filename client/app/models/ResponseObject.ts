export interface IResponseObject<T> {
    status: number;
    message: string;
    body: T[] | string;
}