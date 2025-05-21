import Container from "@mui/material/Container";
import { useCallback, useEffect, useState, useContext } from "react";
import AdminTable from "../components/AdminTable";
import DataContext from "../context/DataContext";
import Loading from "../components/Loading";
import { Box, Button } from "@mui/material";
import { useAuth } from "../context/AuthContext";

const AdminPage = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [pageIndex, setPageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [openCreate, setOpenCreate] = useState(false);
  const { filter } = useContext(DataContext);
  const { token } = useAuth();

  const fetchBooks = useCallback(
    async (page) => {
      let fetchUrl =
        process.env.REACT_APP_URL + "admin/books/page/" + page + "/?";
      let cleanCategory;
      if (filter.category !== "") {
        cleanCategory = filter.category;
      } else {
        cleanCategory = "";
      }
      const response = await fetch(
        fetchUrl +
          new URLSearchParams({
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
            desc: filter.desc,
          }),
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setTotalPages(data.totalPages - 1);
      return data.content;
    },
    [rowsPerPage, filter, token]
  );

  useEffect(() => {
    fetchBooks(page)
      .then((books) => {
        setBooks(books);
        window.scrollTo(0, 0);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page, fetchBooks, refresh]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
    setPageIndex(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
    setPageIndex(0);
  };

  return loading ? (
    <Loading />
  ) : (
    <Container maxWidth="xl" sx={{ marginBottom: "40px" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <AdminTable
          rows={books}
          page={pageIndex}
          rowsPerPage={rowsPerPage}
          totalPages={totalPages}
          refresh={refresh}
          setRefresh={setRefresh}
          desc={filter.desc}
          orderBy={filter.order_by}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          openCreate={openCreate}
          setOpenCreate={setOpenCreate}
        />
        <Button
          size="large"
          variant="contained"
          sx={{ alignSelf: "flex-end", mt: 2 }}
          onClick={(e) => {
            e.stopPropagation();
            setOpenCreate(true);
          }}
        >
          Create New
        </Button>
      </Box>
    </Container>
  );
};

export default AdminPage;
