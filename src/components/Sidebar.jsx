import { Container, styled } from "@mui/material";
import columns from "../utils/columns";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataContext from "../context/DataContext";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

const listStyle = {
  width: "100%",
  maxWidth: 360,
  bgcolor: "background.paper",
};

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [yearRange, setYearRange] = useState([1970, 2023]);
  const [ratingRange, setRatingRange] = useState([0.0, 5.0]);
  const [priceRange, setPriceRange] = useState([1, 150]);
  const { setFilter, filter } = useContext(DataContext);
  const [categories, setCategories] = useState();
  const [loadingCategories, setLoadingCategories] = useState(true);

  const fetchCategories = async () => {
    const response = await fetch(process.env.REACT_APP_URL + "category");
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    fetchCategories()
      .then((c) => {
        setCategories(c);
        setLoadingCategories(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleYearChange = (event, newValue) => {
    setYearRange(newValue);
  };

  const handleYearCommited = (event, newValue) => {
    setFilter({
      ...filter,
      yearHigh: yearRange[1],
      yearLow: yearRange[0],
    });
  };

  const handleRatingRange = (event, newValue) => {
    setRatingRange(newValue);
  };

  const handleRatingCommited = (event, newValue) => {
    setFilter({
      ...filter,
      ratingLow: ratingRange[0],
      ratingHigh: ratingRange[1],
    });
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handlePriceCommited = (event, newValue) => {
    setFilter({
      ...filter,
      priceLow: priceRange[0],
      priceHigh: priceRange[1],
    });
  };

  const handleSortChanged = (event) => {
    setFilter({
      ...filter,
      order_by: event.target.value,
    });
  };

  const handleOrderChanged = (event) => {
    setFilter({
      ...filter,
      desc: event.target.value,
    });
  };

  const handleCategoryChanged = (event) => {
    setFilter({
      ...filter,
      category: event.target.value,
    });
  };

  const Test = () => {
    if (loadingCategories) {
      return <MenuItem>Loading</MenuItem>;
    }
    return (
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="category">Category</InputLabel>
        <Select
          labelId="category"
          defaultValue=""
          value={filter.category}
          label="Category"
          onChange={handleCategoryChanged}
        >
          <MenuItem value={""}>All</MenuItem>
          {categories.map((category) => {
            return <MenuItem value={category}>{category}</MenuItem>;
          })}
        </Select>
      </FormControl>
    );
  };

  return (
    <Drawer open={isOpen} onClose={() => setIsOpen(false)}>
      <DrawerHeader>
        <IconButton onClick={() => setIsOpen(false)}>
          <ChevronLeft fontSize="large" />
        </IconButton>
      </DrawerHeader>

      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <List sx={listStyle} component="nav">
          <Divider />
          <ListItem>
            <ListItemButton component={Link} to="/">
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemButton component={Link} to="/Admin">
              <ListItemText primary="Admin" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>

      <Container
        maxWidth="lg"
        sx={{ display: "flex", flexDirection: "column", rowGap: "30px" }}
      >
        <Box>
          <Typography fontWeight="bold">Year</Typography>
          <Box
            sx={{
              display: "flex",
              columnGap: "25px",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Typography width="35px" align="right">
              {yearRange[0]}
            </Typography>
            <Slider
              sx={{ width: "100px" }}
              getAriaLabel={() => "Year range"}
              value={yearRange}
              onChange={handleYearChange}
              onChangeCommitted={handleYearCommited}
              valueLabelDisplay="auto"
              min={1970}
              max={2023}
            />
            <Typography>{yearRange[1]}</Typography>
          </Box>
        </Box>

        <Divider sx={{ opacity: 0.6 }} />
        <Box>
          <Typography fontWeight="bold">Rating</Typography>
          <Box
            display="flex"
            columnGap="25px"
            flexDirection="row"
            alignItems="center"
          >
            <Typography width="35px" align="right">
              {ratingRange[0]}
            </Typography>
            <Slider
              sx={{ width: "100px" }}
              getAriaLabel={() => "Rating range"}
              value={ratingRange}
              onChange={handleRatingRange}
              onChangeCommitted={handleRatingCommited}
              valueLabelDisplay="auto"
              min={0.0}
              max={5.0}
            />
            <Typography>{ratingRange[1]}</Typography>
          </Box>
        </Box>

        <Divider sx={{ opacity: 0.6 }} />
        <Box>
          <Typography fontWeight="bold">Price</Typography>
          <Box
            sx={{
              display: "flex",
              columnGap: "25px",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Typography width="35px" align="right">
              {priceRange[0]}
            </Typography>
            <Slider
              sx={{ width: "100px" }}
              getAriaLabel={() => "Price range"}
              value={priceRange}
              onChange={handlePriceChange}
              onChangeCommitted={handlePriceCommited}
              valueLabelDisplay="auto"
              min={1}
              max={150}
            />
            <Typography>{priceRange[1]}</Typography>
          </Box>
        </Box>

        <Divider sx={{ opacity: 0.6 }} />
        <Box>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="sort-by">Sort By</InputLabel>
            <Select
              labelId="sort-by"
              defaultValue={filter.order_by}
              value={filter.order_by}
              label="Sort By"
              onChange={handleSortChanged}
            >
              {columns
                .filter((column) => column.field !== "edit")
                .map((column) => {
                  return (
                    <MenuItem key={column.field} value={column.field}>
                      {column.label}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="order">Order</InputLabel>
            <Select
              labelId="order"
              defaultValue={filter.desc}
              value={filter.desc}
              label="Order"
              onChange={handleOrderChanged}
            >
              <MenuItem value={false}>Ascending</MenuItem>
              <MenuItem value={true}>Descending</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Divider sx={{ opacity: 0.6 }} />
        <Test />
      </Container>
    </Drawer>
  );
};

export default Sidebar;
