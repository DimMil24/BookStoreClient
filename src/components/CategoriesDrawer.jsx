import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import Grid from '@mui/material/Grid'
import { useContext } from 'react'
import DataContext from '../context/DataContext'
import { Typography } from '@mui/material'


const CategoriesDrawer = ({ categoriesDrawerOpen, setCategoriesDrawer }) => {

    const { categories,filter , setFilter } = useContext(DataContext)

    const closeDrawer = () => {
        setCategoriesDrawer(false)
    }

    const RenderCategories = () => {
        return categories.map(category => {
            return (
                <Grid key={category} align="center" item md={4} sm={6} xs={12}>
                    <Button onClick={(event) => {
                        setFilter({...filter,
                            category:event.currentTarget.textContent,
                            search:""
                        })
                        closeDrawer()
                    }}>
                        <Typography color="white" margin={"5px"} variant='body2'>
                            {category}
                        </Typography>
                    </Button>
                </Grid>
            )
        })
    }

    return (
        <Drawer open={categoriesDrawerOpen} anchor='top' onClose={closeDrawer}
            PaperProps={{
                sx: {
                    backgroundColor: "#1976d2"
                }
            }}
        >
            <Grid container>
                {<RenderCategories />}
            </Grid>
        </Drawer>
    )
}

export default CategoriesDrawer;