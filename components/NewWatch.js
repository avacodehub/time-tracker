import React, { useState, useRef } from "react";
import useStore from "../Store/Store";
import { Input, Button, ButtonGroup, Stack } from "@chakra-ui/react";

export default function NewWatch() {
  const addWatch = useStore((state) => state.addWatch);
  
  const [isFocused, setIsFocused] = useState(false);
  const customIdInputRef = useRef("");
  const nameInputRef = useRef("");

  const handleNewWatch = () => {
    const customId = customIdInputRef.current.value;
    const name = nameInputRef.current.value;
    if (customId) {
      addWatch(customId, name);
      customIdInputRef.current.value = "";
      nameInputRef.current.value = "";
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleNewWatch();
    }
  };

  const handleBlur = () => {
    if (!customIdInputRef.current.value) {
      setIsFocused(false);
    }
  };

  return (
    <>
      <div className="input-row-interactive">
        <Input
          ref={customIdInputRef}
          type="text"
          placeholder="Type ID to watch..."
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
        />
        {isFocused ? (
          <Stack>
            <Input
              ref={nameInputRef}
              type="text"
              placeholder="Add custom name (optional)"
              onBlur={handleBlur}
            />
            <ButtonGroup variant="outline" isAttached size="sm" ml="auto">
              <Button variant="outline" onClick={() => setIsFocused(false)}>
                Close
              </Button>
              <Button variant="outline" onClick={handleNewWatch}>
                Create
              </Button>
            </ButtonGroup>
          </Stack>
        ) : null}
      </div>
    </>
  );
}
