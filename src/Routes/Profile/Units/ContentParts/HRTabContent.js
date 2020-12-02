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
import { SEE_USERS } from "../../ProfileQueries";
import UserEdit from "../../../../Components/Form/UserEdit";

const POLL_INTERVAL = 2000;

export const HRTabContent = () => {
  const [selectedItemId, setSelectedItemId] = useState("");
  const [selected, setSelected] = useState(false);

  const [queryGetItems, resultGetItems] = useLazyQuery(SEE_USERS, {
    pollInterval: POLL_INTERVAL,
    fetchPolicy: "network-only",
  });

  const onUserClick = async (e) => {
    setSelectedItemId(e.target.id);
    setSelected(true);
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
          </ContentLeftHeader>
          <ContentLeftList>
            <ContentList>
              {!resultGetItems.loading &&
                resultGetItems.data &&
                resultGetItems.data.users &&
                resultGetItems.data.users.map((user) => (
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
