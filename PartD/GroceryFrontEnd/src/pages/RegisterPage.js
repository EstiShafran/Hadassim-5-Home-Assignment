import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import ProductListForm from '../component/ProductListForm';

const RegisterPage = () => {
    const navigate = useNavigate();


    const [companyName, setCompanyName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [contactName, setContactName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [products, setProducts] = useState([{ productName: " ", pricePerUnit: 0, minQuantity: 0 }]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, []);

    const handleProductChange = (index, field, value) => {
        const newArr = [...products];
        newArr[index][field] = value;
        setProducts(newArr);
    }

    const addProduct = () => {
        setProducts([...products, { name: '', price: '', minQty: '' }]);
    }

    const handleSubmit = async (event) => {

        event.preventDefault();

        const newSupplier = {
            "companyName": companyName,
            "phoneNumber": phoneNumber,
            "contactName": contactName,
            "email": email,
            "password": password,
            "products": products
        }
        console.log('נשלח לשרת:', newSupplier.products);
        try {
            let response = await fetch('http://localhost:5000/api/suppliers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newSupplier)
            })
            if (response.status === 201) {
                console.log("Supplier created successfully");
                alert('השמירה הצליחה');
                navigate('/login');
            }
            else
                if (response.status === 400) {
                    alert("קבר קיים משתמש עם מייל זה נא להזין מייל אחר");
                    return;
                }
                else {
                    alert('שגיאה בשמירה, נא לנסות שוב מאוחר יותר');
                    console.error('Error:', response.statusText);
                    return;
                }
            // else {
            //     alert('השמירה הצליחה')
            // }
        }
        catch (error) {
            console.error('Error:', error.message);
            alert('שגיאה בשמירה, נא לנסות שוב מאוחר יותר');
            return;
        }
    }

    return (
        <div className="container mt-5"
            style={{ maxWidth: '650px', border: '1px solid #ccc', padding: '30px', borderRadius: '8px', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 13px 4px' }}>
            <h2 className="mb-4 text-center">Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Company Name</label>
                    <input
                        type="text"
                        className="form-control"
                        // value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Phone Number</label>
                    <input
                        type="tel"
                        className="form-control"
                        // value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Representative Name</label>
                    <input
                        type="text"
                        className="form-control"
                        // value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Email Address</label>
                    <input
                        type="email"
                        className="form-control"
                        // value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        // value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <hr></hr>

                <ProductListForm products={products} onProductChange={handleProductChange} onAddProduct={addProduct}></ProductListForm>

                <hr></hr>

                <button type="submit" className="btn btn-success w-100">Sign Up</button>

                <div className="mt-3 text-center">
                    <span>Already have an account? </span>
                    <button type="button" className="btn btn-link" style={{ color: 'black' }} onClick={() => navigate('/login')}>
                        login
                    </button>
                </div>

            </form>
        </div>
    );
}

export default RegisterPage;