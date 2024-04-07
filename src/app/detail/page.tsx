import { ScheduleDetail } from "@/components/detail/Detail";
import { CandidateSchedule } from "@/components/schedule/CandidateSchedulesTemplate";
import { Schedule } from "@/components/schedule/Structure";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Schedule Detail",
};


export default function DetailPage() {
    // 仮のスケジュールデータを作成
    const scheduleList: Schedule =
    {
        id: 0,
        title: "仮データ",
        date: 20230931,
        description: "仮の説明",
    };
    const candidateSchedules: CandidateSchedule[] = [
        {
            id: '1',
            title: '面談',
            date: '2022-01-01',
            startTime: '10:00',
            endTime: '12:00',
        },
        {
            id: '2',
            title: '面談',
            date: '2022-01-02',
            startTime: '10:00',
            endTime: '12:00',
        },
        {
            id: '3',
            title: '面談',
            date: '2022-01-02',
            startTime: '10:00',
            endTime: '12:00',
        },
        {
            id: '4',
            title: '面談',
            date: '2022-01-02',
            startTime: '10:00',
            endTime: '12:00',
        },]
    return <ScheduleDetail schedule={scheduleList} candidateSchedules={candidateSchedules} />;
}
