import Header from "./header";
import { Outlet } from "react-router-dom";
import Footer from "./footer";
import './index.css';

const Layout = () => {
    return (
        <>
            <Header />
            <main id="layout">
                <Outlet />
            </main >
            <Footer />
        </>
    )
}

export default Layout;