import React, { useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import SelectSearch from "react-select-search";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { gql } from "apollo-boost";
import { toast } from "react-toastify";

const ContentTableRow = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px 0;
`;

const ContentTableCell = styled.div`
  width: ${(props) => props.cellWidth}%;
  text-align: ${(props) => (props.center ? "center" : "left")};
`;

const ContentCenterTableCell = styled(ContentTableCell)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

///////////////////////////

const JournalInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 20px 20px 40px;
  border-left: 3px solid ${(props) => props.theme.greenColor};
`;

const Categories = styled.p`
  font-size: 13px;
  color: ${(props) => props.theme.darkGreyColor};
  padding: 3px;
`;

const JournalText = styled.p`
  font-size: 20px;
  padding: 3px;
`;

const DateTimeText = styled.span`
  font-size: 20px;
`;

const JournalItem = ({ categorys, journalText, start, end }) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const subCategory = categorys || "-";
  const middleCategory = subCategory.parentCategory || "-";
  const mainCategory = middleCategory.parentCategory || "-";

  return (
    <ContentTableRow>
      <ContentTableCell cellWidth={60}>
        <JournalInfoWrapper>
          <Categories>
            {mainCategory.title} > {middleCategory.title} > {subCategory.title}
          </Categories>
          <JournalText>{journalText}</JournalText>
        </JournalInfoWrapper>
      </ContentTableCell>
      <ContentCenterTableCell cellWidth={20}>
        <DateTimeText>
          {startDate.getHours()}:{startDate.getMinutes()}
        </DateTimeText>
      </ContentCenterTableCell>
      <ContentCenterTableCell cellWidth={20}>
        <DateTimeText>
          {endDate.getHours()}:{endDate.getMinutes()}
        </DateTimeText>
      </ContentCenterTableCell>
    </ContentTableRow>
  );
};

///////////////////////////

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ContentHeader = styled.div`
  padding-bottom: 30px;
`;

const HeaderTitle = styled.h1`
  text-align: center;
  padding: 20px;
  font-size: 32px;
  font-weight: 600;
`;

const HeaderSubTitle = styled.p`
  text-align: center;
  color: ${(props) => props.theme.darkGreyColor};
`;

const ContentBody = styled.div`
  padding: 20px;
`;

const ContentFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ModalInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
  width: ${(props) => props.width}%;
`;

const ModalInputCaption = styled.p`
  margin-bottom: 5px;
`;

const MAIN_CATEGORIES = gql`
  {
    categories {
      id
      title
    }
  }
`;

const SUB_CATEGORIES = gql`
  query categories($parentCategoryId: String) {
    categories(parentCategoryId: $parentCategoryId) {
      id
      title
    }
  }
`;

const NEW_TASK_MUTATION = gql`
  mutation createTask(
    $journalId: String!
    $categoryId: String!
    $comment: String!
    $beginDate: String!
    $endDate: String!
  ) {
    createTask(
      journalId: $journalId
      categoryId: $categoryId
      comment: $comment
      beginDate: $beginDate
      endDate: $endDate
    ) {
      id
    }
  }
