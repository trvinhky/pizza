import { Card, CardActions, CardContent, CardMedia, Stack } from "@mui/material"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { convertUrl, formatCurrency } from "~/helpers"
import { PATH } from "~/utils/const/path"

const Title = styled.h4`
    color: #333;
    transition: 0.3s;
    
    &:hover {
        color: #fec524;
        opacity: 0.9;
    }
    a {
        color: inherit;
        text-decoration: none;
        display: block;
        display: -webkit-box;
        max-width: 100%;
        margin: 0 auto;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`

const Price = styled.span`
    color: red;
    font-weight: 300;
`

const Button = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 4px 15px;
    background-color: transparent;
    border: 1px solid currentColor;
    color: #fec524;
    border-radius: 4px;
    overflow: hidden;
    font-size: 16px;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
        background-color: #fec524;
        color: #fff;
    }
`

const CardCustom = styled(Card)`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const CardProduct = ({ url, name, id, price }: { url: string, name: string, id: string, price: number }) => {
    return (
        <CardCustom>
            <CardMedia
                sx={{ height: 200 }}
                image={convertUrl(url)}
                title={name}
            />
            <Stack
                direction="column"
                sx={{
                    justifyContent: "space-between",
                    flex: 1
                }}
            >
                <CardContent>
                    <Title>
                        <Link to={PATH.DETAIL.replace(":id", id)}>
                            {name}
                        </Link>
                    </Title>
                </CardContent>
                <CardActions style={{ justifyContent: 'space-between', padding: 16 }}>
                    <Price>
                        {formatCurrency(price)}
                    </Price>
                    <Button>
                        Đặt món
                    </Button>
                </CardActions>
            </Stack>
        </CardCustom>
    )
}

export default CardProduct