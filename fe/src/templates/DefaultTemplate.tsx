import { Outlet } from "react-router-dom"
import Footer from "~/layouts/Footer"
import Header from "~/layouts/Header"

const DefaultTemplate = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default DefaultTemplate