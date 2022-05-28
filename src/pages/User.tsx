import UserTemplate from "../components/template/User";
import { useAuthContext } from "../hooks/useContextClient";
import { Sidebar, OnlineUsers, Header, Footer } from "../components/layout";
import { Redirect } from "react-router-dom";

const User: React.VFC = () => {
  const { user } = useAuthContext();

  return user ? (
    <>
      <Sidebar />
      <div className="container">
        <Header />
        <UserTemplate />
        <Footer />
      </div>
      <OnlineUsers />
    </>
  ) : (
    <Redirect to="/login" />
  );
};

export default User;
