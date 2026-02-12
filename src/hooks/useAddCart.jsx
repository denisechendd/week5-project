import axios from "axios";

export const useAddCart = () => {
  const url = import.meta.env.VITE_URL;
  const path = import.meta.env.VITE_PATH;
  const addToCart = async (id, qty = 1) => {
    try {
      const data = {
        data: {
          product_id: id,
          qty,
        },
      };

      await axios.post(`${url}/api/${path}/cart`, data);

      alert("已加入購物車");
    } catch (err) {
      console.error("加入購物車失敗: ", err);
      alert("加入購物車失敗，請稍後再試");
    }
  };

  return { addToCart };
};