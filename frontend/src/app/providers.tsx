import { UIProvider } from "@yamada-ui/react";
import { ChakraProvider } from "@chakra-ui/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UIProvider>
      <ChakraProvider>{children}</ChakraProvider>
    </UIProvider>
  );
}
