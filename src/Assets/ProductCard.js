import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { OutlinedInput, InputAdornment } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
	root: {
		maxWidth: 345,
	},
});

function ProductCard(props) {
	const classes = useStyles();
	const data = props.data;
	const [Order, setOrder] = useState(0);

	function addorder(event) {
        setOrder(event.target.value)
    }
    
    function submit(value) {
        //Untuk dikirim ke server
        console.log(Order, data)
    }
    const margin = {
        marginRight: '0.5vw',
        marginBottom: '1vh'
    }
	return (
		<Card className={classes.root} style={margin}>
			<CardActionArea>
				<CardMedia
					component="img"
					alt="Product Image"
					height="140"
					image={data.Image_Url}
					title="Contemplative Reptile"
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						{data.Name}
					</Typography>
					<Typography variant="body2" color="textSecondary" component="p">
						<p>Price: {data.Price}</p>
						<p>Stock: {data.Stock}</p>
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<form className="OrderForm">
					<OutlinedInput
						id="outlined-adornment-amount"
                        // value={Order}
                        placeholder= 'Amount'
						onChange={addorder}
						endAdornment={<InputAdornment position="end">Pcs</InputAdornment>}
                        labelWidth={30}
                        size="small"
					/>
					<Button size="small" color="primary" variant="outlined" onClick={submit}>
						Add to Cart
					</Button>
				</form>
			</CardActions>
		</Card>
	);
}

export default ProductCard;
