import { Product } from "~/utils/types/product"
import { Size } from "~/utils/types/size"

export interface Detail {
    pro_Id: string
    size_Id: string
    detail_price: number
}

export interface DetailInfo extends Detail {
    product: Product
    size: Size
}

export interface DetailAll {
    count: number
    details: DetailInfo[]
}