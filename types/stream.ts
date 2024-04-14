
import { StreamChat, TokenOrProvider, User } from "stream-chat";
export type SidebarContent =
  | "participants"
  | "chat"
  | "stats"
  | "closed-captions"
  | null;

  export type UseClientOptions = {
    apiKey: string;
    user: User;
    tokenOrProvider: TokenOrProvider;
  };