import { useState, useEffect } from "react";

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

  const createOrder = () => {
    fetch("https://order-management-system-production-301d.up.railway.app/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(() => {
        setTimeout(() => fetchOrders(),500);
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
    <div>
      <h1>Order Management System</h1>

      {/* Create Order Form */}
      <h2>Create New Order</h2>
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
        value={form.quantity}
        onChange={e => setForm({ ...form, quantity: e.target.value })}
      />
      <input
        placeholder="Price"
        value={form.price}
        onChange={e => setForm({ ...form, price: e.target.value })}
      />
      <button onClick={createOrder}>Create Order</button>

      {/* Orders List */}
      <h2>All Orders</h2>
      {orders.map(order => (
  <div key={order.id}>
    <h3>Order #{order.id}</h3>
    <p>Customer: {order.customerName}</p>
    <p>Product: {order.product}</p>
    <p>Quantity: {order.quantity}</p>
    <p>Price: ₹{order.price}</p>
    <p>Status: {order.status}</p>
    {/* Add this button */}
    <button onClick={() => deleteOrder(order.id)}>
      Delete Order
    </button>
    <button onClick={() => updateStatus(order.id, "CONFIRMED")}>
  Confirm
</button>
<button onClick={() => updateStatus(order.id, "CANCELLED")}>
  Cancel
</button>
  </div>
))}
    </div>
  );
}

export default App;