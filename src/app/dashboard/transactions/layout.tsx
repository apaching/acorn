import { ReactNode } from "react";
import { FormStateProvider } from "./form-state-provider";
import React from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <FormStateProvider>
      <React.Fragment>{children}</React.Fragment>
    </FormStateProvider>
  );
}
