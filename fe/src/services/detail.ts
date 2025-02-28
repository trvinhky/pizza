import PizzaAPI from "~/config/pizzaAPI";
import { APIType } from "~/utils/types/dataType";
import { DetailAll } from "~/utils/types/detail";

const url = (path: string = '') => `/detail/${path}`

export interface ParamsDetail {
    page?: number;
    title?: string;
    limit?: number;
    pro?: string;
    size?: string;
    name?: string;
    order?: "desc" | "asc"
}

class DetailServices extends PizzaAPI {
    public async getAll(data: ParamsDetail): Promise<APIType<DetailAll>> {
        const { page, limit, title, pro, size, order, name } = data
        let params = url('all?')
        if (page && !isNaN(+page)) {
            params += `page=${page}&limit=${limit ?? 6}`
        }

        if (title) params += `&title=${title}`
        if (pro) params += `&pro=${pro}`
        if (size) params += `&size=${size}`
        if (order) params += `&order=${order}`
        if (name) params += `&name=${name}`

        return await this.getAPI(params)
    }
}

const DetailAPI = new DetailServices()

export default DetailAPI