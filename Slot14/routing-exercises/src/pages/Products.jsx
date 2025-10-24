import React from "react";
import { Link } from "react-router-dom";

export default function Products() {
  const products = [101, 102, 103];

  return (
    <div>
      <h1>Sản Phẩm</h1>
      <ul>
        {products.map((id) => (
          <li key={id}>
            <Link to={`/san-pham/${id}`}>Sản phẩm {id}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
