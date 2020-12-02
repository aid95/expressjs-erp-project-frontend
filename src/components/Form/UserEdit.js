import React, { useState } from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import { gql } from "apollo-boost";
import {
  DepartmentSearchInput,
  RankSearchInput,
  JusoSearchInput,
} from "../SearchInput";
import Button from "@material-ui/core/Button";
import useInput from "../../Hooks/useInput";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";

const SEE_USER = gql`
  query user($id: String!) {
    user(id: $id) {
      id
      email
      username
      firstName
      lastName
      address
      addressDetail
      birthDay
      department {
        id
        title
      }
      rank {
        id
        title
      }
      basePay
    }
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const W100KeyboardDatePicker = styled(KeyboardDatePicker)`
  width: 100%;
`;

const Padded = styled.div`
  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

const InlineContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const W100TextField = styled(TextField)`
  width: 100%;
`;

const DeptWrapper = styled.div`
  margin-right: 5px;
`;
const RankWrapper = styled.div`
  margin-left: 5px;
`;

const UpdateButton = styled.div`
  margin-right: 5px;
`;
const DeleteButton = styled.div`
  margin-left: 5px;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "40ch",
    },
  },
}));

const UserEdit = ({ userId }) => {
  const { loading, data } = useQuery(SEE_USER, {
    variables: {
      id: userId,
    },
    fetchPolicy: "network-only",
  });

  const classes = useStyles();

  const [address, setAddress] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const firstName = useInput("");
  const lastName = useInput("");
  const email = useInput("");
  const addressDetail = useInput("");

  const onSubmit = () => {};

  const onDateChange = (e) => {
    setSelectedDate(e);
  };

  return (
    !loading &&
    data.user && (
      <Container>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <FormWrapper>
            <form className={classes.root} onSubmit={onSubmit}>
              <Padded>
                <W100TextField
                  disabled
                  defaultValue={data.user.username}
                  id="standard-basic"
                  label="계정명"
                />
              </Padded>
              <Padded>
                <InlineContainer>
                  <W100TextField
                    defaultValue={data.user.firstName}
                    id="standard-basic"
                    label="이름"
                  />
                  <W100TextField
                    defaultValue={data.user.lastName}
                    id="standard-basic"
                    label="성"
                  />
                </InlineContainer>
              </Padded>
              <Padded>
                <W100TextField
                  defaultValue={data.user.basePay}
                  id="standard-basic"
                  label="연봉"
                />
              </Padded>
              <Padded>
                <InlineContainer>
                  <DeptWrapper>
                    <DepartmentSearchInput
                      placeHolder={data.user.department.title}
                      setDepartment={(e) => console.log(e)}
                    />
                  </DeptWrapper>
                  <RankWrapper>
                    <RankSearchInput
                      placeHolder={data.user.rank.title}
                      setDepartment={(e) => console.log(e)}
                    />
                  </RankWrapper>
                </InlineContainer>
              </Padded>
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
              <Padded>
                <JusoSearchInput
                  placeHolder={data.user.address}
                  setAddress={setAddress}
                />
              </Padded>
              <Padded>
                <W100TextField
                  defaultValue={data.user.addressDetail}
                  id="standard-basic"
                  label="상세주소"
                />
              </Padded>
              <InlineContainer>
                <UpdateButton>
                  <Button variant={"outlined"} color={"primary"}>
                    수정
                  </Button>
                </UpdateButton>
                <DeleteButton>
                  <Button variant={"outlined"} color={"secondary"}>
                    삭제
                  </Button>
                </DeleteButton>
              </InlineContainer>
            </form>
          </FormWrapper>
        </MuiPickersUtilsProvider>
      </Container>
    )
  );
};

export default UserEdit;
