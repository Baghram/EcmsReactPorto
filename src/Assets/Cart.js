import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './Cart.css'
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles({
	table: {
		minWidth: 650
	},
});

const styles = {
	root : {
		backgroundColor: 'powderblue',
		color: 'black'
	}
}

const StyledTableCell = withStyles((theme) => ({
	head: {
	  backgroundColor: theme.palette.success.light,
	  color: theme.palette.common.black,
	},
	body: {
	  fontSize: 16,
	},
  }))(TableCell);

  const StyledTableCell1 = withStyles((theme) => ({
	head: {
	  backgroundColor: theme.palette.success.light,
	  color: theme.palette.common.black,
	},
	body: {
	  fontSize: 20,
	  backgroundColor: 'powderblue',
	  color: theme.palette.common.black,
	},
  }))(TableCell);

function Cart() {
	const dispatch = useDispatch();
	const cartDatas = useSelector((store) => store.Cart);
	const classes = useStyles();
	const history = useHistory()

	function updateButton(data) {
		console.log('UPDATE EUY~~', data)
		history.push(`/cart/update/${data.id}`)
	}

	function deleteButton(data) {
		console.log('Delete EUY~~', data)
	}
	useEffect(() => {
		Axios({
			url: 'https://frozen-meadow-20864.herokuapp.com/cart',
			method: 'GET',
			headers: {
				access_token: localStorage.getItem('Access_Token'),
			},
		})
			.then((result) => {
				console.log('Cart Result', result.data);
				dispatch({
					type: 'getCart',
					payload: result.data,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}, [dispatch]);

	if (localStorage.getItem('Access_Token')) {
		dispatch({ type: 'loggedIn' });
		return (
			<>
			<h1 className="titleCart">Shopping Cart</h1>
			<div className='cartTable'>
				<TableContainer component={Paper}>
					<Table className={classes.table} aria-label="cart-table">
						<TableHead>
							<TableRow classes={{
								root: styles.root
							}}>
								<StyledTableCell>Name</StyledTableCell>
								<StyledTableCell>Quantity</StyledTableCell>
								<StyledTableCell colSpan={2}>Option</StyledTableCell>
							</TableRow>
						</TableHead>
						{cartDatas.map((cartData) => (
							<TableBody key={cartData.id}>
								<StyledTableCell1>{cartData.Product.Name}</StyledTableCell1>
								<StyledTableCell1>{cartData.Quantity}</StyledTableCell1>
								<StyledTableCell1><Button variant="contained" color="primary" onClick={() => updateButton(cartData)}>Update</Button></StyledTableCell1>
								<StyledTableCell1><Button variant="contained" color="secondary" onClick={() => deleteButton(cartData)}>Delete</Button></StyledTableCell1>
							</TableBody>
						))}
					</Table>
				</TableContainer>

			</div>
			</>
		);
	} else {
		return <Redirect to="login"></Redirect>;
	}
}

export default Cart;
