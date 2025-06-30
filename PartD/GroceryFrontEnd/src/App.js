import logo from './logo.svg';
import './App.css';
import { Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage.js';
import RegisterPage from './pages/RegisterPage.js';
// import OrdersListPage from './pages/OrdersListPage.js';
import GroceryOwnerPage from './pages/GroceryOwnerPage.js';
import AddOrderPage from './pages/AddOrderPage.js';
import SupplierPage from './pages/SupplierPage.js';
import RequireRole from './component/RequireRole.js';

function App() {

  return (
    <div className="App">
      {/* <Router> */}
      <Routes>
        <Route path="/login" element={<LoginPage></LoginPage>} />
        {/* <Route path="/login" element={<h1>Login Page</h1>} /> */}
        <Route path="/register" element={<RegisterPage></RegisterPage>} />
        <Route path="/groceryOwner" element={<RequireRole allowedRoles={['owner']}><GroceryOwnerPage /></RequireRole>} />
        <Route path="/groceryOwner/addOrder" element={<RequireRole allowedRoles={['owner']}><AddOrderPage /></RequireRole>} />
        <Route path="/supplier" element={<RequireRole allowedRoles={['supplier']}><SupplierPage /></RequireRole>} />
        <Route path="/unauthorized" element={<h2 className='mt-5 text-center'>Unauthorized Access</h2>} />
      </Routes>
      {/* </Router> */}
    </div>
  );
}

export default App;
