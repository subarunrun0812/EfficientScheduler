'use client';
import { Button, VStack, Box, Text, Divider, Heading, Flex } from "@chakra-ui/react";
import { Schedule } from "../schedule/Structure";


interface ScheduleDetailProps {
    schedule: Schedule;
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

export const ScheduleDetail = ({ schedule }: ScheduleDetailProps) => {
    return (
        <Box mt={10} mb={4} >
            <Flex direction="column" align="center" justify="center" textAlign="center" color="gray.700" mt={10}>
                <Heading as="h1" size="xl" color="gray.700">
                    予定の詳細
                </Heading>
                <VStack mt={10} spacing={8}>
                    <ScheduleItem label="タイトル" value={schedule.title} />
                    <ScheduleItem label="説明" value={schedule.description} />
                    <ScheduleItem label="作成日時" value={formatDate(schedule.date)} />
                    {/* TODO:仮日程候補を選択するためのコンポーネントを追加 */}
                </VStack>
                {/* TODO:予定の削除ボタンを追加 or 確認ボタンを追加 */}
                <Button
                    colorScheme="cyan"   // 配色
                    variant="outline"    // ボタンのスタイル。枠線のみ
                    size="lg"            // ボタンのサイズ
                    w="50%"             // 幅をいっぱいに
                    onClick={() => {
                        alert("done");
                    }}
                >
                    決定
                </Button>

            </Flex>
        </Box>
    );
};

