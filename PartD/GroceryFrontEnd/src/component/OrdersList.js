import { useEffect, useState } from 'react';

const OrdersList = () => {

    const role = localStorage.getItem('role');
    const token = localStorage.getItem('token');
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null); // ההזמנה שנבחרה לצפייה
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [supplierFilter, setSupplierFilter] = useState('All');
    const [sortAsc, setSortAsc] = useState(true);


    const fetchAllOrders = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/orders');
            if (!response.ok) {
                alert('Error loading orders, please try again later.');
                setLoading(false);
                return;
            }
            const data = await response.json();
            setOrders(data);
            setLoading(false);
        } catch (error) {
            console.error('שגיאה בטעינת ההזמנות:', error);
            setLoading(false);
        }
    };

    const fetchSupplierOrders = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/orders/supplier/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                alert('Error loading orders, please try again later.');
                setLoading(false);
                return;
            }
            const data = await response.json();
            setOrders(data);
            setLoading(false);
        }
        catch (error) {
            console.error('שגיאה בטעינת ההזמנות של הספק:', error);
            setLoading(false);
        }
    }

    useEffect(() => {
        if (role === 'owner') {
            fetchAllOrders();
        }
        else {
            fetchSupplierOrders();
        }

    }, []);

    const updateOrderStatus = async (orderId) => {
        const newStatus = role === 'owner' ? "Completed" : "In process";
        alert("האם אתה בטוח שאתה רוצה לשנות את הסטטוס של ההזמנה?");
        try {
            const response = await fetch(`http://localhost:5000/api/orders/updateStatus/${orderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ _id: orderId, status: newStatus })
            });
            if (response.ok) {
                setOrders(prevOrders =>
                    prevOrders.map(order =>
                        order._id === orderId ? { ...order, status: newStatus } : order
                    )
                );
                alert('הסטטוס עודכן בהצלחה');
            }
        } catch (error) {
            console.error('שגיאה בעידכון ההזמנה ההזמנות:', error);
        }
    }

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Awaiting approval':
                return <i class="bi bi-exclamation-circle-fill text-danger"></i>
            case 'In process':
                return <i class="bi bi-minecart-loaded text-warning"></i>
            case 'Completed':
                // return 'bg-info text-white'; // רקע כחול בהיר, טקסט
                return <i class="bi bi-check-circle-fill text-success"></i>
            default:
                return '';
        }
    };

    const filteredOrders = orders
        .filter(order =>
            order._id.includes(searchTerm) &&
            (statusFilter === 'All' || order.status === statusFilter) &&
            (supplierFilter === 'All' || order.supplier?.contactName === supplierFilter)
        )
        .sort((a, b) =>
            sortAsc
                ? new Date(a.createdAt) - new Date(b.createdAt)
                : new Date(b.createdAt) - new Date(a.createdAt)
        );



    if (loading) return <p className="text-center mt-5">Loading</p>;

    return (
        <div className="container mt-5">
            <h2 className="mb-3 ">Order List</h2>
            {orders.length === 0 ? (
                <p>No orders found</p>
            ) : (
                <>
                    <div className="d-flex flex-wrap gap-3 mb-4 align-items-end">
                        <input
                            type="text"
                            placeholder="Search by Order ID"
                            className="form-control"
                            style={{ maxWidth: '200px' }}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />

                        {role === 'owner' && (
                            <select
                                className="form-select"
                                style={{ maxWidth: '180px' }}
                                value={supplierFilter}
                                onChange={(e) => setSupplierFilter(e.target.value)}
                            >
                                <option value="All">All Suppliers</option>
                                {[...new Set(orders.map(o => o.supplier?.contactName))]
                                    .filter(Boolean)
                                    .map(name => (
                                        <option key={name} value={name}>{name}</option>
                                    ))}
                            </select>
                        )}

                        <button
                            className="btn btn-outline-secondary"
                            onClick={() => setSortAsc(!sortAsc)}
                        >
                            Sort by Date {sortAsc ? '↑' : '↓'}
                        </button>

                        <select
                            className="form-select"
                            style={{ maxWidth: '180px' }}
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="All">All Statuses</option>
                            <option value="Awaiting approval">Awaiting approval</option>
                            <option value="In process">In process</option>
                            <option value="Completed">Completed</option>
                        </select>

                    </div>

                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th className='col-3'>Order number</th>
                                {role === 'owner' && <th className='col-2'>Supplier</th>}
                                {/* <th>Supplier</th> */}
                                <th className='col-2'>Date</th>
                                <th className='col-3'>Status</th>
                                <th className='col-2'></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order) => (
                                // className={getStatusColumnClass(order.status)}
                                <tr key={order._id} onClick={() => setSelectedOrder(order)} style={{ cursor: 'pointer' }}>
                                    <td>{order._id}</td>
                                    {role === 'owner' && <td>{order.supplier?.contactName || '—'}</td>}
                                    {/* <td>{order.supplier?.contactName || '—'}</td> */}
                                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td >{getStatusIcon(order.status)}   {order.status}</td>
                                    <td>
                                        {role === 'owner' && order.status === "In process" && (
                                            <button
                                                type='button'
                                                className="btn btn-sm btn-outline-success"
                                                onClick={(e) => {
                                                    updateOrderStatus(order._id);
                                                    e.stopPropagation(); // כדי שהONCLICK של השורה לא יופעל
                                                }}
                                            >
                                                Mark as complete
                                            </button>
                                        )}
                                        {role === 'supplier' && order.status === "Awaiting approval" && (

                                            <button
                                                type='button'
                                                className="btn btn-sm btn-outline-warning"
                                                onClick={(e) => {
                                                    updateOrderStatus(order._id);
                                                    e.stopPropagation(); // כדי שהONCLICK של השורה לא יופעל
                                                }}
                                            >
                                                Mark as in process
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}

            {/* Modal לצפייה בפרטי הזמנה */}
            {selectedOrder && (
                <div
                    className="modal show fade d-block"
                    tabIndex="-1"
                    role="dialog"
                    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                    onClick={() => setSelectedOrder(null)}
                >
                    <div className="modal-dialog" role="document" onClick={e => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Order Details   {getStatusIcon(selectedOrder.status)} </h5>
                                <button type="button" className="btn-close" onClick={() => setSelectedOrder(null)}></button>
                            </div>
                            <div className="modal-body">
                                <p><strong>Order Number: </strong> {selectedOrder._id}</p>
                                <p><strong>Supplier: </strong> {selectedOrder.supplier?.contactName || '—'}</p>
                                <p><strong>Date: </strong> {new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
                                <p><strong>Status: </strong>{selectedOrder.status} </p>

                                <hr />
                                <h6>Products:</h6>
                                <table className="table table-sm">
                                    <thead>
                                        <tr>
                                            <th>Product Name</th>
                                            <th>Quantity</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedOrder.items.map((item, i) => (
                                            <tr key={i}>
                                                <td>{item.product.productName}</td>
                                                <td>{item.quantity}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default OrdersList;