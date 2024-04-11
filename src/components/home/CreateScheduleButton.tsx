import { Box, Button, Heading, useBreakpointValue } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

interface CreateScheduleButtonProps {
  width?: string | number
  height?: string | number
}

export const CreateScheduleButton = ({
  width,
  height,
}: CreateScheduleButtonProps) => {
  const router = useRouter()
  const handleButtonClick = () => {
    // 予定フォームに遷移
    router.push('/form')
  }
  return (
    <Box
      width={width}
      display='flex' // flexboxレイアウトを適用
      justifyContent='center' // 水平方向に中央寄せ
      alignItems='center' // 垂直方向に中央寄せ
      mb={4}
    >
      <Button
        // cyan.300
        colorScheme='cyan'
        variant='solid'
        borderRadius='10px'
        size='lg' // ボタンのサイズ
        w='100%' // 幅をいっぱいに
        color='white' // テキストの色を白に設定
        height={height}
        onClick={handleButtonClick}
        fontSize={{ base: 'lg', md: 'xl' , lg: '2xl'}}
      >
        予定候補日の作成
      </Button>
    </Box>
  )
}
