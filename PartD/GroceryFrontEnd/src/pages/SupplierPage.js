import OrdersList from "../component/OrdersList.js";
import LogoutButton from "../component/LogoutButton.js";

const SupplierPage = () => {
    const supplierName = localStorage.getItem('name');
    return (
        <div>
            <div className="d-flex justify-content-end p-2">
                <LogoutButton/>
            </div>
            <h1 className="mb-4 text-center">Hello {supplierName}!</h1>

            <OrdersList></OrdersList>
        </div>
    );
}

export default SupplierPage;