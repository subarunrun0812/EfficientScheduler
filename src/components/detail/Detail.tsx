'use client';
import { Button, VStack, Box, Text, Divider, Heading, Flex } from "@chakra-ui/react";
import { Schedule } from "../schedule/Structure";
import { CandidateSchedule, CandidateSchedulesTemplate } from "../schedule/CandidateSchedulesTemplate";
import { SelectSchedule } from "../schedule/SelectSchedule";
import { ChangeEvent, useState } from "react";



interface ScheduleDetailProps {
    schedule: Schedule;
    candidateSchedules: CandidateSchedule[]
}

// 日付をパースして年月日を表示する関数
export function formatDate(dateString: number) {
    const year = dateString.toString().substring(0, 4);
    const month = dateString.toString().substring(4, 6);
    const day = dateString.toString().substring(6, 8);
    return `${year}年${month}月${day}日`;
}


function ScheduleItem({ label, value }: { label: string, value: string }) {
    return (
        <Box marginY={4}>
            <Text fontWeight="bold" fontSize="xl">{label}</Text>
            <Text fontSize="xl">{value}</Text>
        </Box>
    );
}

export const ScheduleDetail = ({ schedule, candidateSchedules }: ScheduleDetailProps) => {
    // 選択した要素取得する一連の流れ
    const [selectedValues, setSelectedValues] = useState<string[]>([])

    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        const isChecked = event.target.checked

        if (isChecked) {
            setSelectedValues([...selectedValues, value])
        } else {
            setSelectedValues(selectedValues.filter((item) => item !== value))
        }
    }
    return (
        <Box mt={10} mb={4} >
            <Flex direction="column" align="center" justify="center" textAlign="center" color="gray.700" mt={10}>
                <Heading as="h1" size="xl" color="gray.700">
                    調整中の予定
                </Heading>
                <VStack mt={10} spacing={8} w="40%" >
                    <ScheduleItem label="タイトル" value={schedule.title} />
                    <ScheduleItem label="説明" value={schedule.description} />
                    <ScheduleItem label="作成日時" value={formatDate(schedule.date)} />
                    {/* TODO:仮日程候補を選択するためのコンポーネントを追加 */}
                    {candidateSchedules.map((schedule) => (
                        <SelectSchedule
                            key={schedule.id}
                            id={schedule.id}
                            title={schedule.title}
                            date={schedule.date}
                            startTime={schedule.startTime}
                            endTime={schedule.endTime}
                            handleCheckboxChange={handleCheckboxChange}
                        />
                    ))}
                </VStack>
                {/* TODO:予定の削除ボタンを追加 or 確認ボタンを追加 */}
                <Button
                    mt={10}
                    colorScheme="cyan"   // 配色
                    variant="outline"    // ボタンのスタイル。枠線のみ
                    size="lg"            // ボタンのサイズ
                    w="50%"             // 幅をいっぱいに
                    onClick={() => {
                        alert("done");
                    }}
                    isDisabled={selectedValues.length !== 1}
                >
                    決定
                </Button>

            </Flex>
        </Box>
    );
};

