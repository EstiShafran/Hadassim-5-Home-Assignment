import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OrdersList from '../component/OrdersList.js';
import LogoutButton from '../component/LogoutButton.js';

// import AddOrder from '../component/AddOrder';

const GroceryOwnerPage = () => {
    const navigate = useNavigate();
    const ownerName = localStorage.getItem('name');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, []);

    return (
        <div className="container mt-5">
            {/* {newOrder ? (<AddOrder></AddOrder>) : ()} */}
            <h1 className=" mb-4 mt-5 text-center">Hello {ownerName}!</h1>
            <div className="d-flex justify-content-end p-2">
                <LogoutButton />
            </div>

            <button
                type='button'
                className="btn btn-dark mt-3"
                onClick={() => navigate('/groceryOwner/addOrder')}
            >
                <i class="bi bi-plus-lg"></i> Create a new order
            </button>

            <OrdersList></OrdersList>

        </div>
    );
}

export default GroceryOwnerPage;

