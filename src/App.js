import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BillDetails from './Components/BillDetails';
import ItemList from './Components/ItemList';
import TotalAmount from './Components/TotalAmount';
import GeneratePDF from './Components/GeneratePDF';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Login from './Components/Login';
import Footer from './Components/Footer'; // ✅ import Footer
import './App.css';

function App() {
    const [items, setItems] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleAddItem = (item) => {
        setItems([...items, item]);
    };

    const handleDeleteItem = (index) => {
        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        setItems(updatedItems);
    };

    const calculateTotalAmount = () => {
        return items.reduce((total, item) => total + item.quantity * item.price, 0);
    };

    return (
        <Router>
            <div className="App">
                {/* ✅ Navbar with login props */}
                <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

                    <Route
                        path="/bill-generator"
                        element={
                            isLoggedIn ? (
                                <div>
                                    <h1>Bill Generator</h1>
                                    <BillDetails onAddItem={handleAddItem} />
                                    <ItemList items={items} onDeleteItem={handleDeleteItem} />
                                    {/* <TotalAmount total={calculateTotalAmount()} />
                                    <GeneratePDF
                                        items={items}
                                        calculateTotalAmount={calculateTotalAmount}
                                    /> */}
                                </div>
                            ) : (
                                <Navigate to="/" replace />
                            )
                        }
                    />
                </Routes>

                {/* ✅ Footer added here */}
                <Footer />
            </div>
        </Router>
    );
}

export default App;
