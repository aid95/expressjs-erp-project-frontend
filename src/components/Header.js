import React from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import ProfileImage from "./ProfileImage";
import Input from "./Input";
import { Cat } from "./Icons";
import { useQuery } from "@apollo/client";
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

const Form = styled.form`
  width: 100%;
`;

const EUsername = styled.span`
  font-size: 12px;
  font-weight: 600;
  padding: 0px 10px;
`;

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
                src="https://www.w3schools.com/howto/img_avatar2.png"
                alt="profile image"
              />
              <EUsername>{data.me.username}님 환영합니다.</EUsername>
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
