import PizzaAPI from "~/config/pizzaAPI"
import { APIType } from "~/utils/types/dataType"
import { SizeAll } from "~/utils/types/size"

const url = (path: string = '') => `/size/${path}`

class SizeServices extends PizzaAPI {
    public async getAll(page?: number, limit: number = 6): Promise<APIType<SizeAll>> {
        let params = url('all')
        if (page && !isNaN(+page)) {
            params += `?page=${page}&limit=${limit}`
        }

        return await this.getAPI(params)
    }
}

const SizeAPI = new SizeServices()

export default SizeAPI