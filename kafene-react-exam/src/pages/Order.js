import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { orders_url } from "../Assets/APIEndpoints";
import { useState } from "react";
import "./Base.css";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [count, setCount] = useState(0);
  const [filters, setFilters] = useState({
    New: true,
    Packed: true,
    InTransit: true,
    Delivered: true,
  });
  useEffect(() => {
    axios.get(orders_url).then((response) => {
      setOrders(response.data);
      setFilteredOrders(response.data);
      setCount(response.data.length);
    });
  }, []);

  useEffect(() => {
    FilterOrders();
  }, [filters]);
  const handleFilters = (e) => {
    var _filters = { ...filters };
    _filters[e.target.value] = e.target.checked;
    setFilters(_filters);
  };

  const FilterOrders = () => {
    const FilteredOrders = orders.filter((item) => filters[item.orderStatus]);
    setFilteredOrders(FilteredOrders);
    setCount(FilteredOrders.length);
  };
  return (
    <>
      <main>
        <div className="orders-section page-wrapper">
          <h1>Orders</h1>
          <div className="order-wrapper content-wrapper">
            <div className="filters-section">
              <h3>Filters</h3>
              <div className="filters-wrapper">
                <p>
                  Count: <span className="count">{count}</span>
                </p>
                <label className="filter-checkbox">
                  <input
                    type="checkbox"
                    name="orders-new"
                    onChange={handleFilters}
                    value="New"
                    checked={filters["New"]}
                  />
                  New
                </label>
                <label className="filter-checkbox">
                  <input
                    type="checkbox"
                    name="orders-packed"
                    onChange={handleFilters}
                    value="Packed"
                    checked={filters["Packed"]}
                  />
                  Packed
                </label>
                <label className="filter-checkbox">
                  <input
                    type="checkbox"
                    name="orders-transit"
                    onChange={handleFilters}
                    value="InTransit"
                    checked={filters["InTransit"]}
                  />
                  InTransit
                </label>
                <label className="filter-checkbox">
                  <input
                    type="checkbox"
                    name="orders-delivered"
                    onChange={handleFilters}
                    value="Delivered"
                    checked={filters["Delivered"]}
                  />
                  Delivered
                </label>
              </div>
            </div>
            <div className="order-list">
              <table className="order-table">
                <tbody>
                  <tr>
                    <th>ID</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>

                  {filteredOrders.map((item, idx) => {
                    return <TableRow key={idx} order={item} />;
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Order;

const TableRow = ({ order }) => {
  const { amount, customerName, id, orderDate, orderStatus, orderTime } = order;
  const arr = orderDate.split("-");
  const dateStr = arr[0] + " " + arr[1] + ", " + arr[2];
  return (
    <tr className="row">
      <td>{id}</td>
      <td className="cell-primary">{customerName}</td>
      <td className="cell-primary">
        {dateStr}
        <br />
        <span className="cell-secondary">{orderTime}</span>
      </td>
      <td className="cell-secondary">{`$${amount}`}</td>
      <td className="cell-primary">{orderStatus}</td>
    </tr>
  );
};
