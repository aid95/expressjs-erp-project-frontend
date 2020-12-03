import React, { useState } from "react";
import styled from "styled-components";
import { useMutation, useQuery } from "@apollo/client";
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
import { EDIT_USER } from "../../Routes/Profile/ProfileQueries";

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
  const basePay = useInput("");
  const department = useInput("");
  const rank = useInput("");

  const [editUserMutation] = useMutation(EDIT_USER);

  const onEditClick = async () => {
    let variables = {
      id: userId,
      birthDay: selectedDate.toISOString(),
      action: "EDIT",
    };
    if (firstName.value !== "") {
      variables.firstName = firstName.value;
    }
    if (lastName.value !== "") {
      variables.lastName = lastName.value;
    }
    if (email.value !== "") {
      variables.email = email;
    }
    if (addressDetail.value !== "") {
      variables.addressDetail = addressDetail.value;
    }
    if (address !== "") {
      variables.address = address;
    }
    if (basePay.value !== "") {
      variables.basePay = parseInt(basePay.value);
    }
    if (department.value !== "") {
      variables.department = department.value;
    }
    if (rank.value !== "") {
      variables.rank = rank.value;
    }
    console.log(variables);
    await editUserMutation({
      variables,
    });
  };

  const onDeleteClick = async () => {
    await editUserMutation({
      variables: {
        id: userId,
        action: "DELETE",
      },
    });
  };

  const onDateChange = (e) => {
    setSelectedDate(e);
  };

  return (
    !loading &&
    data.user && (
      <Container>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <FormWrapper>
            <form className={classes.root} onSubmit={onEditClick}>
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
                    onChange={(event) => {
                      const {
                        target: { value },
                      } = event;
                      firstName.setValue(value);
                    }}
                    id="standard-basic"
                    label="이름"
                  />
                  <W100TextField
                    defaultValue={data.user.lastName}
                    onChange={(event) => {
                      const {
                        target: { value },
                      } = event;
                      lastName.setValue(value);
                    }}
                    id="standard-basic"
                    label="성"
                  />
                </InlineContainer>
              </Padded>
              <Padded>
                <W100TextField
                  defaultValue={data.user.basePay}
                  onChange={(event) => {
                    const {
                      target: { value },
                    } = event;
                    basePay.setValue(value);
                  }}
                  id="standard-basic"
                  label="연봉"
                />
              </Padded>
              <Padded>
                <InlineContainer>
                  <DeptWrapper>
                    <DepartmentSearchInput
                      placeHolder={data.user.department.title}
                      setDepartment={department.setValue}
                    />
                  </DeptWrapper>
                  <RankWrapper>
                    <RankSearchInput
                      placeHolder={data.user.rank.title}
                      setDepartment={rank.setValue}
                    />
                  </RankWrapper>
                </InlineContainer>
              </Padded>
              <W100KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="🎉 생년월일"
                format="MM/dd/yyyy"
                value={new Date(data.user.birthDay)}
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
                  onChange={(event) => {
                    const {
                      target: { value },
                    } = event;
                    addressDetail.setValue(value);
                  }}
                  id="standard-basic"
                  label="상세주소"
                />
              </Padded>
              <InlineContainer>
                <UpdateButton>
                  <Button
                    onClick={(event) => onEditClick()}
                    variant={"outlined"}
                    color={"primary"}
                  >
                    수정
                  </Button>
                </UpdateButton>
                <DeleteButton>
                  <Button
                    onClick={(event) => onDeleteClick()}
                    variant={"outlined"}
                    color={"secondary"}
                  >
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
