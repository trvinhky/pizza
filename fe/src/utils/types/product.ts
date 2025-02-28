export interface Product {
    pro_Id: string
    pro_name?: string
    pro_desc?: string
    pro_url?: string
    createdAt?: Date
    updatedAt?: Date
}

export interface ProductAll {
    count: number
    products: Product[]
}