import {
  Button,
  Center,
  HStack,
  Heading,
  Image,
  VStack,
} from "@chakra-ui/react";

export const TopTemplate = () => {

  return (
    <Center h="100vh" padding={0} w="40%" bg="cyan.300">
      <VStack>
        <Heading>Calendar</Heading>
        <HStack>
          <Image src="/icon1.webp"// Use the converted string variable
            width="100%"
            height="100%"
            objectFit="fill" />
        </HStack>
      </VStack>
    </Center>
  );
};


/*
contain: 画像の縦横比を維持しながら、枠内に収まる最大のサイズで表示します。
cover: 画像の縦横比を維持しながら、枠いっぱいに表示します。必要に応じて、画像の一部が切り取られます。
fill: 画像を枠いっぱいに引き伸ばして表示します。画像の縦横比は維持されません。
none: 画像の元のサイズで表示します。枠からはみ出る場合は、スクロールバーが表示されます。
scale-down: 画像の縦横比を維持しながら、枠内に収まる最小のサイズで表示します。
*/