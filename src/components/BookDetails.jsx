import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

const BookDetails = ({ book }) => {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 5, md: 2 }}>
        <Typography variant="h6">
          <Box sx={{ fontWeight: "bold" }}>Author:</Box>
        </Typography>
      </Grid>
      <Grid size={{ xs: 7, md: 4 }}>
        <Typography variant="h6">{book.authors}</Typography>
      </Grid>
      <Grid size={{ xs: 5, md: 2 }}>
        <Typography variant="h6">
          <Box sx={{ fontWeight: "bold" }}>ISBN:</Box>
        </Typography>
      </Grid>
      <Grid size={{ xs: 7, md: 4 }}>
        <Typography variant="h6">{book.isbn10}</Typography>
      </Grid>
      <Grid size={12}>
        <Divider />
      </Grid>
      <Grid size={{ xs: 5, md: 2 }}>
        <Typography variant="h6">
          <Box sx={{ fontWeight: "bold" }}>Category:</Box>
        </Typography>
      </Grid>
      <Grid size={{ xs: 7, md: 4 }}>
        <Typography variant="h6">{book.categories}</Typography>
      </Grid>
      <Grid size={{ xs: 5, md: 2 }}>
        <Typography variant="h6">
          <Box sx={{ fontWeight: "bold" }}>Year of Publication:</Box>
        </Typography>
      </Grid>
      <Grid size={{ xs: 7, md: 4 }}>
        <Typography variant="h6">{book.year}</Typography>
      </Grid>

      <Grid size={12}>
        <Divider />
      </Grid>

      <Grid size={{ xs: 5, md: 2 }}>
        <Typography variant="h6">
          <Box sx={{ fontWeight: "bold" }}>Pages:</Box>
        </Typography>
      </Grid>
      <Grid size={{ xs: 7, md: 4 }}>
        <Typography variant="h6">{book.num_pages}</Typography>
      </Grid>

      <Grid size={{ xs: 5, md: 2 }}>
        <Typography variant="h6">
          <Box sx={{ fontWeight: "bold" }}>Average Rating:</Box>
        </Typography>
      </Grid>
      <Grid size={{ xs: 7, md: 4 }}>
        <Typography variant="h6">{book.average_rating}</Typography>
      </Grid>
    </Grid>
  );
};

export default BookDetails;
