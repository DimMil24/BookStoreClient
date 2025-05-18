import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Loading from "./Loading";

export default function AdminModal({
  open,
  setOpen,
  editId,
  refresh,
  setRefresh,
}) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const handleClose = () => {
    setLoading(true);
    setOpen(false);
  };

  const postRequest = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    await fetch(process.env.REACT_APP_URL + "books/id/" + formJson.isbn13, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isbn13: formJson.isbn13,
        isbn10: formJson.isbn10,
        title: formJson.title,
        subtitle: formJson.subtitle,
        authors: formJson.authors,
        categories: formJson.categories,
        thumbnail: formJson.thumbnail,
        description: formJson.description,
        year: formJson.year,
        average_rating: formJson.average_rating,
        num_pages: formJson.num_pages,
        ratings_count: formJson.ratings_count,
        price: formJson.price,
      }),
    });
  };

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(
        process.env.REACT_APP_URL + "books/id/" + editId
      );
      const data = await response.json();
      return data;
    };
    if (open) {
      fetchBooks()
        .then((book) => {
          setData(book);
          setLoading(false);
        })
        .catch((error) => {
          console.log("xasame");
        });
    }
  }, [open, editId]);

  return loading && open ? (
    <Loading />
  ) : (
    <Box>
      <Dialog
        maxWidth="md"
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            postRequest(event);
            setRefresh(!refresh);
            handleClose();
          },
        }}
      >
        <DialogTitle>Edit {data.title}</DialogTitle>
        <DialogContent>
          <Grid container columnSpacing={4}>
            <Grid align="center" size={{ sm: 6, xs: 12 }}>
              <TextField
                autoFocus
                required
                margin="normal"
                defaultValue={data.isbn13}
                id="name"
                name="isbn13"
                label="ISBN13"
                fullWidth
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid align="center" size={{ sm: 6, xs: 12 }}>
              <TextField
                required
                margin="normal"
                defaultValue={data.isbn10}
                id="name"
                name="isbn10"
                label="ISBN10"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid align="center" size={{ sm: 6, xs: 12 }}>
              <TextField
                required
                margin="normal"
                defaultValue={data.title}
                id="name"
                name="title"
                label="Title"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid align="center" size={{ sm: 6, xs: 12 }}>
              <TextField
                margin="normal"
                defaultValue={data.subtitle}
                id="name"
                name="subtitle"
                label="Subtitle"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid align="center" size={{ sm: 6, xs: 12 }}>
              <TextField
                margin="normal"
                defaultValue={data.authors}
                id="name"
                name="authors"
                label="Author"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid align="center" size={{ sm: 6, xs: 12 }}>
              <TextField
                margin="normal"
                defaultValue={data.categories}
                id="name"
                name="categories"
                label="Category"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid align="center" size={12}>
              <TextField
                margin="normal"
                defaultValue={data.thumbnail}
                id="name"
                name="thumbnail"
                label="Thumbnail"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid align="center" size={12}>
              <TextField
                margin="normal"
                defaultValue={data.description}
                id="name"
                name="description"
                label="Description"
                fullWidth
                variant="outlined"
                multiline
              />
            </Grid>
            <Grid align="center" size={{ sm: 6, xs: 12 }}>
              <TextField
                required
                margin="normal"
                defaultValue={data.year}
                id="name"
                name="year"
                label="Year"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid align="center" size={{ sm: 6, xs: 12 }}>
              <TextField
                required
                margin="normal"
                defaultValue={data.average_rating}
                id="name"
                name="average_rating"
                label="Rating"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid align="center" size={{ sm: 6, xs: 12 }}>
              <TextField
                required
                margin="normal"
                defaultValue={data.num_pages}
                id="name"
                name="num_pages"
                label="Pages"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid align="center" size={{ sm: 6, xs: 12 }}>
              <TextField
                required
                margin="normal"
                defaultValue={data.ratings_count}
                id="name"
                name="ratings_count"
                label="Number of Reviews"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid align="center" size={{ sm: 6, xs: 12 }}>
              <TextField
                required
                margin="normal"
                defaultValue={data.price}
                id="name"
                name="price"
                label="Price"
                fullWidth
                variant="outlined"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
