import React, { Children, cloneElement, useEffect, useState } from "react";

const Checkbox = ({ children }) => {
  const [checked, setChecked] = useState(true);

  const allChildren = Children.map(children, (child) => {
    if (child.type !== Label && child.type !== InputCheckbox) {
      return null;
    }
    const clone = cloneElement(child, {
      checked,
      setChecked,
    });
    return clone;
  });
  return allChildren;
};

const InputCheckbox = ({ checked, setChecked }) => {
  const [_checked, _setChecked] = useState(!!checked);
  useEffect(() => {
    if (!setChecked) {
      console.warn("single element");
    }
  }, [_checked, checked, setChecked]);
  return (
    <input
      type="checkbox"
      checked={!setChecked ? _checked : checked}
      onChange={(e) => {
        if (setChecked) {
          setChecked(e.target.checked);
        }
        _setChecked(e.target.checked);
      }}
    />
  );
};
const Label = ({ setChecked, children }) => {
  if (!setChecked) {
    throw new Error("single element");
  }
  return (
    <label
      style={{ userSelect: "none" }}
      onClick={() => {
        setChecked((state) => !state);
      }}
    >
      {children}
    </label>
  );
};

const App = () => {
  return (
    <>
      <Checkbox>
        <Label>{"label for checkbox"}</Label>
        <InputCheckbox />
      </Checkbox>
      {/* single checkbox */}
      <br />
      <span>single checkbox {'(not label)'}</span>
      <InputCheckbox />
    </>
  );
};

export default App;
