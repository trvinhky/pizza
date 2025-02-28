import { Button, Container, Grid2, Stack } from "@mui/material"
import styled from "styled-components"
import { styled as custom } from "@mui/material/styles";
import Counter from "~/components/Counter"
import TitleBox from "~/components/TitleBox"
import CardProduct from "~/components/CardProduct";
import { useEffect, useState } from "react";
import { DetailInfo } from "~/utils/types/detail";
import DetailAPI, { ParamsDetail } from "~/services/detail";
import { useNavigate, useParams } from "react-router-dom";
import { convertUrl, formatCurrency } from "~/helpers";
import { useGlobalDataContext } from "~/hooks/globalData";

const BoxImg = styled.span`
    display: inline-block;
    img {
        width: 100%;
        object-fit: cover;
    }
`

const Price = styled.span`
    color: red;
    font-weight: 500;
    font-size: 22px;
    display: inline-block;
    padding-bottom: 20px;
`

const CustomInput = styled.input`
    &:checked + .choose {
        background-color: #db1a2a;
        border-color: #db1a2a;
    }

    &:checked + .choose::after {
        content: "";
        position: absolute;
        left: 5px;
        top: 2px;
        width: 6px;
        height: 12px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
    }
`

const Choose = styled.span`
    width: 20px;
    height: 20px;
    border: 2px solid #db1a2a;
    display: inline-block;
    position: relative;
    margin-right: 8px;
`

const ChooseText = styled.label`
    cursor: pointer;
`

const ButtonCustom = custom(Button)({
    borderRadius: '30px',
    textTransform: 'uppercase',
    padding: '10px 60px',
    backgroundColor: '#fec524',
    color: '#333',
    margin: '20px 0 30px'
})

const SubTitle = styled.h4`
    text-align: center;
    font-size: 20px;
    text-transform: uppercase;
    font-weight: 600;
    padding: 10px 0 25px;
    margin-top: 30px;
`

const Detail = () => {
    const [productData, setProductData] = useState<DetailInfo[]>([])
    const [dataDetail, setDataDetail] = useState<DetailInfo[]>([])
    const { id } = useParams();
    const navigate = useNavigate()
    const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
    const { setIsLoading } = useGlobalDataContext();
    const [count, setCount] = useState(1);

    // Hàm cập nhật giá khi chọn size
    const handleSizeChange = (sizeId: string) => {
        const selectedItem = dataDetail.find((item) => item.size_Id === sizeId);
        setSelectedPrice(selectedItem ? selectedItem.detail_price * count : null);
    };

    const getProductAll = async (params: ParamsDetail) => {
        setIsLoading(true)
        try {
            const { data, status } = await DetailAPI.getAll(params)
            if (status === 201 && data.count > 0) {
                setProductData(data.details)
            }
        } catch (e) {
            console.log(e)
        }
        setIsLoading(false)
    }

    const getProductData = async (id: string) => {
        setIsLoading(true)
        try {
            const { data, status } = await DetailAPI.getAll({ pro: id })
            if (status === 201 && data.count > 0) {
                setDataDetail(data.details)
                if (data.details[0]) {
                    document.title = data.details[0].product.pro_name as string
                    await getProductAll({
                        page: 1,
                        limit: 4,
                        size: data.details[0]?.size_Id
                    })
                }
            }
        } catch (e) {
            console.log(e)
        }
        setIsLoading(false)
    }

    const handleCount = (num: number) => {
        setCount(num)
        if (selectedPrice !== null) {
            setSelectedPrice(selectedPrice * num)
        }
    }

    useEffect(() => {
        if (id) getProductData(id)
        else navigate(-1)
    }, [id])

    return (
        <Container maxWidth="lg" sx={{ paddingY: '20px' }}>
            <TitleBox text={productData[0]?.product.pro_name as string} />
            <Grid2 container spacing={2}>
                <Grid2 size={6}>
                    <Stack
                        direction="row"
                        sx={{
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <BoxImg>
                            <img
                                src={convertUrl(productData[0]?.product.pro_url as string)}
                                alt={productData[0]?.product.pro_name}
                            />
                        </BoxImg>
                    </Stack>
                </Grid2>
                <Grid2 size={6}>
                    <Price>
                        {formatCurrency(selectedPrice as number)}
                    </Price>
                    <form method="post">
                        <p style={{ fontSize: 18 }}>Chọn cỡ bánh:</p>
                        <Grid2 container spacing={2} sx={{ paddingY: '20px' }}>
                            {
                                dataDetail?.map((data) => (
                                    <Grid2 size={6} key={data.size_Id}>
                                        <ChooseText htmlFor={data.size_Id}>
                                            <Stack
                                                direction="row"
                                                spacing={1}
                                                sx={{
                                                    alignItems: "center",
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                <CustomInput
                                                    type="radio"
                                                    name="size"
                                                    id={data.size_Id}
                                                    hidden
                                                    value={data.size_Id}
                                                    onChange={() => handleSizeChange(data.size_Id)}
                                                />
                                                <Choose className="choose"></Choose>
                                                <span>{data.size.size_name}</span>
                                            </Stack>
                                        </ChooseText>
                                    </Grid2>
                                ))
                            }
                        </Grid2>
                        <Counter count={count} hanldeCount={handleCount} />
                        <ButtonCustom variant="contained" type="submit">Đặt món</ButtonCustom>
                        <p style={{ fontWeight: 500, paddingBottom: 10 }}>Mô tả:</p>
                        <p>
                            {productData[0]?.product.pro_desc}
                        </p>
                    </form>
                </Grid2>
            </Grid2>
            <SubTitle>Sản phẩm liên quan</SubTitle>
            <Grid2 container spacing={2}>
                {
                    productData?.map((item) => (
                        <Grid2 size={3} key={item.pro_Id + item.size_Id}>
                            <CardProduct
                                id={item.pro_Id}
                                name={item.product.pro_name as string}
                                price={item.detail_price}
                                url={item.product.pro_url as string}
                            />
                        </Grid2>
                    ))
                }
            </Grid2>
        </Container>
    )
}

export default Detail