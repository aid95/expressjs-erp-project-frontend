import React from "react";
import styled from "styled-components";

//
const PayStubContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const PayStubHead = styled.h1`
  font-size: 32px;
  font-weight: 600;
  text-align: center;
`;

const PayStubAmountWrapper = styled.div`
  width: 70%;

  display: flex;
  flex-direction: row;
  align-items: center;
`;

//
const TakeHomePayWrapper = styled.div`
  width: 70%;
`;

const TakeHomePayHead = styled.h2``;

const TakeHomePayText = styled.span``;

//
const TakeHomePayDetailWrapper = styled.div`
  width: 30%;
`;

const TakeHOmePayInfo = styled.div``;

const PayStub = () => {
  return (
    <>
      <PayStubContainer>
        <PayStubHead>급 여 명 세 서</PayStubHead>
        <PayStubAmountWrapper>
          <TakeHomePayWrapper>
            <TakeHomePayHead>실 수령액</TakeHomePayHead>
            <TakeHomePayText>1,000,000,000</TakeHomePayText>
          </TakeHomePayWrapper>
          <TakeHomePayDetailWrapper>
            <TakeHOmePayInfo>
              <TakeHomePayHead>지급 금액</TakeHomePayHead>
              <TakeHomePayText>1,000,000,000</TakeHomePayText>
            </TakeHOmePayInfo>
            <TakeHOmePayInfo>
              <TakeHomePayHead>공재 금액</TakeHomePayHead>
              <TakeHomePayText>0</TakeHomePayText>
            </TakeHOmePayInfo>
          </TakeHomePayDetailWrapper>
        </PayStubAmountWrapper>
        <br />
      </PayStubContainer>
    </>
  );
};

export default PayStub;
