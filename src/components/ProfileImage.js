import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.img`
  border-radius: ${(props) => props.radius || 0}%;
  height: auto;
  width: auto;
  max-width: ${(props) => props.width}px;
  max-height: ${(props) => props.height}px;
`;

const ProfileImage = ({
  width = 24,
  height = 24,
  src,
  alt,
  radius = 50,
  border,
}) => (
  <Container
    width={width}
    height={height}
    src={src}
    alt={alt}
    radius={radius}
    border={border}
  />
);

ProfileImage.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  radius: PropTypes.number,
  border: PropTypes.number,
};

export default ProfileImage;
