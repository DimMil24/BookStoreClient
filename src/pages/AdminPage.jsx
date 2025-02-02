import Container from "@mui/material/Container";
import { useCallback, useEffect, useState, useContext } from "react";
import AdminTable from "../components/AdminTable";
import DataContext from "../context/DataContext";

const AdminPage = () => {
    const [books, setBooks] = useState([])
    const [page, setPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0);
    const [refresh, setRefresh] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const { filter } = useContext(DataContext)

    const fetchBooks = useCallback(async (page) => {
        let fetchUrl = "http://localhost:8080/api/books/" + page + "/?"
        let cleanCategory;
        if (filter.category !== "") {
            cleanCategory = filter.category
        } else {
            cleanCategory = ""
        }
        const response = await fetch(fetchUrl + new URLSearchParams({
            yearHigh: filter.yearHigh,
            yearLow: filter.yearLow,
            ratingLow: filter.ratingLow,
            ratingHigh: filter.ratingHigh,
            priceLow: filter.priceLow,
            priceHigh: filter.priceHigh,
            category: cleanCategory,
            search: filter.search,
            pageSize: rowsPerPage,
            order_by: filter.order_by,
            desc: filter.desc
        }))
        const data = await response.json();
        setTotalPages(data.totalPages - 1)
        return data.content;
    }, [rowsPerPage,filter])

    useEffect(() => {
        fetchBooks(page)
            .then(books => {
                setBooks(books)
                window.scrollTo(0, 0)
            })
            .catch(error => {
                console.log(error)
            });
    }, [page, fetchBooks,refresh])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Container maxWidth="xl" sx={{ marginBottom: "40px" }}>
            <AdminTable
                rows={books}
                page={page}
                rowsPerPage={rowsPerPage}
                totalPages={totalPages}
                refresh={refresh}
                setRefresh={setRefresh}
                desc={filter.desc}
                orderBy={filter.order_by}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Container >
    );
}

export default AdminPage