import Head from "next/head";
import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { API_URL } from "../utils/urls";

//custom hook for servicing orders
const useOrders = (user, getToken) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          setLoading(true);
          const token = await getToken();
          const order_res = await fetch(`${API_URL}/orders`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await order_res.json();
          setOrders(data);
        } catch (error) {
          setOrders([]);
        }
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  return { orders, loading };
};

const Account = () => {
  const { user, logoutUser, getToken } = useContext(AuthContext);
  const { orders, loading } = useOrders(user, getToken);

  if (!user) {
    return (
      <div>
        <p>Please login or register</p>
        <Link href="/login">
          <a>Login</a>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Account page</title>
        <meta name="description" content="the account page, check you order" />
      </Head>
      <h2>Account page</h2>
      <h3>Your Orders:</h3>
      {loading && <p style={{ color: "red" }}>Loading your orders...</p>}
      {orders.map((order) => (
        <div key={order.id} style={{ width: "100%", height: "100%" }}>
          {new Date(order.created_at).toLocaleDateString("en-EN")}{" "}
          {order.product.name} ${order.total} {order.status}
        </div>
      ))}
      <hr />
      <p>Logged in as: {user.email}</p>
      <Link href="/">
        <a onClick={logoutUser}>Logout</a>
      </Link>
    </div>
  );
};

export default Account;
