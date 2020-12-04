import React, { useMemo } from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import ProfileImage from "./ProfileImage";
import Input from "./Input";
import { Cat } from "./Icons";
import { gql, useQuery, useSubscription } from "@apollo/client";
import { ME } from "../SharedQueries";
import useInput from "../Hooks/useInput";
import { toast } from "react-toastify";
import { logUserOut } from "../utils";

const Container = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 0px;
  width: 100%;
  margin-bottom: 20px;
  border-bottom: ${(props) => props.theme.boxBorder};
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  max-width: ${(props) => props.theme.contentMaxWidth};
`;

const HeaderColumn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33%;
  text-align: center;
`;

const SearchInput = styled(Input)`
  background-color: white;
  padding: 5px;
  font-size: 14px;
  border-radius: 3px;
  height: auto;
  text-align: center;
  width: 70%;
  &::placeholder {
    opacity: 0.8;
    font-weight: 200;
  }
`;

const LogOutLink = styled.span`
  color: ${(props) => props.theme.blueColor};
  cursor: pointer;
  font-size: 12px;
`;

const Form = styled.form`
  width: 100%;
`;

const EUsername = styled.span`
  font-size: 12px;
  font-weight: 400;
  padding: 0px 10px;
`;

const NEW_MAIL_SUBSCRIPTION = gql`
  subscription notifyNewMail($id: String!) {
    notifyNewMail(id: $id) {
      id
      subject
    }
  }
`;

const NewMailNotify = ({ userId }) => {
  const { loading, data } = useSubscription(NEW_MAIL_SUBSCRIPTION, {
    variables: {
      id: userId,
    },
    fetchPolicy: "network-only",
  });
  const alert = () => {
    if (!loading) {
      toast.success(`새 메일 도착이 도착하였습니다.`);
    }
  };
  useMemo(() => alert(), [data, loading]);
  return <></>;
};

const Header = ({ history }) => {
  const search = useInput("");
  const { loading, data } = useQuery(ME);
  const onSearchSubmit = (e) => {
    e.preventDefault();
    history.push(`/search?term=${search.value}`);
  };

  return (
    <Container>
      <Wrapper>
        <HeaderColumn>
          <Link to="/">
            <Cat />
          </Link>
        </HeaderColumn>
        {!loading && data && data.me ? (
          <>
            <HeaderColumn>
              <Form onSubmit={onSearchSubmit}>
                <SearchInput
                  value={search.value}
                  onChange={search.onChange}
                  placeholder="Search"
                />
              </Form>
            </HeaderColumn>
            <HeaderColumn>
              <ProfileImage
                src="https://i.pinimg.com/originals/a0/c8/9f/a0c89f5a39bf5d5861d6624406d2e20f.jpg"
                alt="profile image"
              />
              <EUsername>{data.me.username}님 환영합니다.</EUsername>
              <LogOutLink onClick={logUserOut}>로그아웃</LogOutLink>
              <NewMailNotify userId={data.me.id} />
            </HeaderColumn>
          </>
        ) : (
          <></>
        )}
      </Wrapper>
    </Container>
  );
};

export default withRouter(Header);
