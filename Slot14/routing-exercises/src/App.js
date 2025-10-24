import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import DashboardHome from './pages/dashboard/DashboardHome';
import Settings from './pages/dashboard/Settings';
import Reports from './pages/dashboard/Reports';


function App() {
return (
<>
<Navigation />
<div className="container" style={{ padding: 16 }}>
<Routes>
<Route path="/" element={<Home />} />


{/* Exercise 1 & 2 */}
<Route path="/san-pham" element={<Products />} />
<Route path="/san-pham/:productId" element={<ProductDetail />} />


<Route path="/lien-he" element={<Contact />} />


{/* Nested dashboard routes (Exercise 3) */}
<Route path="/dashboard" element={<DashboardLayout />}>
<Route index element={<DashboardHome />} />
<Route path="settings" element={<Settings />} />
<Route path="reports" element={<Reports />} />
</Route>


{/* 404 */}
<Route path="*" element={<NotFound />} />
</Routes>
</div>
</>
);
}


export default App;