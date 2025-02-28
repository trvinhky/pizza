export interface Size {
    size_Id: string
    size_name?: string
}

export interface SizeAll {
    count: number
    sizes: Size[]
}