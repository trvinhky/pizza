import PizzaAPI from "~/config/pizzaAPI";
import { APIType } from "~/utils/types/dataType";
import { Product, ProductAll } from "~/utils/types/product";

const url = (path: string = '') => `/product/${path}`

export interface ParamsProduct {
    page?: number;
    title?: string;
    limit?: number;
}

class ProductServices extends PizzaAPI {
    public async getOne(id: string): Promise<APIType<Product>> {
        return await this.getAPI(url(`info/${id}`))
    }

    public async getAll(data: ParamsProduct): Promise<APIType<ProductAll>> {
        const { page, limit, title } = data
        let params = url('all?')
        if (page && !isNaN(+page)) {
            params += `page=${page}&limit=${limit ?? 6}`
        }

        if (title) params += `&title=${title}`

        return await this.getAPI(params)
    }
}

const ProductAPI = new ProductServices()

export default ProductAPI