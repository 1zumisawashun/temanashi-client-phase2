import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { InputText, BasicButton, LinkButton, TextError } from "../ui";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styled from "@emotion/styled";

const Container = styled("div")`
  background: linear-gradient(to right, #84bcb4, #84bcb4, #84bcb4);
  height: 100vh;
  margin: 0;
  position: relative;
`;
const Inner = styled("div")`
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%) translateX(-50%);
  width: 30%;
`;
const FormContainer = styled("form")`
  backdrop-filter: blur(12px);
  background: rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  border-left: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  border-right: 1px solid rgba(255, 255, 255, 0.3);
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 26px 42px rgba(0, 0, 0, 0.1);
  margin: auto;
  padding: 50px;
`;
const Title = styled("h1")`
  color: white;
  letter-spacing: 2px;
  margin-top: 0;
`;

interface FormData {
  email: string;
  password: string;
}

const Login: React.VFC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login, error, isPending } = useAuth();

  const getSchema = () => {
    return yup.object({
      email: yup.string().email("emailの形式で入力してください。"),
      password: yup.string().required("パスワードを入力してください。"),
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onChange",
    resolver: yupResolver(getSchema()),
  });

  const onPreSubmit: SubmitHandler<FormData> = () => {
    onSubmit();
  };

  const onSubmit = () => {
    login(email, password);
  };

  return (
    <Container>
      <Inner>
        <FormContainer data-cy="login">
          <Title>login</Title>
          <InputText
            size="small"
            register={register("email", {
              onChange: (e) => setEmail(e.target.value),
            })}
            value={email}
            error={"email" in errors}
            helperText={errors.email?.message}
            placeholder="xyz@gmail.com"
            data-cy="email"
          />
          <InputText
            size="small"
            register={register("password", {
              onChange: (e) => setPassword(e.target.value),
            })}
            value={password}
            error={"password" in errors}
            helperText={errors.password?.message}
            placeholder="Must have atleast 6 characters"
            data-cy="password"
          />
          <BasicButton
            isDisabled={isPending}
            data-cy="login"
            size="large"
            variant="secondary"
            fullWidth={true}
            onClick={() => {
              handleSubmit(onPreSubmit)();
            }}
          >
            Login
          </BasicButton>
          <TextError error={error} helperText={error} />
          <LinkButton path="/signup">Move To Sign Up</LinkButton>
        </FormContainer>
      </Inner>
    </Container>
  );
};

export default Login;
