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
            ps: rowsPerPage,
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