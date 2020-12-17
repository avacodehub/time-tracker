import create from "zustand";
import { v4 as uuidv4 } from "uuid";

const useStore = create((set) => ({
  projects: [],
  activeProject: null,
  beingEditProject: null,
  setProjects: (projects) => set({ projects }),
  addProject: (name) =>
    set((state) => ({
      projects: [
        ...state.projects,
        {
          id: uuidv4(),
          name,
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
}));

export default useStore;
