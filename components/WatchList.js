import React, { useEffect } from "react";
import Watch from "./Watch";
import useStore from "../Store/Store";
import NewWatch from "./NewWatch";

const LOCAL_STORAGE_KEY_WATCH_LIST = "0projecttracker_watch_list";

function WatchList() {
  const watchList = useStore((state) => state.watchList);
  const setWatchList = useStore((state) => state.setWatchList);

  useEffect(() => {
    const localWatch = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY_WATCH_LIST)
    );
    if (localWatch) setWatchList(localWatch);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY_WATCH_LIST,
      JSON.stringify(watchList)
    );
  }, [watchList]);

  return (
    <>
      <section className="projectsGrid">
        {watchList.length > 0
          ? watchList.map((p) => {
              if (p) return <Watch key={p.id} watch={p} />;
            })
          : null}
      </section>
      <NewWatch />
    </>
  );
}

export default WatchList;
