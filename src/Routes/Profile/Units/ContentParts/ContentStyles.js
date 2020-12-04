import styled from "styled-components";

export const NewButtonStyle = styled.button`
  background-color: #fafafa;
  border: none;
  border-radius: 5px;
  width: 95%;
  height: 50px;
  font-weight: 400;
`;

export const SCROLLBAR_STYLE = styled.div`
  &::-webkit-scrollbar {
    background-color: #fff;
    width: 16px;
  }

  &::-webkit-scrollbar-track {
    background-color: #fff;
  }

  &::-webkit-scrollbar-track:hover {
    background-color: #f4f4f4;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #f1f1f1;
    border-radius: 16px;
    border: 5px solid #fff;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: #a0a0a5;
    border: 4px solid #f4f4f4;
  }

  &::-webkit-scrollbar-button {
    display: none;
  }

  overflow-y: scroll;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
  border-radius: ${(props) => props.theme.borderRadius};
  padding: 20px;
  max-height: 600px;
`;

export const ContentTitle = styled.p`
  font-size: 24px;
  font-weight: 400;
  text-align: center;
  padding-bottom: 20px;
`;

export const ContentWrapper = styled.div`
  width: 28%;
  border-right: 1px solid #e6e6e675;
`;

export const ContentLeftSide = styled.div``;

export const ContentLeftHeader = styled.div`
  margin-right: 15px;
  border-bottom: 1px solid #0000000f;
`;

export const ContentLeftList = styled(SCROLLBAR_STYLE)`
  height: 400px;
  margin-bottom: 20px;
`;

export const ContentDetail = styled(SCROLLBAR_STYLE)`
  width: 72%;
`;

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ModalInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px 0;
  align-items: ${(props) => (!!props.ai ? "center" : "left")};
`;
