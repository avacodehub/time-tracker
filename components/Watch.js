import React from "react";
import useStore from "../Store/Store";
import {
  Box,
  Flex,
  ButtonGroup,
  Text,
  Button,
  Heading,
} from "@chakra-ui/react";

function Watch(props) {
  const { watch } = props;

  const fetchWatch = useStore((state) => state.fetchWatch);
  const deleteWatch = useStore((state) => state.deleteWatch);

  async function handleSync() {
    await fetchWatch(watch);
  }

  function handleDelete() {
    deleteWatch(watch);
  }

  return (
    <div className="card">
      <Box>
        <Text fontSize="sm">ID:</Text>
        <Text fontSize="3xl">{watch.customId}</Text>

        <Flex flexDirection="row" alignItems="center">
          <Text fontSize="sm">Note: </Text>
          <Text fontSize="lg">{watch.name}</Text>
        </Flex>
        {/* <Text>Time:</Text> */}
        <Heading fontSize="3xl">{watch.time}</Heading>
      </Box>
      <ButtonGroup size="sm" mt={4} variant="outline">
        <Button colorScheme="blue" onClick={handleSync}>
          SYNC
        </Button>
        <Button colorScheme="red" onClick={handleDelete}>
          DELETE
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default Watch;
