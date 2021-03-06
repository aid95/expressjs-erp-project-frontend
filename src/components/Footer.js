import React from "react";
import styled from "styled-components";

const Container = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 12px;
  margin: 50px 0px;
`;

const List = styled.ul`
  display: flex;
`;

const ListItem = styled.li`
  &:not(:last-child) {
    margin-right: 16px;
  }
`;

const Link = styled.a`
  color: ${(props) => props.theme.blackColor};
  font-weight: 200;
`;

const Copyright = styled.span`
  color: ${(props) => props.theme.darkGreyColor};
  font-weight: 200;
`;

function Footer() {
  return (
    <Container>
      <List>
        <ListItem>
          <Link href="http://www.kmu.ac.kr">계명대학교</Link>
        </ListItem>
      </List>
      <Copyright>
        ENTERPRISE ERP PROJECT {new Date().getFullYear()} &copy;
      </Copyright>
    </Container>
  );
}

export default Footer;
