export const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num);
};

export const convertGender = (gender: string) => {
    const code = Number(gender)
    return code === 1 ? "Nữ" : code === 2 ? "Khác" : "Nam"
}

export const convertUrl = (url: string, host: string = import.meta.env.VITE_URL_BACKEND) => `${host}\\${url}`.replace(/\\/g, '/')