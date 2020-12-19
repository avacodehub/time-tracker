import create from "zustand";
import { v4 as uuidv4 } from "uuid";

const useStore = create((set) => ({
  projects: [],
  activeProject: null,
  beingEditProject: null,
  watchList: [],
  isVisible_NewWatch: false,
  isVisible_NewProject: false,

  setProjects: (projects) => set({ projects }),
  addProject: (name, customId = null) =>
    set((state) => ({
      projects: [
        ...state.projects,
        {
          id: uuidv4(),
          name,
          customId,
          time: 0,
          dateCreated: Date.now(),
          isRunning: false,
        },
      ],
    })),
  updateProject: (project) =>
    set((state) => {
      const newProjects = state.projects.map((p) => {
        if (p) {
          if (p.id === project.id) {
            return project;
          } else return p;
        }
      });
      return { projects: newProjects };
    }),
  deleteProject: (project) =>
    set((state) => ({
      projects: state.projects.filter((p) => p.id !== project.id),
    })),

  setActiveProject: (project) => set({ activeProject: project }),
  setBeingEditProject: (project) => set({ beingEditProject: project }),
  // WATCH LIST SECTION
  setWatchList: (watchList) => set({ watchList }),
  addWatch: ( customId, name = null) =>
    set((state) => ({
      watchList: [
        ...state.watchList,
        {
          id: uuidv4(),
          name,
          customId,
          time: 0,
        },
      ],
    })),
  deleteWatch: (watch) =>
    set((state) => ({
      watchList: state.watchList.filter((p) => p.id !== watch.id),
    })),
  fetchWatch: async (watch) => {
    const API =
      "https://us-central1-xamarin-tracker.cloudfunctions.net/app/api/read/";
    const API_GET = API + watch.customId;
    const response = await fetch(API_GET);
    if (response.status < 200 || response.status > 299) {
      alert("Response is not OK");
      return;
    }
    let json;
    try {
      json = await response.json();
    } catch {
      alert("No such ID");
      return;
    }
    const newWatch = { ...watch, time: json.time, lastSync: Date.now() };

    set((state) => {
      const newWatchList = state.watchList.map((p) => {
        if (p) {
          if (p.id === newWatch.id) {
            return newWatch;
          } else return p;
        }
      });
      return { watchList: newWatchList };
    });
  },
  // END WATCHLIST SECTION

  // UI State
  setIsVisible_NewWatch: (isVisible_NewWatch) =>  set({ isVisible_NewWatch}),
  setIsVisible_NewProject: (value) => set({ isVisible_NewProject: value }),
}));

export default useStore;
