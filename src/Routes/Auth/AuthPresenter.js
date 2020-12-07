import React from "react";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import { JusoSearchInput } from "../../Components/SearchInput";
import MomentUtils from "@date-io/moment";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { Checkbox, FormControlLabel, withStyles } from "@material-ui/core";
import { green } from "@material-ui/core/colors";

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

const W100KeyboardDatePicker = styled(KeyboardDatePicker)`
  width: 100%;
`;

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const AuthPresenter = ({
  action,
  username,
  password,
  firstName,
  lastName,
  email,
  addressDetail,
  setAction,
  setAddress,
  selectedDate,
  onSubmit,
  onDateChange,
  onCheckBoxChange,
  cookies,
}) => (
  <MuiPickersUtilsProvider utils={MomentUtils}>
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
              <FormControlLabel
                control={
                  <GreenCheckbox
                    checked={cookies.auto_fill_flag === "yes"}
                    onChange={onCheckBoxChange}
                    name="checkedG"
                  />
                }
                label={"계정 정보 저장"}
              />
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
              <W100KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="🎉 생년월일"
                format="MM/dd/yyyy"
                value={selectedDate}
                onChange={onDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
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
  </MuiPickersUtilsProvider>
);

export default AuthPresenter;
