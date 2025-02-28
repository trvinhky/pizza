export interface AccountLogin {
    token: string
}

export interface AccountRegister {
    email: string
    password: string
    name: string
    address: string
    phone: string
    gender: string
}

export interface Account {
    acc_Id: string
    acc_email: string
    acc_name?: string
    acc_address?: string
    acc_phone?: string
    acc_gender?: string
    createdAt?: Date
    updatedAt?: Date
}