import React,{useState} from 'react'
import {Box ,Card,CardContent,CardActions,Collapse,Button,Rating,useTheme, useMediaQuery, Typography} from '@mui/material'
import { useGetProductsQuery } from 'state/api'
import Header from 'components/Header'
const Products = () => {
  const {data,isLoading} = useGetProductsQuery();
  const isNonMobile = useMediaQuery('(min-width:1000px)'); // true for desktop and false for mobile
  // console.log(data)
  const theme = useTheme();


  const Product=({
    _id,
    name,
    description,
    price,
    rating,
    category,
    supply,
    stats
  })=>{
        const [isExpanded,setExpanded]=useState(false);
        return (
          <Card sx={{
              backgroundColor: theme.palette.background.alt,
              borderRadius: "0.55rem",
              
            }}>
          <CardContent>
            <Typography sx={{fontSize:"1.25rem"}} color={theme.palette.secondary[300]} gutterBottom>
              {category}    
              </Typography>  
            <Typography variant="h5" component="div">
              {name}
            </Typography>
            <Typography sx={{mb:"1.5rem"}} color={theme.palette.secondary[400]}>
              ${Number(price).toFixed(2)}
            </Typography>
            <Rating value={rating} readOnly />
            <Typography variant="body2" >{description}</Typography>
            </CardContent>
            <CardActions>
              <Button size="small" variant="primary" onClick={() => setExpanded(!isExpanded)}>
                See More
              </Button>
            </CardActions>
            <Collapse
            in={isExpanded}
            timeout="auto"
            unmountOnExit
            sx={{color: theme.palette.neutral[300]}}
            >
            <CardContent>
              <Typography>id:{_id}</Typography>
              <Typography>Supply Left:{supply}</Typography>
              <Typography>Yearly Sales:{stats.yearlySales}</Typography>
              <Typography>Yearly Units:{stats.yearlyUnits}</Typography>
            </CardContent>
            
            </Collapse>
          </Card>
        )
  }

  return (
    <Box m="1.5rem 2.5rem" >
      <Header title="Products" subtitle="List of all products" />
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Box display="grid" mt="20px" 
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        justifyContent="space-between"
        rowGap="20px"
        columnGap="1.33%"
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }
        }}
        >
          {data.map(({_id,name,description,price,rating,category,supply,stats})=>(
            <Product key={_id} {...{_id,name,description,price,rating,category,supply,stats}} />
          ))}
        </Box>
      )}
    </Box>
  )
}

export default Products