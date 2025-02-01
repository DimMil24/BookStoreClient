import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import StarIcon from '@mui/icons-material/StarBorder';
import { Link } from 'react-router-dom';

const BookCard = ({ props }) => {

    const styles = {
        media: {
            height: '250px',
        }
    };


    return (
        <Card sx={{ maxWidth: '13rem' }} style={{ border: "none", boxShadow: "none" }}>
            <CardMedia
                style={styles.media}
                sx={{ objectFit: "contain" }}
                image={props.thumbnail}
                component="img"
            />
            <CardContent>
                <Typography gutterBottom variant="h7" component="div">
                    <Link to={`/books/${props.isbn13}`}>
                        {props.title}
                    </Link>
                </Typography>
                <Typography variant="body3" color="text.secondary">
                    {props.authors}
                </Typography>
                <Box display="flex" flexDirection="column" marginTop="10px" alignItems="center">
                    <Typography variant="h5" >
                        {props.price}  €
                    </Typography>
                    <CardActions>
                        <Button size="medium" sx={{ padding: '0px' }}>
                            Add to <AddShoppingCartIcon sx={{ ml: "5px" }} />
                        </Button>
                    </CardActions>
                </Box>
            </CardContent>

        </Card>
    )
}

export default BookCard;