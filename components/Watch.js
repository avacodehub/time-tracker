import React from "react";
import useStore from "../Store/Store";
import { Box, HStack, Text, Button, Heading } from "@chakra-ui/react";

function Watch(props) {
  const { watch } = props;

  const fetchWatch = useStore((state) => state.fetchWatch);
  const deleteWatch = useStore((state) => state.deleteWatch);

  async function handleSync() {
    await fetchWatch(watch);
  }

  function handleDelete() {
    deleteWatch(watch)
  }

  return (
    <div>
      <HStack flexWrap="wrap" maxW="400px" m={(15, 10)}>
        <Box>
          <Text fontSize="sm">Project Name:</Text>
          <Text fontSize="3xl">{watch.name}</Text>

          <Text>Custom ID</Text>
          <Text>{watch.customId}</Text>

          <Text>Time:</Text>
          <Heading as="h1">{watch.time}</Heading>
        </Box>
        <Box alignSelf="start">
          <Button onClick={handleSync} size="lg">
            SYNC
          </Button>
          <Button onClick={handleDelete} size="lg">
            DELETE
          </Button>
        </Box>
      </HStack>
    </div>
  );
}

export default Watch;
