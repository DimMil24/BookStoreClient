import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Link } from "react-router-dom";
import DataContext from "../context/DataContext";
import { useContext } from "react";
import { CardActionArea } from "@mui/material";

const BookCard = ({ props }) => {
  const { cart, setCart } = useContext(DataContext);

  const styles = {
    media: {
      height: "250px",
    },
  };

  const handleOnClickAddtoCart = () => {
    let found = false;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].isbn13 === props.isbn13) {
        cart[i].quantity++;
        found = true;
        break;
      }
    }

    if (!found)
      setCart([
        ...cart,
        {
          isbn13: props.isbn13,
          name: props.title,
          price: props.price,
          img: props.thumbnail,
          quantity: 1,
        },
      ]);
  };

  return (
    <Card
      sx={{ maxWidth: "13rem" }}
      style={{ border: "none", boxShadow: "none" }}
    >
      <CardActionArea component={Link} to={`/books/${props.isbn13}`}>
        <CardMedia
          style={styles.media}
          sx={{ objectFit: "contain" }}
          image={props.thumbnail}
          component="img"
        />
        <CardContent>
          <Typography gutterBottom variant="h7" component="div">
            {props.title}
          </Typography>
          <Typography variant="body3" color="text.secondary">
            {props.authors}
          </Typography>

          <Box
            display="flex"
            flexDirection="column"
            marginTop="10px"
            alignItems="center"
          >
            <Typography variant="h5">{props.price} €</Typography>
          </Box>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Button
            onClick={handleOnClickAddtoCart}
            size="large"
            sx={{ padding: "0px" }}
          >
            Add to <AddShoppingCartIcon sx={{ ml: "5px" }} />
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};

export default BookCard;
