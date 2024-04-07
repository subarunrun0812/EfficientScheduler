import { SimpleGrid } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Schedule } from "./Schedule";
import { Text } from "@chakra-ui/react";

interface ScheduleListProps {
  width?: string | number;
  schedules: Schedule[];
}

export const ScheduleList = ({ width, schedules }: ScheduleListProps) => {
  // 仮候補日程を作成した日付を降順にソートする関数
  const sortSchedulesByDate = (schedules: Schedule[]) => {
    return schedules.slice().sort((a, b) => a.date - b.date);
  }

  const sortedSchedules = sortSchedulesByDate(schedules);

  const boxHeight = "100px";
  return (
    <SimpleGrid columns={1} spacing={2} overflow="auto" width={width} maxH="600">
      {sortedSchedules.map(schedule => (
        <Box key={schedule.id} bg="gray.100" height={boxHeight} textAlign="center">
          <Text fontSize="2xl">{schedule.description}</Text>
          <Text>仮候補日程を作成した日</Text>
        </Box>
      ))}
    </SimpleGrid>
  );
};