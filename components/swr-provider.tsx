"use client";
import { SWRConfig } from "swr";
import fetchJson from "@/lib/fetchson";
import { PropsWithChildren } from "react";

export const SWRProvider = ({ children } : PropsWithChildren) => {
  return (
    <SWRConfig
      value={{
        fetcher: fetchJson,
        onError: (err) => {
          console.error(err);
        },
      }}
    >
      {children}
    </SWRConfig>
  );
};
