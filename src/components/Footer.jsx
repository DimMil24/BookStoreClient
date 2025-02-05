import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Dimitris Milios
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[800],
            }}
        >
            <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', rowGap: '10px' }}>
                <Typography variant="body1">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum dolorum delectus similique, itaque dolorem exercitationem sit id voluptatum iusto in veniam neque.
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: 'center' }}>
                    <Box sx={{display:'flex', marginLeft:'auto'}}>
                        <Copyright />
                    </Box>
                    <Box sx={{display:'flex' ,marginLeft: 'auto', columnGap:'5px' }}>
                        <FacebookIcon />
                        <InstagramIcon />
                        <TwitterIcon />
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

export default Footer