`;

const NewTaskModal = (props) => {
  // hooks
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [content, setContent] = useState("");
  const [mainCategory, setMainCategory] = useState("");
  const [middleCategory, setMiddleCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  // Apollo client
  // Query
  const resultMainCategories = useQuery(MAIN_CATEGORIES, {
    fetchPolicy: "network-only",
  });
  const [queryMiddleCategories, resultMiddleCategories] = useLazyQuery(
    SUB_CATEGORIES,
    {
      variables: { parentCategoryId: mainCategory },
      fetchPolicy: "network-only",
    }
  );
  const [querySubCategories, resultSubCategories] = useLazyQuery(
    SUB_CATEGORIES,
    {
      variables: { parentCategoryId: middleCategory },
      fetchPolicy: "network-only",
    }
  );
  // Mutation
  const [newTaskMutation] = useMutation(NEW_TASK_MUTATION, {
    variables: {
      journalId: props.journal,
      categoryId: subCategory,
      comment: content,
      beginDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    },
  });

  const cancelClick = (e) => {
    setContent("");
    props.onHide();
  };
  const completeClick = async (e) => {
    if (
      props.journal !== "" &&
      subCategory !== "" &&
      content !== "" &&
      startDate < endDate
    ) {
      try {
        await newTaskMutation();
        cancelClick();
      } catch (e) {
        toast.error("업무 시간이 중첩되었습니다.");
      }
    } else {
      toast.error("업무 내용이 잘못되었습니다.");
    }
  };

  useMemo(() => {
    queryMiddleCategories();
  }, [mainCategory]);
  const onMainCategoryChange = (e) => {
    setMainCategory(e);
    setSubCategory("");
  };
  useMemo(() => {
    querySubCategories();
  }, [middleCategory]);
  const onMiddleCategoryChange = (e) => {
    setMiddleCategory(e);
  };
  const onSubCategoryChange = (e) => {
    setSubCategory(e);
  };

  return (
    !resultMainCategories.loading && (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            💻 추가 업무 내용
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ModalContainer>
            <ModalInputWrapper width={35}>
              <SelectSearch
                onChange={onMainCategoryChange}
                placeholder={"대분류"}
                options={resultMainCategories.data.categories.map(
                  (category) => {
                    return {
                      name: category.title,
                      value: category.id,
                    };
                  }
                )}
              />
            </ModalInputWrapper>
            <ModalInputWrapper width={35}>
              <SelectSearch
                onChange={onMiddleCategoryChange}
                placeholder={"중분류"}
                options={
                  resultMiddleCategories.loading
                    ? []
                    : resultMiddleCategories.data.categories.map((category) => {
                        return {
                          name: category.title,
                          value: category.id,
                        };
                      })
                }
              />
            </ModalInputWrapper>
            <ModalInputWrapper width={35}>
              <SelectSearch
                onChange={onSubCategoryChange}
                placeholder={"소분류"}
                options={
                  resultSubCategories.loading
                    ? []
                    : resultSubCategories.data.categories.map((category) => {
                        return {
                          name: category.title,
                          value: category.id,
                        };
                      })
                }
              />
            </ModalInputWrapper>
          </ModalContainer>
          <ModalContainer>
            <ModalInputWrapper width={50}>
              <ModalInputCaption>업무 내용</ModalInputCaption>
              <input
                value={content}
                onChange={(event) => setContent(event.target.value)}
              />
            </ModalInputWrapper>
            <ModalInputWrapper width={30}>
              <ModalInputCaption>시작 시간</ModalInputCaption>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
              />
            </ModalInputWrapper>
            <ModalInputWrapper width={30}>
              <ModalInputCaption>종료 시간</ModalInputCaption>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
              />
            </ModalInputWrapper>
          </ModalContainer>
        </Modal.Body>
        <Modal.Footer>
          <Button variant={"danger"} onClick={cancelClick}>
            취소
          </Button>
          <Button onClick={completeClick}>저장</Button>
        </Modal.Footer>
      </Modal>
    )
  );
};

const DailyJournal = ({ data, setter }) => {
  const { id, createdAt, tasks } = data;
  const [newTaskModalShow, setNewTaskModalShow] = useState(false);

  return (
    <Container>
      <ContentHeader>
        <HeaderTitle>일일 업무 일지</HeaderTitle>
        <HeaderSubTitle>{new Date(createdAt).toDateString()}</HeaderSubTitle>
      </ContentHeader>
      <ContentBody>
        <ContentTableRow>
          <ContentTableCell center={true} cellWidth={60}>
            업무 내용
          </ContentTableCell>
          <ContentTableCell center={true} cellWidth={20}>
            시작
          </ContentTableCell>
          <ContentTableCell center={true} cellWidth={20}>
            종료
          </ContentTableCell>
        </ContentTableRow>
        {tasks.map((task) => (
          <JournalItem
            categorys={task.category}
            journalText={task.comment}
            start={task.beginDateTime}
            end={task.endDateTime}
          />
        ))}
      </ContentBody>
      <ContentFooter>
        <Button variant="info" onClick={() => setNewTaskModalShow(true)}>
          새 업무
        </Button>
        <NewTaskModal
          journal={id}
          show={newTaskModalShow}
          onHide={() => {
            setNewTaskModalShow(false);
            setter(id);
          }}
        />
      </ContentFooter>
    </Container>
  );
};

export default DailyJournal;
