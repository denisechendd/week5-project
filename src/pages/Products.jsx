import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddCart } from "../hooks/useAddCart";

const Products = () => {
  const url = import.meta.env.VITE_URL;
  const path = import.meta.env.VITE_PATH;
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const { addToCart } = useAddCart();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(`${url}/api/${path}/products`);

        setProducts(res.data.products);
      } catch (err) {
        console.err("產品取得失敗: ", err);
        alert("產品取得失敗，請稍後再試");
      }
    };

    getProducts();
  }, [url, path]);
  return (
    <div className="container mt-4">
      <div className="row g-4">
        {products.map((product) => {
          return (
            <div key={product.id} className="col-lg-4 col-md-6 col-sm-12">
              <div className="card">
                <img
                  className="card-img-top"
                  style={{ height: "300px", objectFit: "cover" }}
                  src={product.imageUrl}
                  alt={product.title}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    <strong>{product.title}</strong>
                  </h5>
                  <p
                    className="card-text"
                    style={{
                      whiteSpace: "nowrap", //不換行
                      overflow: "hidden", //超出部分隱藏
                      textOverflow: "ellipsis", //多餘文字顯示...
                    }}
                  >
                    {product.description}
                  </p>
                  <p className="card-text">
                    <strong>售價:</strong>{" "}
                    <del className="text-muted">{product.origin_price}</del>{" "}
                    <strong>{product.price} 元</strong>
                  </p>
                  <div className="d-flex  justify-content-center gap-3">
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => {
                        navigate(`/products/${product.id}`);
                      }}
                    >
                      查看商品
                    </button>
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => {
                        addToCart(product.id);
                      }}
                    >
                      加入購物車
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;