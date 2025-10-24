import React from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <h2>Chi tiết sản phẩm: {productId}</h2>
      <p>Hiển thị thông tin sản phẩm cho ID {productId}</p>
      <button onClick={() => navigate("/san-pham")}>Quay lại trang sản phẩm</button>
    </div>
  );
}
