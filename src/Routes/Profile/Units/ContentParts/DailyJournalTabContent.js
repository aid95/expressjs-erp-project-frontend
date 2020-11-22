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
import { useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  ContentList,
  ContentListItemComp,
} from "../../../../Components/ContentList";
import DailyJournal from "../../../../Components/Form/DailyJournal";

const POLL_INTERVAL = 2000;

const NewDailyJournalButton = () => {
  const [createDailyJournalMutation] = useMutation(CREATE_DAILY_JOURNAL);
  const onClick = async (e) => {
    createDailyJournalMutation();
  };
  return <NewButtonStyle onClick={onClick}>새 업무 일지 추가</NewButtonStyle>;
};

export const DailyJournalContent = () => {
  const [selectedItemId, setSelectedItemId] = useState("");

  const [queryGetItems, resultGetItems] = useLazyQuery(SEE_DAILY_JOURNALS, {
    pollInterval: POLL_INTERVAL,
    fetchPolicy: "network-only",
  });

  const [queryViewItem, resultViewItem] = useLazyQuery(SEE_FULL_DAILY_JOURNAL, {
    variables: { id: selectedItemId },
    fetchPolicy: "network-only",
    pollInterval: POLL_INTERVAL,
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

  useEffect(() => {
    queryViewItem();
    return () => {};
  }, [queryViewItem, selectedItemId]);

  return (
    <ContentContainer>
      <ContentWrapper>
        <ContentLeftSide>
          <ContentLeftHeader>
            <ContentTitle>내 업무</ContentTitle>
          </ContentLeftHeader>
          <ContentLeftList>
            <ContentList>
              {!resultGetItems.loading &&
                resultGetItems.data &&
                resultGetItems.data.dailyJournals &&
                resultGetItems.data.dailyJournals.map((dailyJournal) => (
                  <ContentListItemComp
                    emoji={"💻"}
                    title={`${new Date(
                      dailyJournal.createdAt
                    ).toDateString()} 업무 일지`}
                    subtext={`${new Date(
                      dailyJournal.createdAt
                    ).toDateString()}`}
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
