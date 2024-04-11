"use client";
import { SWRConfig } from "swr";
import fetchJson from "@/lib/fetchson";

export const SWRProvider = ({ children }) => {
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
