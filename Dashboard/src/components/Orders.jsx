import { useState, useEffect } from "react";
import axios from "axios";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    axios
      .get("https://tradeup-backend.onrender.com/allOrders")
      .then((res) => {
        console.log(res.data);
        setAllOrders(res.data);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
      });
  }, []);

  if (allOrders.length === 0) {
    return (
      <div className="orders">
        <div className="no-orders">
          <p>You haven't placed any orders today</p>
          <a href="/" className="btn">
            Get started
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="order-table">
      <h3 className="title">Orders ({allOrders.length})</h3>
      <table>
        <thead>
          <tr>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Price</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {allOrders.map((order, index) => (
            <tr key={index}>
              <td>{order.name || "-"}</td>
              <td>{order.qty || "-"}</td>
              <td>{order.price ? order.price.toFixed(2) : "-"}</td>
              <td
                className={
                  order.status?.toLowerCase() === "completed"
                    ? "profit"
                    : "loss"
                }
              >
                {order.status || "-"}
              </td>
              <td>{order.date || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
