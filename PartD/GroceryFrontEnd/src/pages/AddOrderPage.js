// // import React, { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';

// // const AddOrderPage = () => {
// //     const navigate = useNavigate();

// //     const [suppliers, setSuppliers] = useState([]);
// //     const [products, setProducts] = useState([]);
// //     const [selectedSupplier, setSelectedSupplier] = useState('');
// //     const [selectedItems, setSelectedItems] = useState({}); // { productId: { checked: true/false, quantity: number } }

// //     useEffect(() => {
// //         async function fetchSuppliers() {
// //             try {
// //                 const res = await fetch('http://localhost:5000/api/suppliers');
// //                 const data = await res.json();
// //                 setSuppliers(data);
// //             } catch (err) {
// //                 console.error('Error fetching suppliers:', err);
// //             }
// //         }
// //         fetchSuppliers();
// //     }, []);

// //     useEffect(() => {
// //         const supplier = suppliers.find(s => s._id === selectedSupplier);
// //         if (supplier) {
// //             setProducts(supplier.products || []);
// //             const initialItems = {};
// //             (supplier.products || []).forEach(p => {
// //                 initialItems[p._id] = { checked: false, quantity: p.minQuantity || 0 };
// //             });
// //             setSelectedItems(initialItems);
// //         } else {
// //             setProducts([]);
// //             setSelectedItems({});
// //         }
// //     }, [selectedSupplier]);

// //     function handleCheckChange(productId, isChecked) {
// //         setSelectedItems(prev => ({
// //             ...prev,
// //             [productId]: {
// //                 ...prev[productId],
// //                 checked: isChecked
// //             }
// //         }));
// //     }

// //     function handleQuantityChange(productId, quantity) {
// //         setSelectedItems(prev => ({
// //             ...prev,
// //             [productId]: {
// //                 ...prev[productId],
// //                 quantity: Number(quantity)
// //             }
// //         }));
// //     }

// //     async function handleSubmit(e) {
// //         e.preventDefault();
// //         const items = Object.entries(selectedItems)
// //             .filter(([_, val]) => val.checked)
// //             .map(([productId, val]) => ({
// //                 product: productId,
// //                 quantity: val.quantity
// //             }));

// //         if (items.length === 0) {
// //             alert("Please select at least one product.");
// //             return;
// //         }

// //         try {
// //             const res = await fetch('http://localhost:5000/api/orders', {
// //                 method: 'POST',
// //                 headers: { 'Content-Type': 'application/json' },
// //                 body: JSON.stringify({
// //                     supplier: selectedSupplier,
// //                     items
// //                 })
// //             });
// //             if (res.ok) {
// //                 alert('Order created successfully');
// //                 navigate('/groceryOwner');
// //             } else {
// //                 console.error(await res.text());
// //                 alert('Error creating order');
// //             }
// //         } catch (err) {
// //             console.error('Submission error:', err);
// //         }
// //     }

// //     return (
// //         <div className="container mt-5"
// //             style={{
// //                 maxWidth: '400px',
// //                 border: '1px solid #ccc',
// //                 padding: '20px',
// //                 borderRadius: '8px',
// //                 boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 13px 4px'
// //             }}>
// //             <h4 className="mb-4">Create New Order</h4>

// //             <form onSubmit={handleSubmit} >
// //                 <div className="mb-3">
// //                     <label className="form-label" >
// //                         Select Supplier:
// //                     </label>
// //                     <select
// //                         className="form-select "
// //                         value={selectedSupplier}
// //                         onChange={(e) => setSelectedSupplier(e.target.value)}
// //                         required
// //                     >
// //                         <option value="">-- Choose a supplier --</option>
// //                         {suppliers.map(s => (
// //                             <option key={s._id} value={s._id}>
// //                                 {s.contactName}
// //                             </option>
// //                         ))}
// //                     </select>
// //                 </div>

// //                 {products.length > 0 && (
// //                     <div className="mb-3">
// //                         <label className="form-label">Select Products and Quantities:</label>
// //                         {products.map(p => (
// //                             <div key={p._id} className="d-flex align-items-center mb-2">
// //                                 <input
// //                                     type="checkbox"
// //                                     className="form-check-input me-2"
// //                                     checked={selectedItems[p._id]?.checked || false}
// //                                     onChange={(e) => handleCheckChange(p._id, e.target.checked)}
// //                                 />
// //                                 <div className="me-3" style={{ width: '150px' }}>{p.productName}</div>
// //                                 {selectedItems[p._id]?.checked && (
// //                                     <input
// //                                         type="number"
// //                                         className="form-control w-25"
// //                                         min={p.minQuantity}
// //                                         value={selectedItems[p._id]?.quantity || ''}
// //                                         onChange={(e) => handleQuantityChange(p._id, e.target.value)}
// //                                         placeholder="Quantity"
// //                                     />
// //                                 )}
// //                             </div>
// //                         ))}
// //                     </div>
// //                 )}

