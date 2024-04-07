import { SimpleGrid, Box, Text, Divider } from "@chakra-ui/react";
import { Schedule } from "./Schedule";
import { Center } from "@yamada-ui/react";


interface ScheduleListProps {
  width?: string | number;
  schedules: Schedule[];
}

export const ScheduleList = ({ width, schedules }: ScheduleListProps) => {
  // 仮候補日程を作成した日付を降順にソートする関数
  const sortSchedulesByDate = (schedules: Schedule[]) => {
    return schedules.slice().sort((a, b) => a.date - b.date);
  };

  const sortedSchedules = sortSchedulesByDate(schedules);


  const renderScheduleItem = (schedule: Schedule) => {
    return (
      <Box
        key={schedule.id}
        bg="#EDFDFD"
        height={"100px"}
        textAlign="center"
        cursor="pointer"
        _hover={{ bg: "#C4F1F9" }}
        //TODO: リンク先のページに遷移する
        onClick={() => alert("遷移先のページに遷移する")}
      >
        <Text fontSize="2xl">{schedule.description}</Text>
        <Text>仮候補日程を作成した日 <br />{schedule.date}</Text>
      </Box>
    );
  };

  return (
    <Box
      border="2px solid #086F83"
      padding="10px"
      width={width}
      borderRadius="30px"
      borderWidth="3px" // Increase the border width to make it thicker
    >
      <Text fontSize="3xl" textAlign="center">調整中の予定一覧</Text>
      <Divider border="1.5px solid #086F83" margin="10px 0" />
      <SimpleGrid
        columns={1}
        spacing={2}
        overflow="auto"
        maxH="600"
        padding="10px"
      >
        {sortedSchedules.map(renderScheduleItem)}
      </SimpleGrid>
    </Box >
  );
};
