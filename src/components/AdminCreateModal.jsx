import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function AdminCreateModal({
  openCreate,
  setOpenCreate,
  refresh,
  setRefresh,
}) {
  const handleClose = () => {
    setOpenCreate(false);
  };

  const postRequest = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    await fetch(process.env.REACT_APP_URL + "books", {
      method: "POST",
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
        averageRating: formJson.average_rating,
        numberOfPages: formJson.num_pages,
        ratingsCount: formJson.ratings_count,
        price: formJson.price,
      }),
    });
  };

  return (
    <Box>
      <Dialog
        maxWidth="md"
        open={openCreate}
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
        <DialogTitle>Add Book</DialogTitle>
        <DialogContent>
          <Grid container columnSpacing={4}>
            <Grid align="center" size={{ sm: 6, xs: 12 }}>
              <TextField
                autoFocus
                required
                margin="normal"
                id="name"
                name="isbn13"
                label="ISBN13"
                fullWidth
                variant="outlined"
                type="number"
              />
            </Grid>
            <Grid align="center" size={{ sm: 6, xs: 12 }}>
              <TextField
                margin="normal"
                id="name"
                name="isbn10"
                label="ISBN10"
                fullWidth
                variant="outlined"
                type="number"
              />
            </Grid>
            <Grid align="center" size={{ sm: 6, xs: 12 }}>
              <TextField
                required
                margin="normal"
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
                id="name"
                name="authors"
                required
                label="Author"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid align="center" size={{ sm: 6, xs: 12 }}>
              <TextField
                margin="normal"
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
                id="name"
                name="year"
                label="Year"
                fullWidth
                variant="outlined"
                type="number"
              />
            </Grid>
            <Grid align="center" size={{ sm: 6, xs: 12 }}>
              <TextField
                required
                margin="normal"
                id="name"
                name="average_rating"
                label="Rating"
                fullWidth
                variant="outlined"
                type="number"
              />
            </Grid>
            <Grid align="center" size={{ sm: 6, xs: 12 }}>
              <TextField
                required
                margin="normal"
                id="name"
                name="num_pages"
                label="Pages"
                fullWidth
                variant="outlined"
                type="number"
              />
            </Grid>
            <Grid align="center" size={{ sm: 6, xs: 12 }}>
              <TextField
                required
                margin="normal"
                id="name"
                name="ratings_count"
                label="Number of Reviews"
                fullWidth
                variant="outlined"
                type="number"
              />
            </Grid>
            <Grid align="center" size={{ sm: 6, xs: 12 }}>
              <TextField
                required
                margin="normal"
                id="name"
                name="price"
                label="Price"
                fullWidth
                variant="outlined"
                type="number"
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
