import React from "react";
import "./Base.css";
import { useEffect, useState } from "react";
import { orders_url, products_url } from "../Assets/APIEndpoints";
import axios from "axios";

const Product = () => {
  const [count, setCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    Expired: false,
    "Low Stock": false,
  });

  useEffect(() => {
    axios.get(products_url).then((response) => {
      setProducts(response.data);
      setFilteredProducts(response.data);
      setCount(response.data.length);
    });
  }, []);

  useEffect(() => {
    handleRowCreation();
  }, [filters]);

  const checkExpiry = (data) => {
    var exp = new Date(data.expiryDate);
    exp = exp.getTime();
    var currentDate = new Date();
    currentDate = currentDate.getTime();
    if (exp < currentDate) {
      return true;
    } else {
      return false;
    }
  };

  const checkLowStock = (data) => (data.stock < 100 ? true : false);

  const handleFilters = (e) => {
    var _filters = { ...filters };
    _filters[e.target.value] = e.target.checked;
    setFilters(_filters);
  };
  const handleRowCreation = () => {
    if (!filters["Expired"] && !filters["Low Stock"]) {
      setFilteredProducts(products);
      setCount(products.length);
      return;
    }
    let _products = [];
    if (filters["Expired"]) {
      _products = [
        ..._products,
        ...products.filter((item) => checkExpiry(item)),
      ];
    }
    if (filters["Low Stock"]) {
      _products = [
        ..._products,
        ...products.filter((item) => checkLowStock(item)),
      ];
    }
    setFilteredProducts(_products);
    setCount(_products.length);
  };

  return (
    <>
      <main>
        <div className="Products-section " className="page-wrapper">
          <h1>Products</h1>
          <div className="product-wrapper">
            <div className="filters-section">
              <h3>Filters</h3>
              <div className="filters-wrapper">
                <p>
                  Count: <span className="count">{count}</span>
                </p>
                <label className="filter-checkbox">
                  <input
                    type="checkbox"
                    name="products-expired"
                    value="Expired"
                    onChange={handleFilters}
                    checked={filters["Expired"]}
                  />
                  Expired
                </label>
                <label className="filter-checkbox">
                  <input
                    type="checkbox"
                    name="products-lowstock"
                    value="Low Stock"
                    onChange={handleFilters}
                    checked={filters["Low Stock"]}
                  />
                  Low Stock
                </label>
              </div>
            </div>
            <div className="order-list">
              <table className="order-table">
                <tbody>
                  <tr>
                    <th>ID</th>
                    <th>Product Name</th>
                    <th>Product Brand</th>
                    <th>Expiry Date</th>
                    <th>Unit Price</th>
                    <th>Stock</th>
                  </tr>
                  {filteredProducts.map((item, idx) => (
                    <TableRow key={idx} product={item} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Product;

const TableRow = ({ product }) => {
  const { expiryDate, id, medicineBrand, medicineName, stock, unitPrice } =
    product;
  const arr = expiryDate.split("-");
  const dateStr = arr[0] + " " + arr[1] + ", " + arr[2];
  return (
    <tr className="row">
      <td className="cell-secondary">{id}</td>
      <td className="cell-primary">{medicineName}</td>
      <td className="cell-secondary">{medicineBrand}</td>
      <td className="cell-primary">{dateStr}</td>
      <td className="cell-secondary">{`$${unitPrice}`}</td>
      <td className="cell-secondary">{stock}</td>
    </tr>
  );
};
