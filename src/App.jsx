import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({
    customerName: "",
    product: "",
    quantity: "",
    price: ""
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    fetch("https://order-management-system-production-301d.up.railway.app/api/orders")
      .then(res => res.json())
      .then(data => setOrders(data));
  };

  // const createOrder = () => {
  //   fetch("https://order-management-system-production-301d.up.railway.app/api/orders", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(form)
  //   })
  //     .then(res => res.json())
  //     .then(() => {
  //       setTimeout(() => fetchOrders(), 500);
  //       setForm({ customerName: "", product: "", quantity: "", price: "" });
  //     });
  // };
  const createOrder = () => {
  fetch("https://order-management-system-production-301d.up.railway.app/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form)
  })
    .then(res => res.json())
    .then((newOrder) => {
      // Add new order directly to state immediately!
      setOrders(prev => [...prev, newOrder]);
      setForm({ customerName: "", product: "", quantity: "", price: "" });
    });
};

  const deleteOrder = (id) => {
    fetch(`https://order-management-system-production-301d.up.railway.app/api/orders/${id}`, {
      method: "DELETE"
    })
      .then(() => fetchOrders());
  };

  const updateStatus = (id, status) => {
    fetch(`https://order-management-system-production-301d.up.railway.app/api/orders/${id}/status?status=${status}`, {
      method: "PUT"
    })
      .then(res => res.json())
      .then(() => fetchOrders());
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <h1>🛒 Order Management System</h1>
        <p className="subtitle">Manage your orders efficiently</p>
      </div>

      {/* Create Order Form */}
      <div className="form-section">
        <h2>Create New Order</h2>
        <div className="form-inputs">
          <input
            placeholder="Customer Name"
            value={form.customerName}
            onChange={e => setForm({ ...form, customerName: e.target.value })}
          />
          <input
            placeholder="Product"
            value={form.product}
            onChange={e => setForm({ ...form, product: e.target.value })}
          />
          <input
            placeholder="Quantity"
            type="number"
            value={form.quantity}
            onChange={e => setForm({ ...form, quantity: e.target.value })}
          />
          <input
            placeholder="Price"
            type="number"
            value={form.price}
            onChange={e => setForm({ ...form, price: e.target.value })}
          />
          <button className="create-btn" onClick={createOrder}>
            + Create Order
          </button>
        </div>
      </div>

      {/* Orders List */}
      <h2>All Orders ({orders.length})</h2>
      {orders.length === 0 ? (
        <p className="no-orders">No orders yet. Create one above!</p>
      ) : (
        orders.map(order => (
          <div key={order.id} className="order-card">
            <div className="order-info">
              <h3>Order #{order.id}</h3>
              <p>👤 Customer: <strong>{order.customerName}</strong></p>
              <p>📦 Product: <strong>{order.product}</strong></p>
              <p>🔢 Quantity: <strong>{order.quantity}</strong></p>
              <p>💰 Price: <strong>₹{order.price}</strong></p>
              <p>📌 Status:
                <span className={`status ${order.status?.toLowerCase()}`}>
                  {order.status}
                </span>
              </p>
            </div>
            <div className="order-actions">
              <button className="confirm-btn"
                onClick={() => updateStatus(order.id, "CONFIRMED")}>
                ✅ Confirm
              </button>
              <button className="cancel-btn"
                onClick={() => updateStatus(order.id, "CANCELLED")}>
                ❌ Cancel
              </button>
              <button className="delete-btn"
                onClick={() => deleteOrder(order.id)}>
                🗑️ Delete
              </button>
            </div>
          </div>
        ))
      )}

      {/* Footer */}
      <div className="footer">
        <p>Built with ❤️ by <strong>Aniket</strong></p>
        <p className="footer-tech">
          React.js • Spring Boot • MySQL • Apache Kafka
        </p>
        <div className="footer-links">
          <a href="https://github.com/Aniketkmwt4" target="_blank">
            GitHub
          </a>
          <span>•</span>
          <a href="https://github.com/Aniketkmwt4/order-management-system" target="_blank">
            Backend Repo
          </a>
          <span>•</span>
          <a href="https://github.com/Aniketkmwt4/order-management-frontend" target="_blank">
            Frontend Repo
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;