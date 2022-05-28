import LoginTemplate from "../components/template/Login";
import { useAuthContext } from "../hooks/useContextClient";
import { Redirect } from "react-router-dom";
import styled from "@emotion/styled";

const Container = styled("div")`
  width: calc(100% - 650px);
  flex-grow: 1;
  @media (min-width: 576px) {
    display: block;
  }
`;

const Login: React.VFC = () => {
  const { user } = useAuthContext();

  return user ? (
    <Redirect to="/" />
  ) : (
    <Container>
      <LoginTemplate />
    </Container>
  );
};

export default Login;