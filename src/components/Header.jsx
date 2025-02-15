import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { useContext, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import DataContext from "../context/DataContext";
import CartPopup from "./CartPopup";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("xs")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
  display: "flex",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
      "&:focus": {
        width: "35ch",
      },
    },
  },
}));

function Header() {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { filter, setFilter } = useContext(DataContext);

  return (
    <AppBar position="sticky" sx={{ marginBottom: "40px" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: "flex" }}>
          <AutoStoriesIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            BookStore
          </Typography>

          <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => setIsOpen(true)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <AutoStoriesIcon
            sx={{ display: { sm: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", sm: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            BookStore
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", justifyContent: "center" },
            }}
          >
            <Button
              component={Link}
              to={"/Home"}
              onClick={() =>
                setFilter({
                  ...filter,
                  category: "",
                  search: "",
                })
              }
              key="Home"
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Home
            </Button>
            <Button
              component={Link}
              to={"/Admin"}
              key="Admin"
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Admin
            </Button>
            <Button
              component={Link}
              to={"/About"}
              key="About"
              sx={{ my: 2, color: "white", display: "block" }}
            >
              About
            </Button>
          </Box>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setFilter({ ...filter, search: search });
            }}
          >
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                value={search}
                onSubmit={() => console.log(search)}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                placeholder="Search for Books"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </form>
          <CartPopup />
        </Toolbar>
        <Sidebar {...{ isOpen, setIsOpen }} />
      </Container>
    </AppBar>
  );
}

export default Header;
