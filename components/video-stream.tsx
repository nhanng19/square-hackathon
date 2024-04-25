"use client";

import clsx from "clsx";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import {
  Call,
  CallParticipantsList,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  User,
  LivestreamLayout,
  CompositeButton,
  Icon,
  RecordingInProgressNotification,
  RecordCallConfirmationButton,
  CallRecording,
} from "@stream-io/video-react-sdk";
import {
  CancelCallButton,
  SpeakingWhileMutedNotification,
  ToggleAudioPublishingButton,
  ToggleVideoPublishingButton,
  ScreenShareButton,
  ReactionsButton,
  RecordCallButton,
} from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import ChatStream from "./chat-stream";
import { NewMessageNotification } from "./new-message-notification";
import { BasicUserData, SidebarContent } from "@/types";
import { DefaultGenerics, OwnUserResponse, StreamChat } from "stream-chat";
import { toast } from "sonner";
import fetchJson from "@/lib/fetchson";
import LoadingScreen from "./loading-screen";
import ProductBar from "./product-bar";
import RecordingStream from "./recordings-stream";

interface Props {
  roomId: string;
  host: boolean;
  videoClient: StreamVideoClient | null;
  call: Call | null;
  chatClient: StreamChat | undefined;
  userData: BasicUserData | undefined
}

export function VideoStream({
  roomId,
  host,
  videoClient,
  call,
  chatClient,
  userData,
}: Props) {
  const [sidebarContent, setSidebarContent] = useState<SidebarContent>(null);
  const [recordings, setRecordings] = useState<CallRecording[] | undefined>();
  const showSidebar = sidebarContent != null;
  const showParticipants = sidebarContent === "participants";
  const showChat = sidebarContent === "chat";
  const showRecordings = sidebarContent  === "recordings" ;

  const handleLeaveCall = async () => {
    if (!host) return;
    try {
      const data = await fetchJson(`/api/rooms/delete_room/${roomId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      return toast.error(`${error}`);
    } finally {
      window.close();
    }
  };

  const retrieveRecording = async () => {
    try {
      const data = await call?.queryRecordings();
      setRecordings(data?.recordings);
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  useEffect(() => {
    retrieveRecording();
  }, [call, videoClient, chatClient]);

  return videoClient && call ? (
    <StreamVideo client={videoClient}>
      <StreamTheme>
        <StreamCall call={call}>
          <div className="rd__call">
            <div className="rd__main-call-panel">
              <div className="rd__call-header rd__call-header--active flex !justify-center items-center">
                <div className="rd__call-header__controls-group">
                  <div className="rd__header__elapsed">
                    <span className="str-video__icon str-video__icon--verified rd__header__elapsed-icon"></span>
                    <div className="rd__header__elapsed-time">01:28:21</div>
                  </div>
                  <div className="rd__header__latency">
                    <div className="rd__header__latency-indicator"></div>0 ms
                  </div>
                </div>
              </div>
              <div className="rd__layout">
                <div className="rd__layout__stage-container">
                  <LivestreamLayout muted={true} />
                  <ProductBar roomId={roomId} />
                </div>
                <div
                  className={clsx(
                    "rd__sidebar",
                    showSidebar && "rd__sidebar--open"
                  )}
                >
                  {showSidebar && (
                    <div className="rd__sidebar__container">
                      {showRecordings && host && (
                        <div className="str-video__chat">
                          <RecordingStream
                            onClose={() => setSidebarContent(null)}
                            roomId={roomId}
                            userId={userData?.userId}
                            recordings={recordings}
                          />
                        </div>
                      )}
                      {showParticipants && (
                        <div className="rd__participants">
                          <CallParticipantsList
                            onClose={() => setSidebarContent(null)}
                          />
                        </div>
                      )}
                      {showChat && (
                        <div className="str-video__chat">
                          <ChatStream
                            chatClient={chatClient}
                            channelId={roomId}
                            onClose={() => {
                              setSidebarContent(null);
                            }}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="rd__notifications">
                <RecordingInProgressNotification />
                <SpeakingWhileMutedNotification />
              </div>
            </div>
          </div>
          <div className="flex center gap-2 items-center justify-between py-[8px] px-[12px] bg-[#101213] w-full rounded-full">
            <div className="flex center gap-2 items-center justify-start flex-1">
              <ScreenShareButton />
            </div>
            <div className="flex center gap-2 items-center justify-center flex-1">
              <RecordCallConfirmationButton />
              <ScreenShareButton />
              <ReactionsButton />
              <ToggleAudioPublishingButton />
              <ToggleVideoPublishingButton />
              <CancelCallButton onClick={handleLeaveCall} />
            </div>
            <div className="flex center gap-2 items-center justify-end flex-1">
              <CompositeButton
                active={showRecordings}
                title="Participants"
                onClick={() => {
                  setSidebarContent(showRecordings ? null : "recordings");
                }}
              >
                <Icon icon="film-roll" />
              </CompositeButton>
              <CompositeButton
                active={showParticipants}
                title="Participants"
                onClick={() => {
                  setSidebarContent(showParticipants ? null : "participants");
                }}
              >
                <Icon icon="participants" />
              </CompositeButton>
              <NewMessageNotification
                chatClient={chatClient}
                disableOnChatOpen={showChat}
              >
                <div className="str-chat__chat-button__wrapper">
                  <CompositeButton
                    active={showChat}
                    title="Chat"
                    onClick={() => {
                      setSidebarContent(showChat ? null : "chat");
                    }}
                  >
                    <Icon icon="chat" />
                  </CompositeButton>
                </div>
              </NewMessageNotification>
            </div>
          </div>
        </StreamCall>
      </StreamTheme>
    </StreamVideo>
  ) : (
    <div className="h-screen w-full">
      <LoadingScreen
        title={"Connecting you to Square Edge."}
        subtitle={"Just one moment..."}
      />
    </div>
  );
}
