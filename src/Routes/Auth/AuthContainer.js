import React, { useEffect, useState } from "react";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "@apollo/client";
import { LOG_IN, CREATE_ACCOUNT } from "./AuthQueries";
import { toast } from "react-toastify";
import { logUserIn } from "../../utils";
import { useCookies } from "react-cookie";

const AuthContainer = () => {
  const [action, setAction] = useState("logIn");
  const [address, setAddress] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [cookies, setCookie, removeCookie] = useCookies([
    "auto_fill_flag",
    "auto_fill_username",
    "auto_fill_password",
  ]);

  const username = useInput("");
  const password = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");
  const email = useInput("");
  const addressDetail = useInput("");

  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      email: email.value,
      username: username.value,
      password: password.value,
      firstName: firstName.value,
      lastName: lastName.value,
      birthDay: selectedDate.toISOString(),
      address: address,
      addressDetail: addressDetail.value,
    },
  });

  useEffect(() => {
    if (cookies.auto_fill_flag === "yes") {
      username.setValue(cookies.auto_fill_username);
      password.setValue(cookies.auto_fill_password);
    }
    return () => {};
  }, []);

  const onCheckBoxChange = (e) => {
    if (e.target.checked) {
      setCookie("auto_fill_flag", "yes");
    } else {
      setCookie("auto_fill_flag", "no");
      removeCookie("auto_fill_username");
      removeCookie("auto_fill_password");
    }
  };

  const [logInMutation] = useMutation(LOG_IN, {
    variables: { username: username.value, password: password.value },
  });

  const onDateChange = (e) => {
    setSelectedDate(e);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (action === "logIn") {
      if (username.value !== "" && password.value !== "") {
        try {
          const {
            data: { login: token },
          } = await logInMutation();

          if (token !== "" && token !== undefined) {
            if (cookies.auto_fill_flag === "yes") {
              setCookie("auto_fill_username", username.value);
              setCookie("auto_fill_password", password.value);
            }
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
      selectedDate={selectedDate}
      action={action}
      username={username}
      password={password}
      firstName={firstName}
      lastName={lastName}
      email={email}
      addressDetail={addressDetail}
      onSubmit={onSubmit}
      onDateChange={onDateChange}
      onCheckBoxChange={onCheckBoxChange}
      cookies={cookies}
    />
  );
};

export default AuthContainer;
