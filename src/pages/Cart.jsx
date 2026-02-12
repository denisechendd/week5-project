import axios from "axios";
import { useCallback, useEffect, useState } from "react";

import CartQtyControl from "../components/CartQtyControl";

const Cart = () => {
  const url = import.meta.env.VITE_URL;
  const path = import.meta.env.VITE_PATH;

  const [isLoading, setIsLoading] = useState(true);

  //先給初始值，防止得到資料前讀不到carts
  const [cart, setCart] = useState({
    carts: [],
    final_total: 0,
    total: 0,
  });

  const getCart = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${url}/api/${path}/cart`);
      setCart(res.data.data);
    } catch (err) {
      console.error("購物車列表取得失敗: ", err?.response?.data);
    } finally {
      setIsLoading(false);
    }
  }, [url, path]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      getCart();
    }, 0);

    return () => {
      clearTimeout(timeout);
    };
  }, [getCart]);

  const deleteCartItem = async (id) => {
    try {
      await axios.delete(`${url}/api/${path}/cart/${id}`);

      getCart();
    } catch (err) {
      console.error("購物車項目刪除失敗: ", err?.response?.data);
    }
  };

  const deleteCart = async () => {
    if (cart.carts.length === 0) return;
    try {
      await axios.delete(`${url}/api/${path}/carts`);

      getCart();
    } catch (err) {
      console.error("購物車清除失敗: ", err?.response?.data);
    }
  };

  const updateCartItemQty = async (item, newQty) => {
    if (newQty < 1) return;
    try {
      const data = {
        product_id: item.product.id,
        qty: newQty,
      };

      await axios.put(`${url}/api/${path}/cart/${item.id}`, {
        data,
      });

      getCart();
    } catch (err) {
      console.error("更新數量失敗: ", err?.response?.data);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status" />
        <p className="mt-2">購物車載入中...</p>
      </div>
    );
  }
  return (
    <>
      <div className="container mt-4">
        <div className="text-center">
          <h1>購物車</h1>
        </div>
        <div className="mt-4 text-end">
          <button
            type="button"
            className="btn btn-danger"
            onClick={deleteCart}
            disabled={cart.carts.length === 0}
          >
            清空購物車
          </button>
        </div>
        <table className="table mt-3">
          <thead>
            <tr>
              <th></th>
              <th>品名</th>
              <th>數量</th>
              <th>小計</th>
            </tr>
          </thead>
          <tbody>
            {cart.carts.length > 0 ? (
              cart.carts.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>
                      <button
                        type="button"
                        className="btn btn-outline-danger d-inline-flex align-items-center gap-2"
                        onClick={() => {
                          deleteCartItem(item.id);
                        }}
                      >
                        刪除
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                    <td>{item.product.title}</td>
                    <td>
                      <CartQtyControl
                        qty={item.qty}
                        onIncrease={() => {
                          updateCartItemQty(item, item.qty + 1);
                        }}
                        onDecrease={() => {
                          updateCartItemQty(item, item.qty - 1);
                        }}
                      />
                    </td>
                    <td>
                      <span>{item.total} </span>
                      <span> 元</span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4}>
                  <h4 className="text-center text-muted">
                    購物車尚未有任何商品
                  </h4>
                </td>
              </tr>
            )}
          </tbody>
          {cart.carts.length > 0 && (
            <tfoot>
              <tr>
                <td colSpan={3} className="text-end">
                  <span className="m-5">總計:</span>
                </td>
                <td>
                  <span>{cart.final_total} </span>
                  <span> 元</span>
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </>
  );
};

export default Cart;