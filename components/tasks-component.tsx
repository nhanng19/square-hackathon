import Link from "next/link";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import OAuthLoadingScreen from "./oauth-loading-screen";

export const WelcomeToSquare = (
  firstName: string | undefined,
  lastName: string | undefined
) => {
  return {
    title: `Welcome to Square Edge, ${firstName} ${lastName}! 🎉`,
    description:
      "In order to start using Square Edge, we need data from Square.",
  };
};

export const ConnectToSquare = () => {
  return {
    title: "Connect to Square",
    description: "Connect your account to Square to get started.",
    actions: [
      {
        component: () => (
          <Link href={"/settings"}>
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="40" height="40" rx="20" fill="#3b82f6" />
              <line
                x1="12"
                y1="20"
                x2="26"
                y2="20"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M22 14L28 20L22 26"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        ),
      },
    ],
  };
};

export const ConnectedToSquare = () => {
  return {
    title: "Connected to Square",
    description: "Your account has been successfully connected to Square.",
    actions: [
      {
        component: () => (
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="20" cy="20" r="20" fill="#00B23B" />
            <path
              d="M13.0557 21.9445L17.2223 26.389L26.9446 14.1667"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ),
      },
    ],
  };
};

export const OAuthSquare = () => {
  return {
    title: "Connnect to your Square Account",
    description:
      "Securely connect your Square Online account with Square Edge! Once connected, all of your items will be directly available for virtual sales.",
    actions: [
      {
        component: () => (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default">Connect Square</Button>
            </DialogTrigger>
            <DialogContent className="min-w-full !h-screen">
              <OAuthLoadingScreen url={"/api/square/auth_url"} />
            </DialogContent>
          </Dialog>
        ),
      },
    ],
  };
};

export const OAuthComplete = (revokeUserAccess: () => void) => {
  return {
    title: "Deauthorize Square",
    description: "Deauthorize your Square account with Square Edge.",
    actions: [
      {
        component: () => <Button variant="destructive" onClick={revokeUserAccess}>Deauthorize</Button>,
      },
    ],
  };
};
