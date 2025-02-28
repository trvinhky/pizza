import PizzaAPI from "~/config/pizzaAPI";
import { Account, AccountLogin, AccountRegister } from "~/utils/types/account";
import { APIType } from "~/utils/types/dataType";

const url = (path: string = '') => `/account/${path}`

interface AccountUpdate {
    acc_address?: string
    acc_phone?: string
    acc_name?: string
    acc_gender?: string
}

class AccountServices extends PizzaAPI {
    public async register(data: AccountRegister): Promise<APIType<undefined>> {
        return await this.postAPI(url('create'), data)
    }

    public async login(data: { password: string, email: string }): Promise<APIType<AccountLogin>> {
        return await this.postAPI(url('login'), data)
    }

    public async updateToken(): Promise<APIType<AccountLogin>> {
        return await this.getAPI(url('token'))
    }

    public async logOut(): Promise<APIType<undefined>> {
        return await this.deleteAPI(url('logout'))
    }

    public async getOne(): Promise<APIType<Account>> {
        return await this.getAPI(url('info'))
    }

    public async update(data: AccountUpdate): Promise<APIType<undefined>> {
        return await this.putAPI(url('update'), data)
    }
}

const AccountAPI = new AccountServices()

export default AccountAPI