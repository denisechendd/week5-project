import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as bootstrap from "bootstrap";
import BootstrapModal from "../components/BootstrapModal";
import Pagination from "../components/Pagination";

function AdminProducts() {
  const url = import.meta.env.VITE_URL;
  const path = import.meta.env.VITE_PATH;
  const navigate = useNavigate();

  const [isAuth, setIsAuth] = useState(false);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // ... (保留原本 App.jsx 的所有 state 如 templateProduct, pagination 等)

  const checkAdminLogin = useCallback(async () => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("hexToken="))
        ?.split("=")[1];

      if (!token) {
        navigate("/login");
        return;
      }

      axios.defaults.headers.common["Authorization"] = token;
      const res = await axios.post(`${url}/api/user/check`);

      if (res.data.success) {
        setIsAuth(true);
        getProducts();
      }
    } catch (err) {
      navigate("/login");
    } finally {
      setIsLoading(false);
    }
  }, [navigate, url]);

  useEffect(() => {
    checkAdminLogin();
  }, [checkAdminLogin]);

  // ... (保留原本 App.jsx 的 getProducts, handleModalConfirm, openModal 等函式)

  if (isLoading) return <p className="text-center mt-5">驗證身份中...</p>;

  return (
    <div className="container">
       {/* 這裡放原本 App.jsx 裡 return (isAuth ? (...) : ...) 的內容 */}
       {/* 只保留表格與 Modal 部分 */}
       <div className="text-end mt-4">
          <button className="btn btn-primary" onClick={() => openModal("create")}>建立新的產品</button>
       </div>
       <table className="table mt-4">
         {/* ... 表格內容 ... */}
       </table>
       <Pagination pagination={pagination} onPageChange={onPageChange} />
       <BootstrapModal
         ref={productModalRef}
         // ... 傳入原本的 props ...
       />
    </div>
  );
}

export default AdminProducts;