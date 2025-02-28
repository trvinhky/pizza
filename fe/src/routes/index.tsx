import { Route, Routes } from "react-router-dom"
import Loading from "~/components/Loading"
import { useGlobalDataContext } from "~/hooks/globalData"
import { Detail, HomePage, Info, Login, Register } from "~/pages"
import DefaultTemplate from "~/templates/DefaultTemplate"
import { PATH } from "~/utils/const/path"

const AppRouter = () => {
    const { isLoading } = useGlobalDataContext();

    return (
        <>
            <Routes>
                <Route path="/" element={<DefaultTemplate />}>
                    <Route index element={<HomePage />} />
                    <Route path={PATH.LOGIN} element={<Login />} />
                    <Route path={PATH.REGISTER} element={<Register />} />
                    <Route path={PATH.INFO} element={<Info />} />
                    <Route path={PATH.DETAIL} element={<Detail />} />
                </Route>
            </Routes>
            {isLoading && <Loading />}
        </>
    )
}

export default AppRouter