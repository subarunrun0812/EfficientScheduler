'use client';

import FullCalendar from "@fullcalendar/react";
import { Box, Button } from "@yamada-ui/react";
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

export default function Home() {
  return (
    <Box>
      <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />
    </Box>
  );
}
