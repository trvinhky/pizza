import { Button, Container, Dialog, DialogActions, DialogTitle, Grid2 } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import TitleBox from "~/components/TitleBox"
import { convertGender } from "~/helpers"
import { useGlobalDataContext } from "~/hooks/globalData"
import AccountAPI from "~/services/account"
import { logOut, setInfo } from "~/store/slices/accountSlice"
import { PATH } from "~/utils/const/path"
import { Account } from "~/utils/types/account"

const Text = styled.p`
    font-weight: 600;

    span {
        font-weight: 400;
    }
`

const Info = () => {
    const [account, setAccount] = useState<Account>()
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const { setIsLoading } = useGlobalDataContext();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getInfoAccount = async () => {
        try {
            setIsLoading(true)
            const { data, status } = await AccountAPI.getOne()
            setIsLoading(false)
            if (status === 201) {
                dispatch(setInfo(data))
                setAccount(data)
            } else {
                navigate(PATH.LOGIN)
            }
        } catch (e) {
            setIsLoading(false)
            navigate(PATH.LOGIN)
        }
    }

    const handleLogOut = async () => {

        try {
            setIsLoading(true)
            const { message, status } = await AccountAPI.logOut()
            setIsLoading(false)
            if (status === 201) {
                dispatch(logOut())
                setOpen(false);
                alert(message)
                navigate(PATH.LOGIN)
            } else {
                navigate(PATH.LOGIN)
            }
        } catch (e) {
            setIsLoading(false)
            navigate(PATH.LOGIN)
        }
    }

    useEffect(() => {
        document.title = "Thông tin người dùng"
        getInfoAccount()
    }, [])


    return (
        <Container maxWidth="lg" sx={{ paddingY: '20px' }}>
            <TitleBox text="Thông tin người dùng" />
            <Grid2 container spacing={2}>
                <Grid2 size={6}>
                    <Text>
                        Tên: <span>{account?.acc_name}</span>
                    </Text>
                </Grid2>
                <Grid2 size={6}>
                    <Text>
                        Giới tính: <span>{convertGender(account?.acc_gender as string)}</span>
                    </Text>
                </Grid2>
                <Grid2 size={6}>
                    <Text>
                        Email: <span>{account?.acc_email}</span>
                    </Text>
                </Grid2>
                <Grid2 size={6}>
                    <Text>
                        SĐT: <span>{account?.acc_phone}</span>
                    </Text>
                </Grid2>
                <Grid2 size={12}>
                    <Text>
                        Địa chỉ: <span>{account?.acc_address}</span>
                    </Text>
                </Grid2>
            </Grid2>
            <Button variant="outlined" color="error" sx={{ marginTop: '20px' }} onClick={handleClickOpen}>
                Đăng xuất
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Bạn có muốn chắc đăng xuất?"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>Thoát</Button>
                    <Button onClick={handleLogOut} autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}

export default Info