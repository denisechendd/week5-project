import Layout from "../Layout";
import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import NotFound from "../pages/NotFound";
import ProductError from "../pages/ProductError";
import axios from "axios";
import LoginPage from "../pages/LoginPage"; // 修正路徑
import AdminProducts from "../pages/AdminProducts"; // 這是我們要把 App.jsx 邏輯搬過去的地方

const url = import.meta.env.VITE_URL;
const path = import.meta.env.VITE_PATH;

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "products/:id",
        element: <ProductDetail />,
        errorElement: <ProductError />,
        loader: async ({ params }) => {
          const res = await axios.get(
            `${url}/api/${path}/product/${params.id}`,
          );
          if (!res.data.product) {
            throw new Response("Product Not Found", { status: 404 });
          }
          return res.data.product;
        },
      },
      {
        path: "cart",
        element: <Cart />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />, // 獨立的登入頁面
  },
  {
    path: "/admin",
    element: <AdminProducts />, // 搬遷原本 App.jsx 的後台邏輯
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;