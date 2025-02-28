import { useEffect, useState } from "react";
import { Container, TextField, Box, Stack, MenuItem } from "@mui/material";
import ButtonCustom from "~/components/ButtonCustom";
import TitleBox from "~/components/TitleBox";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { PATH } from "~/utils/const/path";
import AccountAPI from "~/services/account";
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

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        gender: "",
        address: "",
        phone: ""
    });
    const navigate = useNavigate();
    const { setIsLoading } = useGlobalDataContext();

    useEffect(() => {
        document.title = 'Tạo tài khoản'
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            setIsLoading(true)
            const { status, message } = await AccountAPI.register({
                email: formData.email as string,
                password: formData.password as string,
                address: formData.address as string,
                phone: formData.phone as string,
                name: formData.name as string,
                gender: formData.gender as string
            })
            setIsLoading(false)

            if (status === 200) {
                navigate(PATH.LOGIN)
            } else console.log(message)
        } catch (e) {
            setIsLoading(false)
            console.log(e)
        }
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{ mt: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <TitleBox text="Tạo tài khoản" />
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, width: "100%" }}>
                    <TextField
                        fullWidth
                        label="Họ và tên"
                        name="name"
                        variant="outlined"
                        margin="normal"
                        value={formData.name}
                        onChange={handleChange}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#fec524' }
                            }
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        variant="outlined"
                        margin="normal"
                        value={formData.email}
                        onChange={handleChange}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#fec524' }
                            }
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Mật khẩu"
                        name="password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        value={formData.password}
                        onChange={handleChange}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#fec524' }
                            }
                        }}
                    />
                    <TextField
                        select
                        fullWidth
                        label="Giới tính"
                        name="gender"
                        variant="outlined"
                        margin="normal"
                        value={formData.gender}
                        onChange={handleChange}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#fec524' }
                            }
                        }}
                    >
                        <MenuItem value="0">Nam</MenuItem>
                        <MenuItem value="1">Nữ</MenuItem>
                        <MenuItem value="2">Khác</MenuItem>
                    </TextField>
                    <TextField
                        fullWidth
                        label="Địa chỉ"
                        name="address"
                        variant="outlined"
                        margin="normal"
                        value={formData.address}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#fec524' }
                            }
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Số điện thoại"
                        name="phone"
                        type="tel"
                        variant="outlined"
                        margin="normal"
                        value={formData.phone}
                        onChange={handleChange}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#fec524' }
                            }
                        }} />
                    <Stack
                        direction="row"
                        sx={{
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: '15px'
                        }}
                    >
                        <ButtonCustom text="Đăng ký" />
                    </Stack>
                </Box>
                <Text>
                    Đã có tài khoản? <Link to={PATH.LOGIN}>Đăng nhập ngay</Link>
                </Text>
            </Box>
        </Container>
    );
};

export default Register;
