import React, { useState, useEffect } from "react";
import useStore from "../Store/Store";
import {
  Box,
  Flex,
  Text,
  Button,
  IconButton,
  Heading,
  ButtonGroup,
} from "@chakra-ui/react";
import {  EditIcon, DeleteIcon } from '@chakra-ui/icons'

function Project(props) {
  const { project } = props;
  console.log(JSON.stringify(project));
  const updateProject = useStore((state) => state.updateProject);
  const deleteProject = useStore((state) => state.deleteProject);
  const activeProject = useStore((state) => state.activeProject);
  const setActiveProject = useStore((state) => state.setActiveProject);
  const setBeingEditProject = useStore((state) => state.setBeingEditProject);

  const [sessionTime, setSessionTime] = useState(0);
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };

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
      <Box  onClick={handleEdit}>
        <Heading fontSize="xl">{project.name}</Heading>

        {/* <Text>OrderedBy</Text>
        <Text>{orderedBy}</Text> */}

        <Text mt={4}>Time:</Text>
        <Heading fontSize="4xl" as="h1">
          {msToTime(
            project.isRunning ? project.time + sessionTime : project.time
          )}
        </Heading>
        <Text mt={2}>Date created:</Text>
        <Heading fontSize="md">
          {new Date(project.dateCreated).toLocaleDateString("en-GB",dateOptions)}
        </Heading>
      </Box>
      <Flex mt={4} justifyContent="space-between">
        <Button size="sm" colorScheme={project.isRunning ? "red" : "purple"} onClick={handleStartStop}>
          {project.isRunning ? "STOP" : "START"}
        </Button>
        <ButtonGroup size="sm" isAttached variant="outline">
          <IconButton title="Manage project" onClick={handleEdit} icon={<EditIcon />} />
          <IconButton title="Delete project" onClick={handleDelete} icon={<DeleteIcon />} />
        </ButtonGroup>
      </Flex>
    </div>
  );
}

export default Project;
