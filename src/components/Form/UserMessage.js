import React from "react";
import styled from "styled-components";

import ProfileImage from "../../Components/ProfileImage";

const UserMsgContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const UserMsgProfileWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  padding: 20px;
  border-top: 1px solid #e6e6e675;
`;

const FullNameDeco = styled.p`
  font-size: 18px;
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

const UserInfoHead = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const UserProfileImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 10px;
`;

const UserMsgTitleWrapper = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e6e6e675;
`;

const UserMsgTitle = styled.h1`
  font-size: 24px;
  font-weight: 200;
`;

const UserMsgDate = styled.p`
  text-align: right;
  font-size: 15px;
`;

const UserInfoHeadWrapper = styled.div``;

const UserMsgContent = styled.div`
  padding: 20px;
`;

const UserMessage = () => {
  return (
    <>
      <UserMsgContainer>
        <UserMsgTitleWrapper>
          <UserMsgTitle>누구누구에게 보내는 편지.</UserMsgTitle>
        </UserMsgTitleWrapper>
        <UserMsgContent>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            congue euismod ultricies. Etiam rhoncus lectus et tortor iaculis
            posuere. Donec vestibulum sagittis arcu, eu convallis odio volutpat
            eget. Pellentesque eu blandit enim. Aliquam facilisis rhoncus elit,
            vitae pulvinar lorem semper sed. Cras et gravida est. Vestibulum
            vehicula tincidunt consequat. Duis eu lectus sed ipsum ultricies
            sollicitudin. Nam auctor orci leo, quis volutpat risus fringilla eu.
            Class aptent taciti sociosqu ad litora torquent per conubia nostra,
            per inceptos himenaeos. Orci varius natoque penatibus et magnis dis
            parturient montes, nascetur ridiculus mus. Suspendisse purus tellus,
            consequat et ultrices vel, posuere eu mi. Cras vulputate arcu sed
            aliquam tempus. Nulla porttitor tellus non lectus pharetra luctus.
            In hac habitasse platea dictumst. Vestibulum nec erat eget velit
            dignissim convallis. Sed vitae lacinia neque. Nulla tincidunt enim
            sed purus tincidunt venenatis. Pellentesque quis viverra erat, in
            hendrerit nunc. Praesent id efficitur sapien, at pellentesque felis.
            Aliquam erat volutpat. Nulla dolor tortor, tristique aliquet viverra
            nec, vehicula quis lacus. Morbi mattis magna lacus, id tincidunt
            felis tincidunt ac. Curabitur urna tortor, porttitor interdum nisi
            ut, dapibus feugiat nisl. Donec purus magna, finibus hendrerit velit
            eget, sollicitudin condimentum eros. Ut aliquam eros sed purus
            pellentesque tincidunt. Pellentesque in sapien et justo malesuada
            tempus. Aenean venenatis luctus ante et mollis. Maecenas id ligula
            id magna laoreet aliquet. Ut et purus lacus. Morbi ligula lectus,
            consectetur sed consequat eget, convallis at odio. Sed posuere
            congue leo a dignissim. Orci varius natoque penatibus et magnis dis
            parturient montes, nascetur ridiculus mus. Donec convallis sapien
            neque, eu ultrices eros iaculis eget. Maecenas ultricies in elit
            vitae aliquet. Maecenas blandit nibh nec metus placerat vehicula.
            Vestibulum ut lacus bibendum lectus aliquet suscipit. Nulla sapien
            libero, luctus in hendrerit consectetur, dignissim sit amet leo.
            Vivamus lacinia elit risus, a scelerisque mauris placerat sit amet.
            In tempus arcu lectus, et molestie erat aliquet facilisis. Integer
            dictum risus condimentum erat lacinia, at commodo mauris rutrum.
            Proin suscipit pretium enim, in consequat eros sodales eu. Duis elit
            augue, tempus quis ultricies sit amet, placerat nec neque. Donec
            venenatis dolor massa. Morbi lacus metus, rutrum at lacinia eu,
            pulvinar eget urna. Nulla accumsan cursus lorem, scelerisque porta
            nisl dignissim eu. Duis lorem diam, rutrum vel neque quis,
            ullamcorper convallis est. Cras eget bibendum ligula. Nullam
            porttitor, lectus sit amet semper consequat, dolor libero convallis
            justo, nec vestibulum odio nibh ac massa. Etiam cursus augue justo,
            ac auctor ante aliquet a. Aliquam imperdiet rutrum risus sit amet
            varius.
          </p>
        </UserMsgContent>
        <UserMsgProfileWrapper>
          <UserInfoHeadWrapper>
            <UserInfoHead>
              <FullNameDeco>신 병주&nbsp;&nbsp;</FullNameDeco>
              <BadgeSubTextDeco size={13}>CTO · S/W 개발자</BadgeSubTextDeco>
            </UserInfoHead>
            <SubTextDeco size={14}>@juraffe</SubTextDeco>
          </UserInfoHeadWrapper>
          <UserProfileImageWrapper>
            <ProfileImage
              width={43}
              height={43}
              src="https://scontent-nrt1-1.xx.fbcdn.net/v/t1.0-1/p148x148/104424755_3039633629484044_5461704554360702412_n.jpg?_nc_cat=101&ccb=2&_nc_sid=1eb0c7&_nc_ohc=tnW7u5R3wPMAX--esRG&_nc_ht=scontent-nrt1-1.xx&tp=6&oh=2e2fe9b80e599da46b8299464dd1aa48&oe=5FC7DEF4"
              alt="profile image"
            />
          </UserProfileImageWrapper>
        </UserMsgProfileWrapper>
      </UserMsgContainer>
    </>
  );
};

export default UserMessage;
