import { SimpleGrid } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Schedule } from "./Schedule";

interface ScheduleListProps {
  width?: string | number;
  schedules: Schedule[];
}


export const ScheduleList = ({ width, schedules }: ScheduleListProps) => {

  const boxHeight = "100px";
  return (
    <SimpleGrid columns={1} spacing={2} overflow="auto" width={width} maxH="600">
      <Box bg="red" height={boxHeight}></Box>
      <Box bg="blue" height={boxHeight}></Box>
      <Box bg="green" height={boxHeight}></Box>
      <Box bg="yellow" height={boxHeight}></Box>
      <Box bg="purple" height={boxHeight}></Box>
      <Box bg="orange" height={boxHeight}></Box>
      <Box bg="pink" height={boxHeight}></Box>
      <Box bg="gray" height={boxHeight}></Box>
      <Box bg="teal" height={boxHeight}></Box>
      <Box bg="cyan" height={boxHeight}></Box>
    </SimpleGrid>
  );
};
