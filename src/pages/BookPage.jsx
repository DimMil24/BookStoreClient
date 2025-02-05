import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const BookPage = () => {
    const [book, setBook] = useState({})
    const [loading, setLoading] = useState(true)
    const { id } = useParams();


    useEffect(() => {

        const fetchBooks = async () => {
            const response = await fetch("http://localhost:8080/api/books/id/" + id)
            const data = await response.json();
            return data;
        }

        fetchBooks()
            .then(books => {
                setBook(books)
                setLoading(false)
            })
            .catch(error => {
                console.log("xasame")
            });
    }, [id])

    if (loading) {
        return (<p>loading</p>)
    } else {
        return (
            <Container maxWidth="md" >
                <Box sx={{ minHeight: "calc(100vh - 240px)" }}>
                    <Box sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        alignItems: { xs: "center", md: "start" },
                        justifyContent: "space-around"
                    }}>
                        <Box
                            component="img"
                            alt="Book Cover"
                            src={book.thumbnail}
                            sx={{
                                height: 300,
                                maxHeight: { xs: 233, md: 300 },
                                maxWidth: { xs: 220, md: 300 },
                            }}
                        />
                        <Box display="flex"
                            flexDirection="column"
                            justifyContent="space-around"
                            sx={{
                                height: 300,
                                maxHeight: { xs: 233, md: 300 },
                                maxWidth: { xs: 220, md: 300 },
                            }}>
                            <Box>
                                <Typography variant="h5">
                                    {book.title}
                                </Typography>
                                <Typography variant="h7">
                                    {book.subtitle}
                                </Typography>
                                <Typography sx={{ fontSize: "14px", fontWeight: "700", color: "#00000061", marginTop: "10px" }}>
                                    ID: {book.isbn13}
                                </Typography>
                                <Typography sx={{ fontSize: "14px", fontWeight: "700", color: "#00000061", marginTop: "10px" }}>
                                    {book.categories}
                                </Typography>
                            </Box>
                            <Box display="flex" flexDirection="column">
                                <Typography variant='h4' alignSelf="flex-end" marginTop="10px" marginBottom="15px">
                                    {book.price} €
                                </Typography>
                                <Button variant="contained">
                                    Add to Cart <AddShoppingCartIcon sx={{marginLeft:"10px"}}/>
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                    <Accordion sx={{ mt: "80px" }}>
                        <AccordionSummary
                            expandIcon={<ArrowDropDownIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <Typography variant="h5">Description</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                {book.description}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Box>
            </Container>
        )
    }
}

export default BookPage