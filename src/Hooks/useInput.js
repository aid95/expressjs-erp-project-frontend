import { useState } from "react";

const useInput = (initialState) => {
  const [value, setValue] = useState(initialState);

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setValue(value);
  };
  return { value, onChange, setValue };
};

export default useInput;