// //                 <div className="d-flex justify-content-between mt-4">
// //                     <button
// //                         type="button"
// //                         onClick={() => navigate("/groceryOwner")}
// //                         className="btn btn-secondary"
// //                     >
// //                         Cancel
// //                     </button>
// //                     <button type="submit" className="btn btn-success">
// //                         Create Order
// //                     </button>
// //                 </div>
// //             </form>
// //         </div>
// //     );
// // };

// // export default AddOrderPage;


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const AddOrderPage = () => {
//     const navigate = useNavigate();

//     const [suppliers, setSuppliers] = useState([]);
//     const [products, setProducts] = useState([]);
//     const [selectedSupplier, setSelectedSupplier] = useState('');
//     const [selectedItems, setSelectedItems] = useState([]);

//     useEffect(() => {
//         async function fetchSuppliers() {
//             try {
//                 const res = await fetch('http://localhost:5000/api/suppliers');
//                 const data = await res.json();
//                 setSuppliers(data);
//             } catch (err) {
//                 console.error('Error fetching suppliers:', err);
//             }
//         }
//         fetchSuppliers();
//     }, []);

//     useEffect(() => {
//         setProducts(suppliers.find(s => s._id === selectedSupplier)?.products || []);
//         setSelectedItems([]);
//     }, [selectedSupplier]);

//     function handleQuantityChange(productId, quantity) {
//         setSelectedItems(prev => {
//             const existing = prev.find(item => item.product === productId);
//             if (existing) {
//                 return prev.map(item =>
//                     item.product === productId ? { ...item, quantity: Number(quantity) } : item
//                 );
//             } else {
//                 return [...prev, { product: productId, quantity: Number(quantity) }];
//             }
//         });
//     }

//     async function handleSubmit(e) {
//         e.preventDefault();
//         try {
//             const res = await fetch('http://localhost:5000/api/orders', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({
//                     supplier: selectedSupplier,
//                     items: selectedItems
//                 })
//             });
//             if (res.ok) {
//                 alert('Order created successfully');
//                 navigate('/groceryOwner');
//             } else {
//                 console.error(await res.text());
//                 alert('Error creating order');
//             }
//         } catch (err) {
//             console.error('Submission error:', err);
//         }
//     }

//     return (
//         <div className="container mt-5" 
//         // style={{ maxWidth: '700px' , border: '1px solid #ccc', padding: '20px', borderRadius: '8px', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 13px 4px'}}
//         >
//             {/* <div className="card shadow p-4"> */}
//                 <h4 className="mb-4">Create New Order</h4>

//                 <form onSubmit={handleSubmit}>
//                     <div className="mb-3">
//                         <label className="form-label">Select Supplier:</label>
//                         <select
//                             className="form-select"
//                             value={selectedSupplier}
//                             onChange={(e) => setSelectedSupplier(e.target.value)}
//                             required
//                         >
//                             <option value="">-- Choose a supplier --</option>
//                             {suppliers.map(s => (
//                                 <option key={s._id} value={s._id}>
//                                     {s.contactName}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>

//                     {products.length > 0 && (
//                         <table class="table text-center table-hover">
//                             <thead>
//                                 <tr>
//                                     <th>Select</th>
//                                     <th>Product Name</th>
//                                     <th>Price Per Unit</th>
//                                     <th>Minimum Quantity</th>
//                                     <th>Quantity</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {products.map(p => (
//                                     <tr key={p._id}>
//                                         <td>
//                                             <input type='checkbox'>
//                                             </input>
//                                         </td>
//                                         <td>{p.productName}</td>
//                                         <td>{p.pricePerUnit}</td>
//                                         <td>{p.minQuantity}</td>
//                                         <td>
//                                             <input type='number'>
//                                             </input>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     )}  

//                     {/* {products.length > 0 && (
//                         <div className="mb-3">
//                             <label className="form-label">Select Products and Quantities:</label>
//                             {products.map(p => (
//                                 <div key={p._id} className="d-flex align-items-center mb-2">
//                                     <div className="me-3" style={{ width: '150px' }}>{p.productName}</div>
//                                     <input
//                                         type="number"
//                                         className="form-control w-25"
//                                         min= {p.minQuantity}
//                                         placeholder="Quantity"
//                                         onChange={(e) => handleQuantityChange(p._id, e.target.value)}
//                                     />
//                                 </div>
//                             ))}
//                         </div>
//                     )} */}

//                     <div className="d-flex justify-content-between mt-4">
//                         <button
//                             type="button"
//                             onClick={() => navigate("/groceryOwner")}
//                             className="btn btn-secondary"
//                         >
//                             Cancel
//                         </button>
//                         <button type="submit" className="btn btn-success">
//                             Create Order
//                         </button>
//                     </div>
//                 </form>
//             {/* </div> */}
//         </div>
//     );
// };

// export default AddOrderPage;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddOrderPage = () => {

    const navigate = useNavigate();

    const [suppliers, setSuppliers] = useState([]);
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const [products, setProducts] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [subtotal, setSubtotal] = useState(0);



    useEffect(() => {
        async function fetchSuppliers() {
            try {
                const res = await fetch('http://localhost:5000/api/suppliers');
                const data = await res.json();
                setSuppliers(data);
            } catch (err) {
                console.error('Error fetching suppliers:', err);
            }
        }
        fetchSuppliers();
    }, []);

    useEffect(() => {
        setProducts(suppliers.find(s => s._id === selectedSupplier)?.products || []);
        setSelectedItems([]);
    }, [selectedSupplier]);

    const handleCheckChange = (productId, minQty) => {
        setSelectedItems(prev => {
            const existing = prev.find(item => item.product === productId);
            if (existing) {
                return prev.filter(item => item.product !== productId);
            }
            return [...prev, { product: productId, quantity: minQty || 0 }];
        })
    }

    const handleQuantityChange = (productId, quantity) => {
        setSelectedItems(prev => {
            const existing = prev.find(item => item.product === productId);
            if (existing) {
                return prev.map(item =>
                    item.product === productId ? { ...item, quantity: Number(quantity) } : item
                );
            }
        });
    }

    useEffect(() => {
        const calculatedSum = selectedItems.reduce((acc, item) => {
            // חפש את המוצר המתאים במערך ה-products
            const product = products.find(p => p._id === item.product);

            // אם המוצר נמצא, הוסף את מחיר היחידה כפול הכמות לסכום
            // אחרת, הוסף 0 (או טפל בשגיאה/הודעה)
            return acc + (product ? product.pricePerUnit * item.quantity : 0);
        }, 0); // אתחול הסכום הכולל ל-0
        setSubtotal(calculatedSum)
    }, [selectedItems]);

    async function handleSubmit(e) {
        e.preventDefault();
        if (!selectedSupplier) {
            alert("Please select a supplier.");
            return;
        }
        if (selectedItems.length === 0) {
            alert("You have not selected any products.");
            return;
        }
        try {
            const res = await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    supplier: selectedSupplier,
                    items: selectedItems
                })
            });
            if (res.ok) {
                alert('Order created successfully');
                navigate('/groceryOwner');
            } else {
                console.error(await res.text());
                alert('Error creating order');
            }
        } catch (err) {
            console.error('Submission error:', err);
        }
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Create New Order</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Select Supplier:</label>
                    <select
                        className="form-select"
                        style={{ width: "300px" }}
                        onChange={(e) => {
                            setSelectedSupplier(e.target.value);
                        }}
                        required
                    >
                        <option value="">-- Choose a supplier --</option>
                        {suppliers.map(s => (
                            <option key={s._id} value={s._id}>
                                {s.contactName}
                            </option>
                        ))}
                    </select>
                </div>
                {
                    products.length > 0 && (
                        <table className='table text-center table-hover'>
                            <thead>
                                <tr>
                                    <th>Select</th>
                                    <th>Product Name</th>
                                    <th>Price Per Unit</th>
                                    <th>Minimum Quantity</th>
                                    <th>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    products.map(p => (
                                        <tr className={selectedItems.some(item => item.product === p._id) && 'table-active'}>
                                            <td  >
                                                <input
                                                    type='checkbox'
                                                    className="form-check-input"
                                                    onChange={(e) => { handleCheckChange(p._id, p.minQuantity) }}

                                                >
                                                </input>
                                            </td>
                                            <td>{p.productName}</td>
                                            <td>{p.pricePerUnit}</td>
                                            <td>{p.minQuantity}</td>
                                            <td>
                                                <input
                                                    type='number'
                                                    min={p.minQuantity}
                                                    defaultValue={p.minQuantity}
                                                    onChange={(e) => handleQuantityChange(p._id, e.target.value)}
                                                    disabled={!selectedItems.some(item => item.product === p._id)}
                                                >
                                                </input>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>

                        </table>
                    )
                }
                <div className="mb-3 mt-4">
                    <h4 className="form-label">Subtotal: {subtotal}</h4>
                </div>
                <div className="d-flex mt-4">
                    <button
                        type="button"
                        style={{ marginRight: "10px" , width: "130px" }}
                        onClick={() => navigate("/groceryOwner")}
                        className="btn btn-secondary"
                    >
                        Cancel
                    </button>
                    <button 
                    type="submit" 
                    style={{ marginLeft: "10px" , width: "130px" }}
                    className="btn btn-success">
                        Create Order
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddOrderPage;

