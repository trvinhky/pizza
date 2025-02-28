export interface APIType<T> {
    message: String
    data: T
    status: number
}

export interface Option {
    value: string;
    label: string;
}

export interface Error {
    status: number;
    data: { message: string }
}