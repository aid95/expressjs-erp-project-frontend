import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.input`
  border: 0;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.bgColor};
  height: 35px;
  font-size: 12px;
  padding: 0px 15px;
`;

const MultilineContainer = styled.textarea`
  border: 0;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.bgColor};
  height: 200px;
  font-size: 12px;
  padding: 15px;
`;

const Input = ({
  placeholder,
  required = true,
  value,
  defaultValue,
  onChange,
  type = "text",
  className,
}) => (
  <Container
    className={className}
    placeholder={placeholder}
    required={required}
    value={value}
    defaultValue={defaultValue}
    onChange={onChange}
    type={type}
  />
);

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool,
  value: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
};

export const MultiLineInput = ({
  placeholder,
  required = true,
  value,
  defaultValue,
  onChange,
  type = "text",
  className,
  col = 20,
  row = 3,
}) => (
  <MultilineContainer
    className={className}
    placeholder={placeholder}
    required={required}
    value={value}
    onChange={onChange}
    defaultValue={defaultValue}
    type={type}
    col={col}
    row={row}
  />
);

MultiLineInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool,
  value: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  col: PropTypes.number,
  row: PropTypes.number,
};

export default Input;
