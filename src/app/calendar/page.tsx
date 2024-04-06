import { Metadata } from "next";
import { CalendarTemplate } from "@/components/calendar/CalendarTemplate";

export const metadata: Metadata = {
  title: "Calendar",
};

export default function CalendarPage() {
  return <CalendarTemplate />;
}
