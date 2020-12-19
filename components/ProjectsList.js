import { Text, Button, Input } from "@chakra-ui/react";
import React, { useState, useRef, useEffect } from "react";
import Project from "./Project";
import useStore from "../Store/Store";
import EditTime from "./EditTIme";
import NewProject from "./NewProject";

const LOCAL_STORAGE_KEY_PROJECTS = "0projecttracker_projects";
const LOCAL_STORAGE_KEY_ACTIVE = "0projecttracker_active";

function ProjectsList() {
  const projects = useStore((state) => state.projects);
  const activeProject = useStore((state) => state.activeProject);
  const setActiveProject = useStore((state) => state.setActiveProject);
  const updateProject = useStore((state) => state.updateProject);
  const setIsVisible_NewProject = useStore((state) => state.setIsVisible_NewProject);
  const setProjects = useStore((state) => state.setProjects);

  useEffect(() => {
    const localProjects = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY_PROJECTS)
    );
    if (localProjects) setProjects(localProjects);

    const localActive = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY_ACTIVE)
    );
    if (localActive) setActiveProject(localActive);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_PROJECTS, JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY_ACTIVE,
      JSON.stringify(activeProject)
    );
  }, [activeProject]);

  const handleNewProject = () => {
    setIsVisible_NewProject(true)
  };

  return (
    <>
      <div className="tools">
        <Button onClick={handleNewProject}>Create new</Button>
      </div>
      <section className="projectsGrid">
        {projects.length > 0
          ? projects.map((p) => {
              if (p) return <Project key={p.id} project={p} />;
            })
          : null}
      </section>
      <NewProject />
      <EditTime />
    </>
  );
}

export default ProjectsList;
