import {ThemeProvider, createTheme} from "@mui/material"
import Footer from "./Footer"
import Header from "./Header"
import {Outlet} from "react-router-dom"
import Box from "@mui/material/Box";


const defaultTheme = createTheme()

const Layout = () => {
    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{display: "flex", flexDirection: "column", minHeight: "100vh"}}>
                <Header/>
                <Outlet/>
                <Footer/>
            </Box>

        </ThemeProvider>
    )
}

export default Layout

