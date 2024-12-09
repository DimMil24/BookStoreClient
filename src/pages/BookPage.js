import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";

const BookPage = () => {
    const [book, setBook] = useState({})
    const [loading, setLoading] = useState(true)
    const { id } = useParams();


    useEffect(() => {

        const fetchBooks = async () => {
            const response = await fetch("http://localhost:8080/api/id/" + id)
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
                <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: { xs: "center", md: "start" }, minHeight: "calc(100vh - 300px)" }}>
                    <Box
                        component="img"
                        sx={{
                            height: 250,
                            maxHeight: { xs: 233, md: 250 },
                            maxWidth: { xs: 220, md: 250 },
                        }}
                        alt="Book Cover"
                        src={book.thumbnail}
                    />
                    <Typography variant="h7" sx={{ marginLeft: { md: "50px" } }}>
                        {book.description}
                    </Typography>
                </Box>
                <Box sx={{display:"flex", marginTop:"30px", justifyContent:"right"}}>
                    <Typography variant='h4'>
                        {book.price} €
                    </Typography>
                </Box>
            </Container>
        )
    }
}

export default BookPage