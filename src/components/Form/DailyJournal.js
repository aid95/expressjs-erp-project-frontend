import React, { useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import SelectSearch from "react-select-search";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { gql } from "apollo-boost";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { EDIT_TASK, SEE_TASK } from "../../Routes/Profile/ProfileQueries";

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

const JournalMenu = styled.ul`
  display: flex;
  font-size: 12px;
`;

const JournalMenuItem = styled.li`
  padding: 3px;
  cursor: pointer;
  &:not(:last-child) {
    margin-right: 5px;
  }
`;

const DateTimeText = styled.span`
  font-size: 20px;
`;

const JournalWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const EditTaskModal = (props) => {
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
  const [editTaskMutation] = useMutation(EDIT_TASK, {
    variables: {
      id: props.taskId,
      comment: content,
      beginDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      action: "EDIT",
    },
    onCompleted: (d) => {
      if (!d) {
        toast.error("업무 내용이 잘못되었습니다.");
      }
    },
  });

  useQuery(SEE_TASK, {
    variables: {
      id: props.taskId,
    },
    onCompleted: (d) => {
      if (d.seeTask === null) return;
      const {
        seeTask: { id, comment, beginDateTime, endDateTime },
      } = d;
      setContent(comment);
      setStartDate(new Date(beginDateTime));
      setEndDate(new Date(endDateTime));
    },
    fetchPolicy: "network-only",
  });

  const cancelClick = (e) => {
    setContent("");
    props.onHide();
  };
  const completeClick = async (e) => {
    if (content !== "" && startDate < endDate) {
      try {
        await editTaskMutation();
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
            💻 업무 내용 수정
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
          <Button color={"secondary"} onClick={cancelClick}>
            취소
          </Button>
          <Button color={"primary"} onClick={completeClick}>
            저장
          </Button>
        </Modal.Footer>
      </Modal>
    )
  );
};

const JournalItem = ({
  taskId,
  editModal,
  categorys,
  journalText,
  start,
  end,
}) => {
  const startDate = format(new Date(start), "HH:mm");
  const endDate = format(new Date(end), "HH:mm");
  const subCategory = categorys || "-";
  const middleCategory = subCategory.parentCategory || "-";
  const mainCategory = middleCategory.parentCategory || "-";

  const [deleteTaskMutation] = useMutation(EDIT_TASK, {
    variables: {
      id: taskId,
      action: "DELETE",
    },
  });

  return (
    <ContentTableRow>
      <ContentTableCell cellWidth={60}>
        <JournalInfoWrapper>
          <Categories>
            {mainCategory.title} > {middleCategory.title} > {subCategory.title}
          </Categories>
          <JournalWrapper>
            <JournalText>{journalText}</JournalText>
            <JournalMenu>
              <JournalMenuItem
                id={taskId}
                onClick={async (e) => {
                  editModal(e.target.id);
                }}
              >
                수정
              </JournalMenuItem>
              <JournalMenuItem
                id={taskId}
                onClick={async () => {
                  await deleteTaskMutation();
                }}
              >
                삭제
              </JournalMenuItem>
            </JournalMenu>
          </JournalWrapper>
        </JournalInfoWrapper>
      </ContentTableCell>
      <ContentCenterTableCell cellWidth={20}>
        <DateTimeText>{startDate}</DateTimeText>
      </ContentCenterTableCell>
      <ContentCenterTableCell cellWidth={20}>
        <DateTimeText>{endDate}</DateTimeText>
      </ContentCenterTableCell>
    </ContentTableRow>
  );
};

///////////////////////////

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
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
          <Button color={"secondary"} onClick={cancelClick}>
            취소
          </Button>
          <Button color={"primary"} onClick={completeClick}>
            저장
          </Button>
        </Modal.Footer>
      </Modal>
    )
  );
};

const DailyJournal = ({ data, setter }) => {
  const { id, createdAt, tasks } = data;
  const [newTaskModalShow, setNewTaskModalShow] = useState(false);
  const [editTaskId, setEditTaskId] = useState("");
  const [editTaskModalShow, setEditTaskModalShow] = useState(false);

  const seletedEditTask = (id) => {
    setEditTaskId(id);
    setEditTaskModalShow(true);
  };

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
            taskId={task.id}
            editModal={seletedEditTask}
            categorys={task.category}
            journalText={task.comment}
            start={task.beginDateTime}
            end={task.endDateTime}
          />
        ))}
      </ContentBody>
      <ContentFooter>
        <Button variant="outlined" onClick={() => setNewTaskModalShow(true)}>
          새 업무 추가
        </Button>
        <NewTaskModal
          journal={id}
          show={newTaskModalShow}
          onHide={() => {
            setNewTaskModalShow(false);
            setter(id);
          }}
        />
        <EditTaskModal
          taskId={editTaskId}
          show={editTaskModalShow}
          onHide={() => {
            setEditTaskModalShow(false);
          }}
        />
      </ContentFooter>
    </Container>
  );
};

export default DailyJournal;
