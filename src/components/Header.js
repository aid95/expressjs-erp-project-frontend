import React from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import ProfileImage from "./ProfileImage";
import Input from "./Input";
import { Cat } from "./Icons";
import { gql, useMutation, useQuery } from "@apollo/client";
import { ME } from "../SharedQueries";
import useInput from "../Hooks/useInput";

const Container = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 0px;
  width: 100%;
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
  font-weight: 600;
  padding: 0px 10px;
`;

const LOG_OUT = gql`
  mutation logUserOut {
    logUserOut @client
  }
`;

const Header = ({ history }) => {
  const search = useInput("");
  const { loading, data } = useQuery(ME);
  const onSearchSubmit = (e) => {
    e.preventDefault();
    history.push(`/search?term=${search.value}`);
  };
  const [logOut] = useMutation(LOG_OUT);

  return (
    <Container>
      <Wrapper>
        <HeaderColumn>
          <Link to="/">
            <Cat />
          </Link>
        </HeaderColumn>
        {!loading && !!data.me ? (
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
                src="https://scontent-nrt1-1.xx.fbcdn.net/v/t1.0-1/p148x148/104424755_3039633629484044_5461704554360702412_n.jpg?_nc_cat=101&ccb=2&_nc_sid=1eb0c7&_nc_ohc=tnW7u5R3wPMAX--esRG&_nc_ht=scontent-nrt1-1.xx&tp=6&oh=2e2fe9b80e599da46b8299464dd1aa48&oe=5FC7DEF4"
                alt="profile image"
              />
              <EUsername>{data.me.username}님 환영합니다.</EUsername>
              <LogOutLink onClick={logOut}>로그아웃</LogOutLink>
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
