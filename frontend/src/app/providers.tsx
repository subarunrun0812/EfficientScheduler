import { UIProvider } from "@yamada-ui/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return <UIProvider>{children}</UIProvider>;
}