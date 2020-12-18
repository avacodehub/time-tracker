import { SimpleGrid } from "@chakra-ui/react";
import React, { useRef, useEffect } from "react";
import Watch from "./Watch";
import useStore from "../Store/Store";
import EditTime from "./EditTIme";

const LOCAL_STORAGE_KEY_WATCH_LIST = "0projecttracker_watch_list";

function WatchList() {
  const watchList = useStore((state) => state.watchList);
  const addWatch = useStore((state) => state.addWatch);
  const setWatchList = useStore((state) => state.setWatchList);

  useEffect(() => {
    const localWatch = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY_WATCH_LIST)
    );
    if (localWatch) setWatchList(localWatch)

  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_WATCH_LIST, JSON.stringify(watchList));
  }, [watchList]);

  const inputProjectName = useRef("");
  const inputProjectCustomId = useRef("");

  const handleAddProject = () => {
    const name = inputProjectName.current.value;
    const customId = inputProjectCustomId.current.value
    if (name === "") return;
    if (customId  === "") return;
    addWatch(name, customId);
    inputProjectName.current.value = "";
    inputProjectCustomId.current.value = "";
  };

  return (
    <>
      <label>New project...</label>
      <input
        ref={inputProjectName}
      />
      <input
        ref={inputProjectCustomId}
      />

      <button onClick={handleAddProject}>Create</button>
      <SimpleGrid columns={4} spacing={10}>
        {watchList.length > 0
          ? watchList.map((p) =>
              {if (p) return <Watch key={p.id} watch={p} />}
            )
          : null}
      </SimpleGrid>
      <EditTime />
    </>
  );
}

export default WatchList;
