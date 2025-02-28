import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import LogoSrc from '~/assets/logo.png'
import styled from "styled-components";
import { Link, useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import { useSelector } from 'react-redux';
import { accountTokenSelector } from '~/store/selectors';
import { PATH } from '~/utils/const/path';

const Group = styled.header`
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 75px;
    display: block;
    background-color: #000;
    padding: 0 30px;
`

const Logo = styled(Link)`
    display: inline-block;

    img {
        height: 32px;
    }
`

const Header = () => {
    const token = useSelector(accountTokenSelector)
    const navigate = useNavigate();


    const handleCheckLogin = async () => {
        if (token) {
            navigate(PATH.INFO)
        } else navigate(PATH.LOGIN)
    }

    return (
        <Group>
            <Stack
                direction="row"
                sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: '100%',
                    height: '100%'
                }}
            >
                <Logo to='/'>
                    <img src={LogoSrc} alt='logo' />
                </Logo>
                <Avatar sx={{ cursor: 'pointer' }} onClick={handleCheckLogin}>
                    <PersonIcon />
                </Avatar>
            </Stack>
        </Group>
    )
}

export default Header