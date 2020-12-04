import React, { useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  NewButtonStyle,
  ContentContainer,
  ContentWrapper,
  ContentDetail,
  ContentLeftHeader,
  ContentLeftList,
  ContentLeftSide,
  ContentTitle,
  ModalInputWrapper,
  ModalContainer,
} from "./ContentStyles";
import {
  ContentList,
  ContentListItemComp,
} from "../../../../Components/ContentList";
import { CREATE_DEPARTMENT } from "../../ProfileQueries";
import Modal from "react-bootstrap/Modal";
import Button from "@material-ui/core/Button";
import Input from "../../../../Components/Input";
import useInput from "../../../../Hooks/useInput";
import { toast } from "react-toastify";
import { GET_DEPARTMENTS } from "../../../../SharedQueries";
import DeptDetail from "../../../../Components/Form/DeptDetail";

const POLL_INTERVAL = 2000;

const NewMailModal = (props) => {
  const title = useInput("");

  const [createDeptMutation] = useMutation(CREATE_DEPARTMENT, {
    variables: {
      title: title.value,
    },
  });

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          📧 새 부서 생성
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ModalContainer>
          <ModalInputWrapper>
            <Input value={""} placeholder={"부서명"} {...title} />
          </ModalInputWrapper>
        </ModalContainer>
      </Modal.Body>
      <Modal.Footer>
        <Button
          color={"primary"}
          onClick={async (e) => {
            if (title.value !== "") {
              await createDeptMutation();
              title.setValue("");
              props.onHide();
            } else {
              toast.error("양식을 채워주세요.");
            }
          }}
        >
          생성
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const NewMailButton = () => {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <NewButtonStyle onClick={() => setModalShow(true)}>
        새 부서 만들기
      </NewButtonStyle>
      <NewMailModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
};

export const DeptTabContent = () => {
  const [selectedItemId, setSelectedItemId] = useState("");
  const [viewMail, setViewMail] = useState(false);

  const [queryGetItems, resultGetItems] = useLazyQuery(GET_DEPARTMENTS, {
    pollInterval: POLL_INTERVAL,
    fetchPolicy: "network-only",
  });

  const onDeptClick = async (e) => {
    setSelectedItemId(e.target.id);
    setViewMail(true);
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
            <ContentTitle>부서 관리</ContentTitle>
          </ContentLeftHeader>
          <ContentLeftList>
            <ContentList>
              {!resultGetItems.loading &&
                resultGetItems.data &&
                resultGetItems.data.departments &&
                resultGetItems.data.departments.map(({ id, title }) => (
                  <ContentListItemComp
                    emoji={"🏢"}
                    title={title}
                    subtext={``}
                    key={id}
                    id={id}
                    onClick={onDeptClick}
                    isSelected={selectedItemId === id}
                  />
                ))}
            </ContentList>
          </ContentLeftList>
          <NewMailButton />
        </ContentLeftSide>
      </ContentWrapper>

      <ContentDetail>
        {viewMail && <DeptDetail id={selectedItemId} />}
      </ContentDetail>
    </ContentContainer>
  );
};
