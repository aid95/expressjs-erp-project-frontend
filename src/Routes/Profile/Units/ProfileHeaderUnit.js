import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import styled from "styled-components";
import MomentUtils from "@date-io/moment";
import {
  Cake,
  Document,
  LightTalkBubble,
  MobilePhone,
  Timer,
  WhiteMail,
} from "../../../Components/Icons";
import ProfileImage from "../../../Components/ProfileImage";
import { ME } from "../../../SharedQueries";
import { CREATE_COMMUTE_TIME, MY_COMMUTETIME } from "../ProfileQueries";
import Modal from "react-bootstrap/Modal";
import Button from "@material-ui/core/Button";
import {
  ModalContainer,
  ModalInputWrapper,
} from "./ContentParts/ContentStyles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { format } from "date-fns";
import Grid from "@material-ui/core/Grid";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { toast } from "react-toastify";
import { makeStyles, TextField } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const ProfileHeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
  padding: 10px;
  border-radius: ${(props) => props.theme.borderRadius};
`;

const ProfileInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const UserInfoHead = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ProfileImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 320px;
  height: 240px;
`;

const UserInfoWrapper = styled.div`
  margin-bottom: 20px;
`;

const UserDetailInfoWrapper = styled.div``;

const FullNameDeco = styled.p`
  font-size: 32px;
  font-weight: 400;
  line-height: 140%;

  color: ${(props) => props.theme.blackColor};

  display: flex;
  align-items: center;
`;

const SubTextDeco = styled.p`
  font-size: ${(props) => props.size || 13}px;
  font-weight: 200;

  display: flex;
  align-items: center;
  height: 30px;

  color: ${(props) => props.theme.darkGreyColor};
`;

const BadgeSubTextDeco = styled(SubTextDeco)`
  background-color: ${(props) => props.theme.greenColor};
  border-radius: 15px;
  color: white;
  padding: 0 10px;
`;

const ProfileInfoLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
`;

const ProfileInfoRight = styled.div`
  height: 100%;
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileHeaderMenuList = styled.ul`
  display: flex;
  margin-top: 10px;
`;

