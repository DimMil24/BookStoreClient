import { useContext, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableSortLabel from "@mui/material/TableSortLabel";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import columns from "../utils/columns";
import { visuallyHidden } from "@mui/utils";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DataContext from "../context/DataContext";
import AdminModal from "./AdminModal";

const AdminTable = ({
  rows,
  rowsPerPage,
  page,
  totalPages,
  desc,
  orderBy,
  refresh,
  setRefresh,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  const { filter, setFilter } = useContext(DataContext);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState();

  const handleClickEdit = (event, id) => {
    event.stopPropagation();
    setEditId(id);
    setOpen(true);
  };

  const handleRequestSort = (property) => {
    if (property === "edit") {
      return;
    }
    const isAsc = orderBy === property && desc === "false";
    setFilter({
      ...filter,
      desc: isAsc ? "true" : "false",
      order_by: property,
    });
  };

  return (
    <>
      <Paper sx={{ width: "100%" }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {columns.map((headCell) => (
                  <TableCell
                    key={headCell.field}
                    align="left"
                    padding="normal"
                    sortDirection={desc === "false" ? "asc" : "desc"}
                  >
                    <TableSortLabel
                      active={orderBy === headCell.field}
                      direction={desc === "false" ? "asc" : "desc"}
                      onClick={() => handleRequestSort(headCell.field)}
                    >
                      {headCell.label}
                      {orderBy === headCell.field ? (
                        <Box component="span" sx={visuallyHidden}>
                          {desc === "false"
                            ? "sorted ascending"
                            : "sorted descending"}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((rows) => {
                return (
                  <TableRow
                    key={rows.isbn13}
                    hover
                    role="checkbox"
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell>
                      <IconButton
                        onClick={(event) => handleClickEdit(event, rows.isbn13)}
                      >
                        <ModeEditIcon color="primary" />
                      </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {rows.isbn13}
                    </TableCell>
                    <TableCell align="left">{rows.title}</TableCell>
                    <TableCell align="left">{rows.subtitle}</TableCell>
                    <TableCell align="left">{rows.authors}</TableCell>
                    <TableCell align="left">{rows.year}</TableCell>
                    <TableCell align="left">{rows.average_rating}</TableCell>
                    <TableCell align="left">{rows.num_pages}</TableCell>
                    <TableCell align="left">{rows.ratings_count}</TableCell>
                    <TableCell align="left">{rows.price}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[25, 50, 100]}
          component="div"
          count={rowsPerPage * totalPages}
          rowsPerPage={rowsPerPage}
          page={page}
          SelectProps={{
            inputProps: {
              "aria-label": "rows per page",
            },
            native: true,
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <AdminModal
        open={open}
        setOpen={setOpen}
        editId={editId}
        refresh={refresh}
        setRefresh={setRefresh}
      />
    </>
  );
};

export default AdminTable;
