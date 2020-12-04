import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import {
  ContentContainer,
  ContentWrapper,
  ContentDetail,
  ContentLeftHeader,
  ContentLeftList,
  ContentLeftSide,
  ContentTitle,
} from "./ContentStyles";
import {
  ContentList,
  ContentListItemComp,
} from "../../../../Components/ContentList";
import { SEARCH_USER, SEE_USERS } from "../../ProfileQueries";
import UserEdit from "../../../../Components/Form/UserEdit";
import Input from "@material-ui/core/Input";

const POLL_INTERVAL = 2000;

export const HRTabContent = () => {
  const [selectedItemId, setSelectedItemId] = useState("");
  const [selected, setSelected] = useState(false);
  const [users, setUsers] = useState([]);
  const [term, setTerm] = useState("");

  const [queryGetItems, resultGetItems] = useLazyQuery(SEE_USERS, {
    pollInterval: POLL_INTERVAL,
    fetchPolicy: "network-only",
    onCompleted: (d) => {
      setUsers(d.users);
    },
  });

  const [querySearchUser] = useLazyQuery(SEARCH_USER, {
    variables: {
      term: term,
      deptName: term,
      beginDate: term,
    },
    onCompleted: (d) => setUsers(d.searchUser),
  });

  const onUserClick = async (e) => {
    setSelectedItemId(e.target.id);
    setSelected(true);
  };

  const onChangeSearchBar = async (e) => {
    setTerm(e.target.value);
    if (e.target.value !== "") {
      await querySearchUser();
    } else {
      await queryGetItems();
    }
  };

  useEffect(() => {
    if (!resultGetItems.called) {
      queryGetItems();
    }
    return () => {};
  });

  return (
    <ContentContainer>
      <ContentWrapper>
        <ContentLeftSide>
          <ContentLeftHeader>
            <ContentTitle>인사 관리</ContentTitle>
            <Input
              fullWidth
              placeholder="검색하기"
              inputProps={{ "aria-label": "description" }}
              onChange={onChangeSearchBar}
            />
          </ContentLeftHeader>
          <ContentLeftList>
            <ContentList>
              {users.map((user) => (
                <ContentListItemComp
                  emoji={"❤️"}
                  title={user.fullName}
                  subtext={`@${user.username} ${user.department.title} / ${user.rank.title}`}
                  key={user.id}
                  id={user.id}
                  onClick={onUserClick}
                  isSelected={selectedItemId === user.id}
                />
              ))}
            </ContentList>
          </ContentLeftList>
        </ContentLeftSide>
      </ContentWrapper>

      <ContentDetail>
        {selected && <UserEdit userId={selectedItemId} />}
      </ContentDetail>
    </ContentContainer>
  );
};
