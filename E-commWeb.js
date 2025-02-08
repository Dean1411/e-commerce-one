import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Button, Card, CardContent, Input, Label, Select } from "@/components/ui";

const ProductPage = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, { ...product, quantity: 1 }]);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Shop Our Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {[1, 2, 3].map((id) => (
          <Card key={id} className="p-4 border rounded-lg shadow-lg">
            <img src={`https://via.placeholder.com/200`} alt={`Product ${id}`} className="w-full h-40 object-cover" />
            <CardContent>
              <h3 className="text-lg font-semibold">Product {id}</h3>
              <p className="text-sm">A high-quality product you will love.</p>
              <Label>Size</Label>
              <Select>
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
              </Select>
              <Label>Color</Label>
              <Select>
                <option>Red</option>
                <option>Blue</option>
                <option>Green</option>
              </Select>
              <Button className="mt-2" onClick={() => addToCart({ id, name: `Product ${id}` })}>Add to Cart</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const CartPage = ({ cart, setCart }) => {
  const updateQuantity = (index, quantity) => {
    const newCart = [...cart];
    if (quantity <= 0) {
      newCart.splice(index, 1);
    } else {
      newCart[index].quantity = quantity;
    }
    setCart(newCart);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index} className="flex justify-between items-center border-b p-2">
              <span>{item.name}</span>
              <div>
                <Button onClick={() => updateQuantity(index, item.quantity - 1)}>-</Button>
                <span className="mx-2">{item.quantity}</span>
                <Button onClick={() => updateQuantity(index, item.quantity + 1)}>+</Button>
                <Button onClick={() => updateQuantity(index, 0)} className="ml-2">Remove</Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const App = () => {
  const [cart, setCart] = useState([]);
  
  return (
    <Router>
      <nav className="p-4 bg-gray-200 flex justify-around">
        <Link to="/" className="font-semibold">Products</Link>
        <Link to="/cart" className="font-semibold">Cart</Link>
      </nav>
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
      </Routes>
    </Router>
  );
};

export default App;
