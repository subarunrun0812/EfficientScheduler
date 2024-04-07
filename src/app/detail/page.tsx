import { ScheduleDetail } from "@/components/detail/Detail";
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
    return <ScheduleDetail schedule={scheduleList} />;
}
