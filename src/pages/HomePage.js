import { useCallback, useContext, useEffect, useState } from "react";
import BookCard from "../components/BookCard"
import Skeleton from '@mui/material/Skeleton';
import Grid from "@mui/material/Grid";
import Pagination from '@mui/material/Pagination';
import Box from "@mui/material/Box";
import DataContext from "../context/DataContext";



const HomePageBooks = () => {
    const [books, setBooks] = useState({})
    const [loading, setLoading] = useState(true)
    const [pages, setPages] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const { filter } = useContext(DataContext)

    

    const fetchBooks = useCallback(async (page, filter) => {
        let fetchUrl = "http://localhost:8080/api/books/" + page + "/?"
        let cleanCategory;
        if (filter.c !== "") {
            cleanCategory = filter.c
        } else {
            cleanCategory = ""
        }

        const response = await fetch(fetchUrl + new URLSearchParams({
            y1: filter.y1,
            y2: filter.y2,
            r1: filter.r1,
            r2: filter.r2,
            p1: filter.p1,
            p2: filter.p2,
            c: cleanCategory,
            s: filter.search,
            order_by: filter.order_by,
            desc: filter.desc
        }))
        const data = await response.json();
        setPages(data.totalPages - 1)
        return data.content;
    } ,[])

    useEffect(() => {
        setCurrentPage(1);
    }, [filter])

    useEffect(() => {
        fetchBooks(currentPage-1, filter)
            .then(books => {
                setBooks(books)
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
            });
    }, [currentPage, filter,fetchBooks])



    const handleChange = (event, value) => {
        setCurrentPage(value);
    };

    const RenderBooks = () => {
        return books.map(book => {
            return (<Grid key={book.isbn13} align="center" item md={4} sm={6} xs={12}>
                <BookCard props={book} />
            </Grid>)
        })
    }

    if (loading) {
        return (
            <Box sx={{ margin: "20px 0px" }}>
                <Grid container rowGap={5}>
                    <Grid align="center" item md={4} sm={6} xs={12}>
                        <Skeleton animation="wave" variant="rectangular" width="13rem" height='250px' />
                    </Grid>
                    <Grid align="center" item md={4} sm={6} xs={12}>
                        <Skeleton animation="wave" variant="rectangular" width="13rem" height='250px' />
                    </Grid>
                    <Grid align="center" item md={4} sm={6} xs={12}>
                        <Skeleton animation="wave" variant="rectangular" width="13rem" height='250px' />
                    </Grid>
                    <Grid align="center" item md={4} sm={6} xs={12}>
                        <Skeleton animation="wave" variant="rectangular" width="13rem" height='250px' />
                    </Grid>
                    <Grid align="center" item md={4} sm={6} xs={12}>
                        <Skeleton animation="wave" variant="rectangular" width="13rem" height='250px' />
                    </Grid>
                    <Grid align="center" item md={4} sm={6} xs={12}>
                        <Skeleton animation="wave" variant="rectangular" width="13rem" height='250px' />
                    </Grid>
                </Grid>
            </Box>
        )
    } else {
        return (
            <>
                <Grid container item rowGap={5} >
                    <RenderBooks />
                </Grid>
                <Grid item >
                    <Box justifyContent={"center"} display={"flex"} sx={{ margin: "20px 0px" }}>
                        <Pagination count={pages} page={currentPage} onChange={handleChange} />
                    </Box>
                </Grid>
            </>
        )
    }
}

export default HomePageBooks;