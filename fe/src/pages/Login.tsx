import { useState } from "react";
import { Container, TextField, Box, Stack } from "@mui/material";
import ButtonCustom from "~/components/ButtonCustom";
import TitleBox from "~/components/TitleBox";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { PATH } from "~/utils/const/path";
import AccountAPI from "~/services/account";
import { useDispatch } from "react-redux";
import { loginAccount } from "~/store/slices/accountSlice";
import { useGlobalDataContext } from "~/hooks/globalData";

const Text = styled.p`
    text-align: center;
    padding-top: 20px;
    a {
        color: red;
        font-weight: 300;
        text-decoration: none;
    }
`

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { setIsLoading } = useGlobalDataContext();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            setIsLoading(true)
            const { data, message, status } = await AccountAPI.login({
                email: email as string,
                password: password as string
            })
            setIsLoading(false)

            if (status === 201) {
                dispatch(loginAccount(data.token))
                navigate("/")
            } else console.log(message)
        } catch (e) {
            setIsLoading(false)
            console.log(e)
        }

    };

    return (
        <Container maxWidth="xs">
            <Box sx={{ mt: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <TitleBox text="Đăng nhập" />
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, width: "100%" }}>
                    <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#fec524' } } }}
                    />
                    <TextField
                        fullWidth
                        label="Mật khẩu"
                        variant="outlined"
                        margin="normal"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#fec524' } } }}
                    />
                    <Stack
                        direction="row"
                        sx={{
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: '15px'
                        }}
                    >
                        <ButtonCustom text="Đăng nhập" />
                    </Stack>
                </Box>
                <Text>
                    Khách hàng mới? <Link to={PATH.REGISTER}>Tạo tài khoản</Link>
                </Text>
            </Box>
        </Container>
    );
};

export default Login;
