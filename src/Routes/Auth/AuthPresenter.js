import React from "react";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import { JusoSearchInput } from "../../Components/SearchInput";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 80vh;
`;

const Box = styled.div`
  ${(props) => props.theme.whiteBox}
  border-radius: 0px;
  width: 100%;
  max-width: 382px;
`;

const StateChanger = styled(Box)`
  text-align: center;
  padding: 20px 0px;
`;

const Link = styled.span`
  color: ${(props) => props.theme.blueColor};
  cursor: pointer;
`;

const Form = styled(Box)`
  padding: 40px;
  padding-bottom: 30px;
  margin-bottom: 15px;
  form {
    width: 100%;
    input {
      width: 100%;
      &:not(:last-child) {
        margin-bottom: 7px;
      }
    }
    button {
      margin-top: 10px;
    }
  }
`;

const AuthPresenter = ({
  action,
  username,
  password,
  firstName,
  lastName,
  email,
  birthDay,
  addressDetail,
  setAction,
  setAddress,
  onSubmit,
}) => (
  <Wrapper>
    <Form>
      {action === "logIn" && (
        <>
          <Helmet>
            <title>Log In | ERP Monitor</title>
          </Helmet>
          <form onSubmit={onSubmit}>
            <Input placeholder={"Username"} {...username} />
            <Input placeholder={"Password"} {...password} type="password" />
            <Button text={"Log in"} />
          </form>
        </>
      )}
      {action === "signUp" && (
        <>
          <Helmet>
            <title>Sign Up | ERP Monitor</title>
          </Helmet>
          <form onSubmit={onSubmit}>
            <Input placeholder={"Email"} {...email} type="email" />
            <Input placeholder={"Username"} {...username} />
            <Input placeholder={"Password"} {...password} type="password" />
            <Input placeholder={"First name"} {...firstName} />
            <Input placeholder={"Last name"} {...lastName} />
            <Input placeholder={"Birth day"} {...birthDay} />
            <JusoSearchInput setAddress={setAddress} />
            <Input placeholder={"address detail"} {...addressDetail} />
            <Button text={"Sign up"} />
          </form>
        </>
      )}
    </Form>

    <StateChanger>
      {action === "logIn" ? (
        <>
          Don't have an account?{" "}
          <Link onClick={() => setAction("signUp")}>Sign up</Link>
        </>
      ) : (
        <>
          Have an account?{" "}
          <Link onClick={() => setAction("logIn")}>Log in</Link>
        </>
      )}
    </StateChanger>
  </Wrapper>
);

export default AuthPresenter;
