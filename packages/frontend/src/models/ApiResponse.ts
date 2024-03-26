export type ApiResponse = {
    success: boolean;
    message: string;
}

export type ApiResponseWithData<T> = ApiResponse & {
    data: T;
}
