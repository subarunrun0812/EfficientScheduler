"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Box, HStack, VStack, useBreakpointValue } from "@chakra-ui/react";
import { Schedule } from "../schedule/Schedule";
import { ScheduleList } from "../schedule/ScheduleList";

export const CalendarTemplate = () => {
  const breakpoint = useBreakpointValue(
    { base: "base", md: false },
    { ssr: true }
  );

  const scheduleList: Schedule[] = [
    {
      id: 1,
      title: "Meeting",
      date: "2023-09-01",
      description: "Meeting with the team",
    },
    {
      id: 2,
      title: "Interview",
      date: "2023-09-02",
      description: "Interview with the candidate",
    },
    {
      id: 3,
      title: "Lunch",
      date: "2023-09-03",
      description: "Lunch with the team",
    },
  ];
  return breakpoint ? (
    <VStack gap={4}>
      <ScheduleList width="100%" schedules={scheduleList} />
      <Box width="100%" padding={10}>
        <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />
      </Box>
    </VStack>
  ) : (
    <Box padding={10}>
      <HStack>
        <ScheduleList width="30%" schedules={scheduleList} />
        <Box width="70%">
          <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />
        </Box>
      </HStack>
    </Box>
  );
};
