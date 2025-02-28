import { Container, Grid2 } from '@mui/material'
import styled from 'styled-components'
import BGImage from '~/assets/bg_footer.png'
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';

const BoxContact = styled.div`
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: cover;
    padding: 30px 0;
`

const SubTitle = styled.h4`
    font-size: 18px;
    font-weight: 600;
    color: #fff;
    margin-bottom: 15px;
`

const Text = styled.p`
    color: #fff;
    display: flex;
    align-items: center;
    gap: 10px;
    padding-bottom: 15px;
    font-size: 14px;
`

const AuthText = styled.p`
    padding: 15px 0;
    text-align: center;
    font-size: 12px;
`

const Footer = () => {
    return (
        <footer style={{ marginTop: 20 }}>
            <BoxContact style={{ backgroundImage: `url(${BGImage})` }}>
                <Container maxWidth="lg">
                    <Grid2 container spacing={2}>
                        <Grid2 size={3}>
                            <SubTitle className='lobster-regular'>Giới thiệu</SubTitle>
                            <Text>
                                Thứ 3 hàng tuần - Ưu đãi Mua 1 Tặng 1 - ÁP DỤNG cho các dòng bánh Pizza.
                            </Text>
                        </Grid2>
                        <Grid2 size={3}>
                            <SubTitle className='lobster-regular'>Thông tin liên hệ </SubTitle>
                            <Text>
                                <AddLocationAltIcon color='inherit' sx={{ color: "#fff !important" }} /> Tầng 4, tòa nhà Flemington, số 182, đường Lê Đại Hành, phường 15, quận 11, Tp. Hồ Chí Minh.
                            </Text>
                            <Text>
                                <AddIcCallIcon color='inherit' sx={{ color: "#fff !important" }} /> 1900.636.099
                            </Text>
                            <Text>
                                <AttachEmailIcon color='inherit' sx={{ color: "#fff !important" }} /> abc@gmail.com
                            </Text>
                        </Grid2>
                        <Grid2 size={3}>
                            <SubTitle className='lobster-regular'>Fanpage </SubTitle>
                        </Grid2>
                    </Grid2>
                </Container>
            </BoxContact>
            <AuthText>Copyright © 2025 Pizza House. Powered by Haravan</AuthText>
        </footer>
    )
}

export default Footer