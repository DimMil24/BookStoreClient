import { ThemeProvider, createTheme } from "@mui/material"
import Footer from "./Footer"
import Header from "./Header"
import { Outlet } from "react-router-dom"


const defaultTheme = createTheme()

const Layout = () => {
    return (
        <ThemeProvider theme={defaultTheme}>
            <Header />
            <Outlet />
            <Footer />
        </ThemeProvider>
    )
}

export default Layout

