import {
  NewButtonStyle,
  ContentContainer,
  ContentWrapper,
  ContentDetail,
  ContentLeftHeader,
  ContentLeftList,
  ContentLeftSide,
  ContentTitle,
} from "./ContentStyles";
import {
  CREATE_DAILY_JOURNAL,
  SEE_DAILY_JOURNALS,
  SEE_FULL_DAILY_JOURNAL,
} from "../../ProfileQueries";
import React, { useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  ContentList,
  ContentListItemComp,
} from "../../../../Components/ContentList";
import DailyJournal from "../../../../Components/Form/DailyJournal";
import { toast } from "react-toastify";
import { format } from "date-fns";
import Input from "@material-ui/core/Input";
import { gql } from "apollo-boost";
import { Helmet } from "react-helmet-async";

const POLL_INTERVAL = 2000;

const NewDailyJournalButton = () => {
  const [createDailyJournalMutation] = useMutation(CREATE_DAILY_JOURNAL);
  const onClick = async (e) => {
    try {
      const {
        data: { createDailyJournal },
      } = await createDailyJournalMutation();
      if (!!createDailyJournal) {
        toast.success("새 업무 일지가 추가되었습니다.");
      } else {
        toast.error("이미 금일 업무 일지가 존재합니다.");
      }
    } catch (e) {}
  };
  return <NewButtonStyle onClick={onClick}>새 업무 일지 추가</NewButtonStyle>;
};

const SEARCH_DAILY_JOURNAL = gql`
  query searchDailyJournal($term: String!) {
    searchDailyJournal(term: $term) {
      id
      user {
        fullName
        id
        username
      }
      createdAt
    }
  }
`;

export const DailyJournalContent = () => {
  const [selectedItemId, setSelectedItemId] = useState("");
  const [term, setTerm] = useState("");
  const [dailyJournals, setDailyJournals] = useState([]);

  const [queryGetItems, resultGetItems] = useLazyQuery(SEE_DAILY_JOURNALS, {
    pollInterval: POLL_INTERVAL,
    fetchPolicy: "network-only",
    onCompleted: (d) => {
      setDailyJournals(d.dailyJournals);
    },
  });

  const [queryViewItem, resultViewItem] = useLazyQuery(SEE_FULL_DAILY_JOURNAL, {
    variables: { id: selectedItemId },
    fetchPolicy: "network-only",
    pollInterval: POLL_INTERVAL,
  });

  const [querySearchDailyJournal] = useLazyQuery(SEARCH_DAILY_JOURNAL, {
    variables: { term },
    fetchPolicy: "network-only",
    onCompleted: (d) => {
      setDailyJournals(d.searchDailyJournal);
    },
  });

  const onJournalClick = async (e) => {
    setSelectedItemId(e.target.id);
  };

  useEffect(() => {
    if (!resultGetItems.called) {
      queryGetItems();
    }
    return () => {};
  });

  const onChangeSearchBar = async (e) => {
    setTerm(e.target.value);
    if (e.target.value !== "") {
      await querySearchDailyJournal();
    } else {
      await queryGetItems();
    }
  };

  useEffect(() => {
    queryViewItem();
    return () => {};
  }, [queryViewItem, selectedItemId]);

  return (
    <ContentContainer>
      <Helmet>
        <title>업무 | ERP Monitor</title>
      </Helmet>
      <ContentWrapper>
        <ContentLeftSide>
          <ContentLeftHeader>
            <ContentTitle>내 업무</ContentTitle>
            <Input
              fullWidth
              placeholder="검색하기"
              inputProps={{ "aria-label": "description" }}
              onChange={onChangeSearchBar}
            />
          </ContentLeftHeader>
          <ContentLeftList>
            <ContentList>
              {dailyJournals.map((dailyJournal) => (
                <ContentListItemComp
                  emoji={"💻"}
                  title={`${format(
                    new Date(dailyJournal.createdAt),
                    "yyyy년 MM월 dd일 업무 일지"
                  )}`}
                  subtext={`${new Date(
                    dailyJournal.createdAt
                  ).toDateString()} @${dailyJournal.user.username}`}
                  key={dailyJournal.id}
                  id={dailyJournal.id}
                  onClick={onJournalClick}
                  isSelected={selectedItemId === dailyJournal.id}
                />
              ))}
            </ContentList>
          </ContentLeftList>
          <NewDailyJournalButton />
        </ContentLeftSide>
      </ContentWrapper>

      <ContentDetail>
        {!resultViewItem.loading &&
          resultViewItem.data &&
          resultViewItem.data.dailyJournal && (
            <DailyJournal
              data={resultViewItem.data.dailyJournal}
              setter={setSelectedItemId}
            />
          )}
      </ContentDetail>
    </ContentContainer>
  );
};
