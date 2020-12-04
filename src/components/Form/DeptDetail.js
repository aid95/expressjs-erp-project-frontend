import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  EDIT_DEPT,
  SEE_DEPARTMENT,
  SEE_DEPT_USERS,
} from "../../Routes/Profile/ProfileQueries";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import useInput from "../../Hooks/useInput";
import { Modal } from "react-bootstrap";
import Input from "../Input";
import Button from "@material-ui/core/Button";
import { DeptUserSearchInput } from "../SearchInput";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const DeptDetailWrapper = styled.div`
  margin: 30px 0 70px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Menu = styled.ul`
  display: flex;
`;

const MenuItem = styled.li`
  cursor: pointer;
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const DeptTitle = styled.h4`
  font-size: 30px;
  padding: 20px 90px;
  border-radius: 30px;
  border: 1px solid #77777754;
  margin-bottom: 10px;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ModalInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px 0;
`;

const UsersDetailWrapper = styled.div``;

const EditDeptModal = (props) => {
  const subject = useInput("");
  const [user, setUser] = useState("");

  const dept = useQuery(SEE_DEPARTMENT, {
    variables: {
      id: props.id,
      fetchPolicy: "network-only",
    },
  });

  const [editDeptMutation] = useMutation(EDIT_DEPT);

  const cancelClick = (e) => {
    subject.setValue("");
    props.onHide();
  };

  const completeClick = async (e) => {
    let variables = { id: props.id, action: "EDIT" };
    if (subject.value !== "") {
      variables.title = subject.value;
    }
    if (user !== "") {
      variables.leaderUser = user.id;
    }
    await editDeptMutation({
      variables,
    });
    cancelClick();
  };

  return (
    <>
      {!dept.loading && dept.data.seeDepartment && (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              📤 부서 관리
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ModalContainer>
              <ModalInputWrapper>
                <Input
                  value={""}
                  placeholder={dept.data.seeDepartment.title}
                  {...subject}
                />
              </ModalInputWrapper>
              <ModalInputWrapper>
                <DeptUserSearchInput
                  deptId={dept.data.seeDepartment.id}
                  placeHolder={
                    dept.data.seeDepartment.leaderUser !== null
                      ? `${dept.data.seeDepartment.leaderUser.fullName} @${dept.data.seeDepartment.leaderUser.username}`
                      : ""
                  }
                  setUser={setUser}
                />
              </ModalInputWrapper>
            </ModalContainer>
          </Modal.Body>
          <Modal.Footer>
            <Button color={"secondary"} onClick={cancelClick}>
              취소
            </Button>
            <Button color={"primary"} onClick={completeClick}>
              저장
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

const DeptDetail = ({ id }) => {
  const classes = useStyles();

  const [replyMailModalShow, setReplyMailModalShow] = useState(false);
  const [deleteDeptMutation] = useMutation(EDIT_DEPT, {
    variables: {
      id,
      action: "DELETE",
    },
  });

  const dept = useQuery(SEE_DEPARTMENT, {
    variables: {
      id,
    },
    fetchPolicy: "network-only",
  });

  const users = useQuery(SEE_DEPT_USERS, {
    variables: {
      id,
    },
    fetchPolicy: "network-only",
  });

  return (
    <>
      {!dept.loading &&
        !users.loading &&
        dept.data.seeDepartment &&
        users.data.deptUsers && (
          <Container>
            <DeptDetailWrapper>
              <DeptTitle>{dept.data.seeDepartment.title}</DeptTitle>
              <Menu>
                <MenuItem onClick={() => setReplyMailModalShow(true)}>
                  수정
                </MenuItem>
                <MenuItem onClick={async () => await deleteDeptMutation()}>
                  삭제
                </MenuItem>
              </Menu>
            </DeptDetailWrapper>
            <UsersDetailWrapper>
              <List dense className={classes.root}>
                {users.data.deptUsers.map((user, index) => {
                  const labelId = `checkbox-list-secondary-label-${index}`;
                  return (
                    <ListItem key={user.id} button>
                      <ListItemAvatar>
                        <Avatar
                          alt={`Avatar n°${index + 1}`}
                          src={`https://i.pinimg.com/originals/a0/c8/9f/a0c89f5a39bf5d5861d6624406d2e20f.jpg`}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        id={labelId}
                        primary={`${user.fullName} @${user.username} ${
                          user.id === dept.data.seeDepartment.leaderUser.id
                            ? "👑"
                            : ""
                        }`}
                      />
                    </ListItem>
                  );
                })}
              </List>
            </UsersDetailWrapper>
            <EditDeptModal
              id={dept.data.seeDepartment.id}
              show={replyMailModalShow}
              onHide={() => {
                setReplyMailModalShow(false);
              }}
            />
          </Container>
        )}
    </>
  );
};

export default DeptDetail;
