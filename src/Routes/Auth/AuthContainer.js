import React, { useState } from "react";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "@apollo/client";
import { LOG_IN, CREATE_ACCOUNT } from "./AuthQueries";
import { toast } from "react-toastify";
import { logUserIn } from "../../utils";

const AuthContainer = () => {
  const [action, setAction] = useState("logIn");
  const [address, setAddress] = useState("");

  const username = useInput("");
  const password = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");
  const birthDay = useInput("");
  const email = useInput("");
  const addressDetail = useInput("");

  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      email: email.value,
      username: username.value,
      password: password.value,
      firstName: firstName.value,
      lastName: lastName.value,
      birthDay: birthDay.value,
      address: address,
      addressDetail: addressDetail.value,
    },
  });

  const [logInMutation] = useMutation(LOG_IN, {
    variables: { username: username.value, password: password.value },
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (action === "logIn") {
      if (username.value !== "" && password.value !== "") {
        try {
          const {
            data: { login: token },
          } = await logInMutation();

          if (token !== "" && token !== undefined) {
            logUserIn(token);
          } else {
            throw Error();
          }
        } catch (error) {
          toast.error("Incorrect username or password");
        }
      } else {
        toast.error("username or password is required");
      }
    } else if (action === "signUp") {
      if (
        email.value !== "" &&
        username.value !== "" &&
        password.value !== "" &&
        firstName.value !== "" &&
        lastName.value !== "" &&
        birthDay.value !== "" &&
        address !== "" &&
        addressDetail.value !== ""
      ) {
        try {
          const {
            data: { createAccount },
          } = await createAccountMutation();
          if (!createAccount) {
            toast.error("Can't create account");
          } else {
            toast.success("Account created! Log In now");
            setTimeout(() => setAction("logIn"), 3000);
          }
        } catch (e) {
          toast.error(e.message);
        }
      } else {
        toast.error("All field are required");
      }
    }
  };

  return (
    <AuthPresenter
      setAddress={setAddress}
      setAction={setAction}
      action={action}
      username={username}
      password={password}
      firstName={firstName}
      lastName={lastName}
      birthDay={birthDay}
      email={email}
      addressDetail={addressDetail}
      onSubmit={onSubmit}
    />
  );
};

export default AuthContainer;
