export interface Schedule {
  id: number;
  title: string;
  date: number; // 仮候補日程を作成した日付
  description: string;
}

export interface ScheduleListProps {
  width?: string | number;
  schedules: Schedule[];
}
