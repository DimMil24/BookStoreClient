import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import BookDetails from "../components/BookDetails";
import DataContext from "../context/DataContext";
import Loading from "../components/Loading";

const BookPage = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { cart, setCart } = useContext(DataContext);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(process.env.REACT_APP_URL + "books/" + id);
      const data = await response.json();
      return data;
    };

    fetchBooks()
      .then((books) => {
        setBook(books);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return loading ? (
    <Loading />
  ) : (
    <Container maxWidth="md">
      <Box sx={{ minHeight: "calc(100vh - 240px)" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "center", md: "start" },
            justifyContent: "space-around",
          }}
        >
          <Box
            component="img"
            alt="Book Cover"
            src={book.thumbnail ? book.thumbnail : "/fallback.jpg"}
            sx={{
              height: 300,
              maxHeight: { xs: 233, md: 300 },
              maxWidth: { xs: 220, md: 300 },
            }}
          />
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-around"
            sx={{
              height: 300,
              maxHeight: { xs: 233, md: 300 },
              maxWidth: { xs: 220, md: 300 },
            }}
          >
            <Box>
              <Typography variant="h5">{book.title}</Typography>
              <Typography variant="h7">{book.subtitle}</Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "700",
                  color: "#00000061",
                  marginTop: "10px",
                }}
              >
                ID: {book.isbn13}
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "700",
                  color: "#00000061",
                  marginTop: "10px",
                }}
              >
                {book.categories}
              </Typography>
            </Box>
            <Box display="flex" flexDirection="column">
              <Typography
                variant="h4"
                alignSelf="flex-end"
                marginTop="10px"
                marginBottom="15px"
              >
                {book.price} €
              </Typography>
              <Box
                onClick={() => {
                  let found = false;
                  for (let i = 0; i < cart.length; i++) {
                    if (cart[i].isbn13 === book.isbn13) {
                      cart[i].quantity++;
                      found = true;
                      break;
                    }
                  }

                  if (!found)
                    setCart([
                      ...cart,
                      {
                        isbn13: book.isbn13,
                        name: book.title,
                        price: book.price,
                        img: book.thumbnail,
                        quantity: 1,
                      },
                    ]);
                }}
              >
                <Button variant="contained">
                  Add to Cart{" "}
                  <AddShoppingCartIcon sx={{ marginLeft: "10px" }} />
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
        <Accordion sx={{ mt: "80px" }}>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="description-panel"
            id="description-panel"
          >
            <Typography variant="h5">Description</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{book.description}</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="details-panel"
            id="details-panel"
          >
            <Typography variant="h5">Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <BookDetails book={book} />
          </AccordionDetails>
        </Accordion>
      </Box>
    </Container>
  );
};

export default BookPage;
