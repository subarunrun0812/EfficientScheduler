import { Container, Flex, Heading } from "@chakra-ui/react";
import { HomeTemplate } from "./components/home/HomeTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default function HomePage() {
  return <HomeTemplate />;
}
