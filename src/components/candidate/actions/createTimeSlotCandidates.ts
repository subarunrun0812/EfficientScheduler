"use server";

import { createClient } from "@/utils/supabase/server";
import { CreateTimeSlotCandidatesInput } from "@/backend/application/createTimeSlotCandidates/types";
import { CreateTimeSlotCandidatesInteractor } from "@/backend/application/createTimeSlotCandidates/interactor";
import { EventRepository } from "@/backend/infrastructure/dbPrismaSupabase/repository/eventRepository";
import { GoogleCalendarServiceFactory } from "@/backend/infrastructure/apiGoogleCalendar/factory";
import { SuggestTimeSlotsService } from "@/backend/domain/service/suggestTimeSlots/suggestTimeSlots";
import { EventDataQueryParams } from "@/components/form/FormTemplate";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { TimeSlotData } from "./registerEvent";

dayjs.extend(customParseFormat);

export const createTimeSlotCandidates = async (
  eventData: EventDataQueryParams,
): Promise<TimeSlotData[]> => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("user not found");
  }

  const input: CreateTimeSlotCandidatesInput = {
    userId: user.id,
    startDateTime: dayjs(eventData.startDateTime, "HH:mm"),
    endDateTime: dayjs(eventData.endDateTime, "HH:mm"),
    duration: dayjs.duration(parseInt(eventData.duration), "minutes"),
    bufferDuration: dayjs.duration(0),
    suggestionPeriod: {
      startTime: dayjs(),
      endTime: dayjs().add(1, "month"),
    },
    maxSuggestions: 8,
  };

  const interactor = new CreateTimeSlotCandidatesInteractor(
    new EventRepository(),
    await new GoogleCalendarServiceFactory().create(),
    new SuggestTimeSlotsService(),
  );
  const res = await interactor.execute(input);

  return res.map((ts): TimeSlotData => {
    return {
      id: ts.id,
      startDate: ts.startDateTime.toString(),
      endDate: ts.endDateTime.toString(),
    };
  });
};
