import React, { useState, useEffect } from "react";
import useStore from "../Store/Store";
import { Box, HStack, Text, Button, Heading } from "@chakra-ui/react";

function Project(props) {
  const { project } = props;
  console.log(JSON.stringify(project));
  const updateProject = useStore((state) => state.updateProject);
  const activeProject = useStore((state) => state.activeProject);
  const setActiveProject = useStore((state) => state.setActiveProject);
  const setBeingEditProject = useStore((state) => state.setBeingEditProject);

  const [sessionTime, setSessionTime] = useState(0);

  function handleEdit() {
    setBeingEditProject(project);
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
    <div>
      <HStack flexWrap="wrap" maxW="400px" m={(15, 10)}>
        <Box>
          <Text fontSize="sm">Project Name:</Text>
          <Text fontSize="3xl">{project.name}</Text>

          {/* <Text>OrderedBy</Text>
        <Text>{orderedBy}</Text> */}

          <Text>Time:</Text>
          <Heading as="h1">
            {msToTime(
              project.isRunning ? project.time + sessionTime : project.time
            )}
          </Heading>
        </Box>
        <Box alignSelf="start">
          <Button onClick={handleStartStop} width="100%" size="lg">
            {project.isRunning ? "STOP" : "START"}
          </Button>
          <Button onClick={handleEdit} width="100%" size="lg">
            EDIT TIME
          </Button>
        </Box>
      </HStack>
    </div>
  );
}

export default Project;