const ProfileHeaderMenuListItem = styled.li`
  &:not(:last-child) {
    margin-right: 45px;
  }
  opacity: 0.6;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ViewCommuteTimesModal = (props) => {
  const classes = useStyles();

  const { data, loading } = useQuery(MY_COMMUTETIME, {
    fetchPolicy: "network-only",
  });
  const [isHoliday, setIsHoliday] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(
    new Date(`${format(new Date(), "yyyy-MM-dd")}T09:00`)
  );
  const [selectedEndDate, setSelectedEndDate] = useState(
    new Date(`${format(new Date(), "yyyy-MM-dd")}T18:00`)
  );

  const commuteTimeToGraphData = (commuteTimeList) => {
    const data = commuteTimeList.map(
      ({ nightShiftTime, overWorkTime, workDateTime, workTime }) => {
        return {
          야간: nightShiftTime,
          연장: overWorkTime + nightShiftTime,
          일반: workTime,
          날짜: format(new Date(workDateTime), "yyyy년 MM월 dd일"),
        };
      }
    );
    return data;
  };

  const [createCommuteTimeMutation] = useMutation(CREATE_COMMUTE_TIME, {
    variables: {
      startDate: selectedStartDate.toISOString(),
      endDate: selectedEndDate.toISOString(),
      isHoliday,
    },
  });

  return (
    <>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        {!loading && data && data.myCommuteTime && (
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                📓 내 출퇴 기록
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ModalContainer>
                <ModalInputWrapper ai={true}>
                  <LineChart
                    width={760}
                    height={200}
                    data={commuteTimeToGraphData(data.myCommuteTime)}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="날짜" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="일반" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="연장" stroke="#de3a50" />
                    <Line type="monotone" dataKey="야간" stroke="#8884d8" />
                  </LineChart>
                </ModalInputWrapper>
              </ModalContainer>
            </Modal.Body>
            <Modal.Footer>
              <Grid container justify="space-around">
                <TextField
                  id="datetime-local"
                  label="출근 시간"
                  type="datetime-local"
                  defaultValue={`${format(
                    selectedStartDate,
                    "yyyy-MM-dd"
                  )}T09:00`}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) =>
                    setSelectedStartDate(new Date(e.target.value))
                  }
                />
                <TextField
                  id="datetime-local"
                  label="퇴근 시간"
                  type="datetime-local"
                  defaultValue={`${format(
                    selectedEndDate,
                    "yyyy-MM-dd"
                  )}T18:00`}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => setSelectedEndDate(new Date(e.target.value))}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isHoliday}
                      onChange={(event) => setIsHoliday(event.target.checked)}
                      name="checkedB"
                      color="primary"
                    />
                  }
                  label="휴무 수당 적용"
                />
                <Button
                  variant={"outlined"}
                  color={"primary"}
                  onClick={async (e) => {
                    if (selectedStartDate < selectedEndDate) {
                      await createCommuteTimeMutation();
                      props.onHide();
                    } else {
                      toast.error("출퇴 시간이 잘못되었습니다.");
                    }
                  }}
                >
                  출퇴 기록
                </Button>
              </Grid>
            </Modal.Footer>
          </Modal>
        )}
      </MuiPickersUtilsProvider>
    </>
  );
};

const ProfileHeaderUnit = () => {
  const { data, loading } = useQuery(ME);
  const [viewCommuteTimesModal, setViewCommuteTimesModal] = React.useState(
    false
  );

  return (
    <>
      {!loading && data && data.me && (
        <ProfileHeaderWrapper>
          <ProfileImageWrapper>
            <ProfileImage
              width={180}
              height={180}
              src="https://scontent-nrt1-1.xx.fbcdn.net/v/t1.0-1/p148x148/104424755_3039633629484044_5461704554360702412_n.jpg?_nc_cat=101&ccb=2&_nc_sid=1eb0c7&_nc_ohc=tnW7u5R3wPMAX--esRG&_nc_ht=scontent-nrt1-1.xx&tp=6&oh=2e2fe9b80e599da46b8299464dd1aa48&oe=5FC7DEF4"
              alt="profile image"
            />
          </ProfileImageWrapper>

          <ProfileInfoWrapper>
            <ProfileInfoLeft>
              <UserInfoWrapper>
                <UserInfoHead>
                  <FullNameDeco>{data.me.fullName}&nbsp;&nbsp;</FullNameDeco>
                  <BadgeSubTextDeco size={14}>
                    {data.me.rank.title} · {data.me.department.title}
                  </BadgeSubTextDeco>
                </UserInfoHead>
                <SubTextDeco size={20}>@{data.me.username}</SubTextDeco>
              </UserInfoWrapper>
              <UserDetailInfoWrapper>
                <SubTextDeco>
                  <WhiteMail /> &nbsp;&nbsp;
                  {data.me.email}
                </SubTextDeco>
                <SubTextDeco>
                  <Cake /> &nbsp;&nbsp;
                  {new Date(data.me.birthDay).toDateString()}
                </SubTextDeco>
                <SubTextDeco>
                  <MobilePhone /> &nbsp;&nbsp;
                  {"010-1234-1234"}
                </SubTextDeco>
              </UserDetailInfoWrapper>
            </ProfileInfoLeft>

            <ProfileInfoRight>
              <ProfileHeaderMenuList>
                <ProfileHeaderMenuListItem
                  onClick={() => {
                    setViewCommuteTimesModal(true);
                  }}
                >
                  <SubTextDeco size={20}>근무 시간</SubTextDeco>
                  <br />
                  <Timer size={64} />
                  <br />
                  <SubTextDeco size={24}>0</SubTextDeco>
                </ProfileHeaderMenuListItem>
                <ProfileHeaderMenuListItem>
                  <SubTextDeco size={20}>결재 대기</SubTextDeco>
                  <br />
                  <Document size={64} />
                  <br />
                  <SubTextDeco size={24}>0</SubTextDeco>
                </ProfileHeaderMenuListItem>
                <ProfileHeaderMenuListItem>
                  <SubTextDeco size={20}>메시지</SubTextDeco>
                  <br />
                  <LightTalkBubble size={64} />
                  <br />
                  <SubTextDeco size={24}>0</SubTextDeco>
                </ProfileHeaderMenuListItem>
              </ProfileHeaderMenuList>
            </ProfileInfoRight>
          </ProfileInfoWrapper>
        </ProfileHeaderWrapper>
      )}
      <ViewCommuteTimesModal
        show={viewCommuteTimesModal}
        onHide={() => {
          setViewCommuteTimesModal(false);
        }}
      />
    </>
  );
};

export default ProfileHeaderUnit;
