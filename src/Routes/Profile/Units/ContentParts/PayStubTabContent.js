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
import { MY_SALARIES, SEE_PAYMENT_STUB } from "../../ProfileQueries";
import PayStub from "../../../../Components/Form/PayStub";
import { format } from "date-fns";
import { Helmet } from "react-helmet-async";

const POLL_INTERVAL = 2000;

export const PayStubTabContent = () => {
  const [selectedItemId, setSelectedItemId] = useState("");

  const [queryGetItems, resultGetItems] = useLazyQuery(MY_SALARIES, {
    pollInterval: POLL_INTERVAL,
    fetchPolicy: "network-only",
  });

  const [queryViewItem, resultViewItem] = useLazyQuery(SEE_PAYMENT_STUB, {
    variables: { id: selectedItemId },
    fetchPolicy: "network-only",
  });

  const onMailClick = async (e) => {
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
  }, [selectedItemId, queryViewItem]);

  return (
    <ContentContainer>
      <Helmet>
        <title>급여 | ERP Monitor</title>
      </Helmet>
      <ContentWrapper>
        <ContentLeftSide>
          <ContentLeftHeader>
            <ContentTitle>급여 명세서</ContentTitle>
          </ContentLeftHeader>
          <ContentLeftList>
            <ContentList>
              {!resultGetItems.loading &&
                resultGetItems.data &&
                resultGetItems.data.mySalaries &&
                resultGetItems.data.mySalaries.map((salary) => (
                  <ContentListItemComp
                    emoji={"💰"}
                    title={format(
                      new Date(salary.createdAt),
                      "yyyy년 MM월 급여 명세서"
                    )}
                    subtext={``}
                    key={salary.id}
                    id={salary.id}
                    onClick={onMailClick}
                    isSelected={selectedItemId === salary.id}
                  />
                ))}
            </ContentList>
          </ContentLeftList>
        </ContentLeftSide>
      </ContentWrapper>

      <ContentDetail>
        {!resultViewItem.loading &&
          resultViewItem.data &&
          resultViewItem.data.seeSalary && (
            <PayStub data={resultViewItem.data.seeSalary} />
          )}
      </ContentDetail>
    </ContentContainer>
  );
};
