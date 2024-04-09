import { Box, Button, Heading, useBreakpointValue } from "@chakra-ui/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface CreateScheduleButtonProps {
    width?: string | number
    height?: string | number
}


export const CreateScheduleButton = ({ width, height }: CreateScheduleButtonProps) => {

    return (
        <Box
            sx={{
                width: width, // Boxの幅を指定
                display: 'flex', // flexboxレイアウトを適用
                justifyContent: 'center', // 水平方向に中央寄せ
                alignItems: 'center', // 垂直方向に中央寄せ
                margin: '10% 20%', // 左右に等しい余白を設定
            }}
        >
            <Heading>
                <FontAwesomeIcon icon="calendar-days" size="lg" />
                <Button
                    mt={10}
                    // cyan.300
                    colorScheme='cyan'
                    variant='solid'
                    borderRadius="10px"
                    size='lg' // ボタンのサイズ
                    w='100%' // 幅をいっぱいに
                    color='white' // テキストの色を白に設定
                    height={height}
                    onClick={() => {
                        // 予定フォームに遷移する
                        alert("予定フォームに遷移する")
                    }}>
                    <Heading as='h2' size='xl'>
                        予定候補日の作成
                    </Heading>
                </Button>
            </Heading>
        </Box >
    )
};