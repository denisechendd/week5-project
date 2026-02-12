import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const url = import.meta.env.VITE_URL;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}/admin/signin`, formData);
      const { token, expired } = res.data;
      document.cookie = `hexToken=${token}; expires=${new Date(expired)}; path=/`;

      alert("登入成功");
      navigate("/admin"); // 登入成功跳轉至後台
    } catch (err) {
      alert("登入失敗");
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="container login-page">
        {/* 你的登入表單 UI */}
        <form onSubmit={handleSubmit}>
           <input id="username" type="email" onChange={handleInputChange} />
           <input id="password" type="password" onChange={handleInputChange} />
           <button type="submit">登入</button>
        </form>
    </div>
  );
}

export default LoginPage;