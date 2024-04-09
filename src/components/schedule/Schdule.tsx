import { Box, Heading, Text } from "@chakra-ui/react";

export interface Schedule {
  id: number;
  title: string;
  date: string;
  description: string;
}

interface ScheduleProps {
  schedule: Schedule;
}

export const Schedule = ({ schedule }: ScheduleProps) => {
  return (
    <Box padding={4} borderWidth={1} borderRadius={8} width="100%">
      <Heading size="md">{schedule.title}</Heading>
      <Text>{schedule.date}</Text>
      <Text>{schedule.description}</Text>
    </Box>
  );
};