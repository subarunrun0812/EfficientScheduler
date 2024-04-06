import { VStack } from "@chakra-ui/react";
import { Schedule } from "./Schdule";

interface ScheduleListProps {
  width?: string | number;
  schedules: Schedule[];
}

export const ScheduleList = ({ width, schedules }: ScheduleListProps) => {
  return (
    <VStack w={width} gap={10} p={4}>
      {schedules.map((schedule) => (
        <Schedule key={schedule.id} schedule={schedule} />
      ))}
    </VStack>
  );
};
