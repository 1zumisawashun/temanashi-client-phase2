import LoginTemplate from "../components/template/Login";
import { useAuthContext } from "../hooks/useContextClient";
import { Redirect } from "react-router-dom";
import styled from "@emotion/styled";
import { Head } from "../components/layout";

const Container = styled("div")`
  flex-grow: 1;
  width: calc(100% - 650px);
  @media (min-width: 576px) {
    display: block;
  }
`;

export const Login: React.VFC = () => {
  const { user } = useAuthContext();
  console.log(user, "login user");
  // NOTE:リロードするとユーザ取得が遅れてログイン画面に飛ばされる＞ログインユーザだからトップページに繊維する
  return user ? (
    <Redirect to="/" />
  ) : (
    <>
      <Head title="Login.tsx" />
      <Container>
        <LoginTemplate />
      </Container>
    </>
  );
};
