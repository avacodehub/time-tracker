import React, { useState,useRef } from "react";
import useStore from "../Store/Store";
import { Input, Button, ButtonGroup  } from "@chakra-ui/react";

export default function NewProject() {
  const addProject = useStore((state) => state.addProject);
  // const isVisible = useStore((state) => state.isVisible_NewProject);
  // const setIsVisible = useStore((state) => state.setIsVisible_NewProject);
  const [isFocused, setIsFocused] = useState(false)
  const nameInputRef = useRef("");

  const handleNewProject = () => {
    const name = nameInputRef.current.value;
    if (name) {
      addProject(name);
      nameInputRef.current.value = "";
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleNewProject();
    }
  };

  return (
    <>
      <div className="input-row-interactive">
        <Input
          ref={nameInputRef}
          type="text"
          placeholder="New project or activity..."
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {isFocused ? (
        <ButtonGroup  variant="outline" isAttached size="sm" ml="auto">
          <Button variant="outline" onClick={() => setIsFocused(false)}>Close</Button>
          <Button variant="outline" onClick={handleNewProject}>Create</Button>
        </ButtonGroup >) : null}
      </div>
    </>
  );
}
