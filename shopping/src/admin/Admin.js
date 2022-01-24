import React,{useState} from 'react'
import {Link} from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import AddProduct from './AddProduct';

function Admin() {

    const[open,setOpen]=useState(false);
    return (
        <>
        <div className='heading-2'>
            <h3 style={{paddingLeft:`20px`}}>Bhoomi hills Naturals-Admin Panel</h3>
            <Link style={{paddingRight:`20px`,color:`White`,textDecoration:`none`}}>Sign out</Link>
        </div>

        <div className='sidebar'>
            <Link className='tab' to='#'><DashboardIcon style={{marginRight:`10px`,marginLeft:`10px`}} />DashBoard</Link>
            <Link className='tab' to='/products'><ShoppingBasketIcon style={{marginRight:`10px`,marginLeft:`10px`}} />Products</Link>
            <Link className='tab' to='#'><InsertDriveFileIcon style={{marginRight:`10px`,marginLeft:`10px`}} />Orders</Link>
            <Link className='tab' to='#'><CategoryIcon style={{marginRight:`10px`,marginLeft:`10px`}} /> Categories</Link>
            <Link className='tab' onClick={()=>setOpen(true)} to='#'><AddIcon style={{marginRight:`10px`,marginLeft:`10px`}} /> Add Item</Link>
        </div>
        <AddProduct open={open} onClose={()=>setOpen(false)} />
        </>
    )
}

export default Admin
