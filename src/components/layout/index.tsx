import Header from "./header";
import { Outlet } from "react-router-dom";
import Footer from "./footer";
import './index.css';
import InformationMessenger from '../information-messenger/index';

const Layout = () => {
    return (
        <>
            <Header />
            <main id="layout">
                <Outlet />
            </main >
            <Footer />
            <InformationMessenger />
        </>
    )
}

export default Layout;