import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { OutlinedInput, InputAdornment } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './Cart.css';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import {toast} from 'react-toastify'


//Material UI Styles
const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
});

const useStyles1 = makeStyles((theme) => ({
	paper: {
		position: 'absolute',
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

const styles = {
	root: {
		backgroundColor: 'powderblue',
		color: 'black',
	},
};
//Table Style
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
		// backgroundColor: theme.palette.success.light,
		// color: theme.palette.common.black,
	},
	body: {
		fontSize: 20,
		backgroundColor: 'powderblue',
		color: theme.palette.common.black,
	},
}))(TableCell);
//Style for Modal
function getModalStyle() {
	const top = 30;
	const left = 45;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

function Cart() {
	const dispatch = useDispatch();
	const cartDatas = useSelector((store) => store.Cart);
	const classes = useStyles();
	const classes1 = useStyles1();
	const [orderUpdate, setOrderUpdate] = useState(0);
	const [open, setOpen] = useState(false); //For Update Modal
	const [orderID, setOrderID] = useState(0)
	const [cartID, setCartID] = useState(0)
	const [modalStyle] = React.useState(getModalStyle);

	//Open & Close Modal
	const handleClose = () => {
		setOpen(false);
	};

	function updateButton(data) {
		console.log(data)
		setOrderUpdate(data.Quantity)
		setOrderID(data.ProductId)
		setCartID(data.id)
		setOpen(true);
	}

	function setUpdateNumber(dataUpdate) {
		setOrderUpdate(dataUpdate.target.value)
	}

	function submit() {
		//For Update Data to Server
		console.log(`jumlah yang diupdate ${orderUpdate}`, `ID is ${orderID}`);
		Axios({
			url: `https://frozen-meadow-20864.herokuapp.com/cart/${cartID}`,
			method: 'PUT',
			headers: {
				access_token: localStorage.getItem('Access_Token'),
			},
			data: {
				ProductId: orderID,
				Quantity: orderUpdate,
			},
		})
		.then(function(result) {
			console.log(result.data)
			dispatch({
				type: 'updateCart'
			})
			
			toast.success('Update Cart Success',{
				position: 'bottom-left',
                autoClose: 2500,
                hideProgressBar: true,
                closeOnClick: true
			})		
			setOpen(false)
			this.forceUpdate()
		})
		.catch(function(err) {
			console.log(err)
		})
		
	}

	function deleteButton(data) {
		console.log('Delete EUY~~', data);
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
				<div className="cartTable">
					<TableContainer component={Paper}>
						<Table className={classes.table} aria-label="cart-table">
							<TableHead>
								<TableRow
									classes={{
										root: styles.root,
									}}
								>
									<StyledTableCell>Name</StyledTableCell>
									<StyledTableCell>Quantity</StyledTableCell>
									<StyledTableCell colSpan={2}>Option</StyledTableCell>
								</TableRow>
							</TableHead>
							{cartDatas.map((cartData) => (
								<TableBody key={cartData.id}>
									<StyledTableCell1>{cartData.Product.Name}</StyledTableCell1>
									<StyledTableCell1>{cartData.Quantity}</StyledTableCell1>
									<StyledTableCell1>
										<Button
											variant="contained"
											color="primary"
											onClick={() => updateButton(cartData)}
										>
											Update
										</Button>
									</StyledTableCell1>
									<StyledTableCell1>
										<Button
											variant="contained"
											color="secondary"
											onClick={() => deleteButton(cartData)}
										>
											Delete
										</Button>
									</StyledTableCell1>
								</TableBody>
							))}
						</Table>
					</TableContainer>

					<Modal
						open={open}
						onClose={handleClose}
						aria-labelledby="simple-modal-title"
						aria-describedby="simple-modal-description"
					>
						<div style={modalStyle} className={classes1.paper}>
							<h1 id="simple-modal-title">Update</h1>
							<div>
								<form className="OrderForm">
									<OutlinedInput
										id="outlined-adornment-amount"
										value={orderUpdate}
										placeholder="Amount"
										onChange={setUpdateNumber}
										endAdornment={<InputAdornment position="end">Pcs</InputAdornment>}
										labelWidth={30}
										size="small"
									/>
									<Button size="small" color="primary" variant="outlined" onClick={submit}>
										Update Cart
									</Button>
								</form>
							</div>
						</div>
					</Modal>
				</div>
			</>
		);
	} else {
		return <Redirect to="login"></Redirect>;
	}
}

export default Cart;
