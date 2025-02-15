import {
  IconButton,
  Popover,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useContext } from "react";
import DataContext from "../context/DataContext";

const CartPopup = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { cart, setCart } = useContext(DataContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRemove = (id) => {
    setCart(cart.filter((item) => item.isbn13 !== id));
  };

  const handleQuantityChange = (id, change) => {
    setCart(
      cart.map((item) =>
        item.isbn13 === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const open = Boolean(anchorEl);
  const id = open ? "cart-popover" : undefined;

  return (
    <>
      <IconButton color="inherit" onClick={handleClick}>
        <ShoppingBagIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ padding: 1 }}
      >
        <Typography variant="h6" sx={{ p: 2 }}>
          Shopping Cart
        </Typography>
        <List sx={{ width: 320 }}>
          {cart.length > 0 ? (
            cart.map((item) => (
              <ListItem key={item.isbn13}>
                <ListItemText
                  primary={item.name}
                  secondary={item.price + " €"}
                />
                <Box sx={{ display: "flex", alignItems: "center", mx: 1 }}>
                  <IconButton
                    size="small"
                    onClick={() => handleQuantityChange(item.isbn13, -1)}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography sx={{ mx: 1, minWidth: 20, textAlign: "center" }}>
                    {item.quantity}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => handleQuantityChange(item.isbn13, 1)}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
                <IconButton
                  edge="end"
                  onClick={() => handleRemove(item.isbn13)}
                >
                  <DeleteIcon color="error" />
                </IconButton>
              </ListItem>
            ))
          ) : (
            <Typography sx={{ p: 2 }}>Your cart is empty.</Typography>
          )}
        </List>
        {cart.length > 0 && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              p: 1,
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ alignSelf: "flex-end", mb: 1 }}
            >
              Subtotal: {calculateSubtotal()} €
            </Typography>
            <Button variant="contained" color="primary" fullWidth>
              Checkout
            </Button>
          </Box>
        )}
      </Popover>
    </>
  );
};

export default CartPopup;
