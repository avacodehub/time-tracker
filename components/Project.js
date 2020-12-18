import React, { useState, useEffect } from "react";
import useStore from "../Store/Store";
import {
  Box,
  Flex,
  Text,
  Button,
  Heading,
  ButtonGroup,
} from "@chakra-ui/react";

function Project(props) {
  const { project } = props;
  console.log(JSON.stringify(project));
  const updateProject = useStore((state) => state.updateProject);
  const deleteProject = useStore((state) => state.deleteProject);
  const activeProject = useStore((state) => state.activeProject);
  const setActiveProject = useStore((state) => state.setActiveProject);
  const setBeingEditProject = useStore((state) => state.setBeingEditProject);

  const [sessionTime, setSessionTime] = useState(0);

  function handleEdit() {
    setBeingEditProject(project);
  }

  function handleDelete() {
    deleteProject(project);
  }

  function handleStartStop() {
    if (project.isRunning) {
      const newTime = project.time + (Date.now() - project.sessionStarted);
      const newProject = { ...project };
      newProject.isRunning = false;
      newProject.time = newTime;
      updateProject(newProject);
      setActiveProject(null);
      setSessionTime(0);
    } else {
      if (activeProject) {
        if (!confirm("Do you want to change active project?")) return;
      }
      const savingActiveProject = { ...activeProject };
      savingActiveProject.time =
        savingActiveProject.time +
        (Date.now() - savingActiveProject.sessionStarted);
      savingActiveProject.isRunning = false;
      updateProject(savingActiveProject);
      setSessionTime(0);

      const newProject = { ...project };
      newProject.sessionStarted = Date.now();
      newProject.isRunning = true;
      updateProject(newProject);
      setActiveProject(newProject);
    }
  }

  useEffect(() => {
    let localInterval;
    if (project.isRunning) {
      localInterval = setInterval(
        () => setSessionTime(Date.now() - project.sessionStarted),
        1000
      );
    } else {
      clearInterval(localInterval);
    }
    return () => {
      clearInterval(localInterval);
    };
  }, [project.isRunning]);

  function msToTime(duration) {
    var seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
  }

  return (
    <div className="card">
      <Box>
        <Text fontSize="sm">Project Name:</Text>
        <Heading fontSize="3xl">{project.name}</Heading>

        {/* <Text>OrderedBy</Text>
        <Text>{orderedBy}</Text> */}

        <Text mt={4}>Time:</Text>
        <Heading as="h1">
          {msToTime(
            project.isRunning ? project.time + sessionTime : project.time
          )}
        </Heading>
      </Box>
      <Flex mt={4} justifyContent="space-between">
        <Button size="sm" colorScheme={project.isRunning ? "red" : "teal"} onClick={handleStartStop}>
          {project.isRunning ? "STOP" : "START"}
        </Button>
        <ButtonGroup size="sm" isAttached variant="outline">
          <Button onClick={handleEdit}>EDIT TIME</Button>
          <Button onClick={handleDelete}>DELETE</Button>
        </ButtonGroup>
      </Flex>
    </div>
  );
}

export default Project;
