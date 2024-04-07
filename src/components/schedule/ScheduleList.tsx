import { SimpleGrid } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Schedule } from "./Schedule";
import { Text } from "@chakra-ui/react";

interface ScheduleListProps {
  width?: string | number;
  schedules: Schedule[];
}

export const ScheduleList = ({ width, schedules }: ScheduleListProps) => {
  // 日付降順にソートする関数
  const sortSchedulesByDate = (schedules: Schedule[]) => {
    return schedules.slice().sort((a, b) => a.date - b.date);
  }

  // ソートしたschedulesを使う

  const sortedSchedules = sortSchedulesByDate(schedules);

  const boxHeight = "100px";
  return (
    <SimpleGrid columns={1} spacing={2} overflow="auto" width={width} maxH="600">
      {sortedSchedules.map(schedule => (
        <Box key={schedule.id} bg="red" height={boxHeight}>
          <Text>{schedule.date}</Text>
          <Text>{schedule.description}</Text>
        </Box>
      ))}
    </SimpleGrid>
  );
};