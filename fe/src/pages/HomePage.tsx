import { Box, Button, Container, Grid2, Stack, TextField } from "@mui/material"
import styled from "styled-components"
import Banner from "~/assets/img_home_welcome.png"
import TitleBox from "~/components/TitleBox"
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import BoxIntro from "~/components/BoxIntro";
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import BreakfastDiningIcon from '@mui/icons-material/BreakfastDining';
import TitlePage from "~/components/TitlePage";
import CardProduct from "~/components/CardProduct";
import ButtonCustom from "~/components/ButtonCustom";
import { Link, useSearchParams } from "react-router-dom";
import SizeAPI from "~/services/size";
import { useEffect, useState } from "react";
import { Size } from "~/utils/types/size";
import DetailAPI, { ParamsDetail } from "~/services/detail";
import { DetailInfo } from "~/utils/types/detail";
import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";
import { useGlobalDataContext } from "~/hooks/globalData";

const Group = styled.section`
    background-color: #f7f7f7;
`

const BoxImg = styled.span`
    display: inline-block;
    img {
        width: 100%;
        max-width: 380px;
        object-fit: cover;
    }
`

const SubTitle = styled.h4`
    font-weight: 600;
    font-size: 20px;
    color: #333;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    font-family: "Quicksand", serif;
    padding-bottom: 10px;
    margin-bottom: 10px;
`

const ListItem = styled.ul`
    padding-top: 15px;
    li {
        margin-bottom: 15px;
    }
    li.active a {
        background-color: #fec524;
        color: #333;
    }
    a {
        text-decoration: none;
        display: block;
        padding: 10px 25px;
        background-color: transparent;
        border: 1px solid #fec524;
        color: #fec524;
        font-weight: 500;
        transition: 0.3s;
        border-radius: 20px;

        &:hover {
            background-color: #fec524;
            color: #333;
        }
    }
`

const HomePage = () => {
    const [sizeData, setSizeData] = useState<Size[]>([])
    const [productData, setProductData] = useState<DetailInfo[]>([])
    const [activeId, setActiveId] = useState('')
    const [searchParams] = useSearchParams();
    const searchSize = searchParams.get('size');
    const searchText = searchParams.get('text');
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [search, setSearch] = useState("");
    const { setIsLoading } = useGlobalDataContext();

    const getAllProduct = async (params: ParamsDetail) => {
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

    const getAllSize = async (sizeId?: string, text?: string) => {
        setIsLoading(true)
        try {
            const { data, status } = await SizeAPI.getAll()
            if (status === 201 && data.count > 0) {
                setSizeData(data.sizes)
                setActiveId(sizeId ?? data.sizes[0].size_Id)
                await getAllProduct({
                    size: sizeId ?? data.sizes[0].size_Id,
                    page: 1,
                    title: text
                })
            }
        } catch (e) {
            console.log(e)
        }
        setIsLoading(false)
    }

    const toggleSort = async () => {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        await getAllProduct({
            page: 1,
            size: activeId,
            order: sortOrder
        })
    };

    useEffect(() => {
        getAllSize(searchSize ?? undefined, searchText ?? undefined)
        document.title = 'Trang chủ'
    }, [searchSize, searchText])

    return (
        <>
            <Group>
                <Container maxWidth="lg">
                    <Grid2 container spacing={2}>
                        <Grid2 size={6} paddingY={4}>
                            <Stack
                                direction="row"
                                sx={{
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <BoxImg>
                                    <img src={Banner} alt="img_home_welcome" />
                                </BoxImg>
                            </Stack>
                        </Grid2>
                        <Grid2 size={6} paddingY={4}>
                            <TitleBox text="Chào mừng đến với Pizza House" />
                            <Stack
                                direction="row"
                                spacing={2}
                                sx={{
                                    alignItems: "center",
                                }}
                            >
                                <BoxIntro>
                                    <LocalPizzaIcon style={{ fontSize: '50px' }} />
                                </BoxIntro>
                                <BoxIntro>
                                    <AddBusinessIcon style={{ fontSize: '50px' }} />
                                </BoxIntro>
                                <BoxIntro>
                                    <BreakfastDiningIcon style={{ fontSize: '50px' }} />
                                </BoxIntro>
                            </Stack>
                            <p style={{ padding: '20px 0' }}>
                                Các đầu bếp của chúng tôi làm việc 24/7 và sẵn sàng tiếp nhận du khách vào bất kỳ thời điểm nào trong ngày và đêm
                            </p>
                            <ButtonCustom text='Đặt món ngay' />
                        </Grid2>
                    </Grid2>
                </Container>
            </Group>
            <Container maxWidth="lg" style={{ marginBottom: 30 }}>
                <TitlePage sub="Danh sách" text="sản phẩm" />
                <Stack
                    direction="row"
                    sx={{
                        justifyContent: "flex-end",
                        alignItems: "center",
                    }}
                >
                    <form method="get">
                        <Box display="flex" alignItems="center" gap={1} sx={{ marginBottom: '25px' }}>
                            <TextField
                                variant="standard"
                                placeholder="Tìm kiếm..."
                                sx={{
                                    width: '320px'
                                }}
                                name="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Button
                                variant="contained"
                                sx={{ bgcolor: "#fec524", color: "black", "&:hover": { bgcolor: "#e6b800" } }}
                                type="submit"
                            >
                                <SearchIcon />
                            </Button>
                            <Button
                                variant="contained"
                                sx={{ bgcolor: "#e6b800", color: "white", "&:hover": { bgcolor: "#e6b800" } }}
                                onClick={toggleSort}
                            >
                                <SortIcon sx={{ transform: sortOrder === "desc" ? "rotate(180deg)" : "none" }} />
                            </Button>
                        </Box>
                    </form>
                </Stack>
                <Grid2 container spacing={2}>
                    <Grid2 size={3}>
                        <SubTitle>
                            Kích cỡ
                        </SubTitle>
                        <ListItem>
                            {
                                sizeData?.map((item) => (
                                    <li key={item.size_Id} className={`${activeId === item.size_Id ? 'active' : ''}`}>
                                        <Link to={`/?size=${item.size_Id}`}>
                                            {item.size_name}
                                        </Link>
                                    </li>
                                ))
                            }
                        </ListItem>
                    </Grid2>
                    <Grid2 size={9}>
                        <Grid2 container spacing={2}>
                            {
                                productData?.map((item) => (
                                    <Grid2 size={4} key={item.pro_Id + item.size_Id}>
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
                    </Grid2>
                </Grid2>
            </Container>
        </>
    )
}

export default HomePage