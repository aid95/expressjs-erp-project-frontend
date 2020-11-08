import React from "react";
import styled from "styled-components";

//
const PayStubContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const PayStubHead = styled.h1`
  font-size: 32px;
  font-weight: 600;
  text-align: center;
  margin: 20px 10px 60px 10px;
`;

const PayStubFoot = styled(PayStubHead)`
  font-size: 24px;
  font-weight: 200;
  margin: 40px 10px 20px 10px;
`;

const PayStubAmountWrapper = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 40px;
  margin-bottom: 50px;
  border-bottom: 1px solid #e6e6e675;
`;

const TakeHomePayInfo = styled.li`
  width: 33.3%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

//
const TakeHomePayHead = styled.h2`
  font-size: 21px;
  font-weight: 200;
  padding-bottom: 6px;
  margin-bottom: 10px;
  border-bottom: 2px solid #32aa46;
`;

const TakeHomePayText = styled.span`
  font-size: 32px;
  font-weight: 200;
`;

//
const PayStubDetailWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  margin-bottom: 60px;
`;

const PayStubDetailLeft = styled.div`
  width: 50%;

  display: flex;
`;

const PayStubDetailRight = styled.div`
  width: 50%;

  display: flex;
`;

const PayStubDetailList = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const PayStubDetailItem = styled.li`
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0px;
`;

const PayStubDetailItemHead = styled.h1`
  font-size: 21px;
  font-weight: 200;
  width: 40%;
  text-align: right;
  margin-right: 20px;
`;

const PayStubDetailItemText = styled.span`
  font-size: 18px;
  font-weight: 200;
  width: 60%;
`;

const PayStubTotalWrapper = styled(PayStubDetailWrapper)``;

const PayStub = () => {
  return (
    <>
      <PayStubContainer>
        <PayStubHead>급 여 명 세 서</PayStubHead>
        <PayStubAmountWrapper>
          <TakeHomePayInfo>
            <TakeHomePayHead>지급 금액</TakeHomePayHead>
            <TakeHomePayText>1,000,000,000</TakeHomePayText>
          </TakeHomePayInfo>
          <TakeHomePayInfo>
            <TakeHomePayHead>공제 금액</TakeHomePayHead>
            <TakeHomePayText>0</TakeHomePayText>
          </TakeHomePayInfo>
          <TakeHomePayInfo>
            <TakeHomePayHead>실 수령액</TakeHomePayHead>
            <TakeHomePayText>1,000,000,000</TakeHomePayText>
          </TakeHomePayInfo>
        </PayStubAmountWrapper>
        <PayStubDetailWrapper>
          <PayStubDetailLeft>
            <PayStubDetailList>
              <PayStubDetailItem>
                <PayStubDetailItemHead>기본급</PayStubDetailItemHead>
                <PayStubDetailItemText>1,000,000,000</PayStubDetailItemText>
              </PayStubDetailItem>
              <PayStubDetailItem>
                <PayStubDetailItemHead>연장근로수당</PayStubDetailItemHead>
                <PayStubDetailItemText>1,000,000,000</PayStubDetailItemText>
              </PayStubDetailItem>
              <PayStubDetailItem>
                <PayStubDetailItemHead>야간근로수당</PayStubDetailItemHead>
                <PayStubDetailItemText>1,000,000,000</PayStubDetailItemText>
              </PayStubDetailItem>
              <PayStubDetailItem>
                <PayStubDetailItemHead>휴일근로수당</PayStubDetailItemHead>
                <PayStubDetailItemText>1,000,000,000</PayStubDetailItemText>
              </PayStubDetailItem>
            </PayStubDetailList>
          </PayStubDetailLeft>
          <PayStubDetailRight>
            <PayStubDetailList>
              <PayStubDetailItem>
                <PayStubDetailItemHead>국민연금</PayStubDetailItemHead>
                <PayStubDetailItemText>1,000,000,000</PayStubDetailItemText>
              </PayStubDetailItem>
              <PayStubDetailItem>
                <PayStubDetailItemHead>국민건강보험</PayStubDetailItemHead>
                <PayStubDetailItemText>1,000,000,000</PayStubDetailItemText>
              </PayStubDetailItem>
              <PayStubDetailItem>
                <PayStubDetailItemHead>고용보험</PayStubDetailItemHead>
                <PayStubDetailItemText>1,000,000,000</PayStubDetailItemText>
              </PayStubDetailItem>
            </PayStubDetailList>
          </PayStubDetailRight>
        </PayStubDetailWrapper>
        <PayStubTotalWrapper>
          <PayStubDetailLeft>
            <PayStubDetailList>
              <PayStubDetailItem>
                <PayStubDetailItemHead>총 합</PayStubDetailItemHead>
                <PayStubDetailItemText>1,000,000,000</PayStubDetailItemText>
              </PayStubDetailItem>
            </PayStubDetailList>
          </PayStubDetailLeft>
          <PayStubDetailRight>
            <PayStubDetailList>
              <PayStubDetailItem>
                <PayStubDetailItemHead>총 합</PayStubDetailItemHead>
                <PayStubDetailItemText>1,000,000,000</PayStubDetailItemText>
              </PayStubDetailItem>
              <PayStubDetailItem>
                <PayStubDetailItemHead></PayStubDetailItemHead>
                <PayStubDetailItemText></PayStubDetailItemText>
              </PayStubDetailItem>
              <PayStubDetailItem>
                <PayStubDetailItemHead></PayStubDetailItemHead>
                <PayStubDetailItemText></PayStubDetailItemText>
              </PayStubDetailItem>
              <PayStubDetailItem>
                <PayStubDetailItemHead>지급액</PayStubDetailItemHead>
                <PayStubDetailItemText>1,000,000,000</PayStubDetailItemText>
              </PayStubDetailItem>
              <PayStubDetailItem>
                <PayStubDetailItemHead>공제액</PayStubDetailItemHead>
                <PayStubDetailItemText>1,000,000,000</PayStubDetailItemText>
              </PayStubDetailItem>
              <PayStubDetailItem>
                <PayStubDetailItemHead>실 지급액</PayStubDetailItemHead>
                <PayStubDetailItemText>1,000,000,000</PayStubDetailItemText>
              </PayStubDetailItem>
            </PayStubDetailList>
          </PayStubDetailRight>
        </PayStubTotalWrapper>
        <PayStubFoot>2020. 10. 02</PayStubFoot>
        <PayStubFoot>귀하의 노고에 감사드립니다.</PayStubFoot>
      </PayStubContainer>
    </>
  );
};

export default PayStub;
