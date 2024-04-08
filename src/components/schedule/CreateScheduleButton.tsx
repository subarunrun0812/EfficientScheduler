import { Text } from "@chakra-ui/react"
import { Box, Button, useBreakpointValue } from "@yamada-ui/react"

interface CreateScheduleButtonProps {
    width?: string | number
}


export const CreateScheduleButton = ({ width }: CreateScheduleButtonProps) => {

    return (
        <Box
            sx={{
                width: width, // Boxの幅を指定
                display: 'flex', // flexboxレイアウトを適用
                margin: 'auto 20%', // 左右に等しい余白を設定
            }}
        >
            <Button
                colorScheme='cyan.50' // 配色
                variant='outline' // ボタンのスタイル。枠線のみ
                w='100%'
                onClick={() => {
                    alert("作成ページに遷移する")
                }}
            >
                決定
            </Button>
        </Box>
    )
};