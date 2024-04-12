"use client";

import { useEffect, useState } from "react";
import { Channel as StreamChannel, User } from "stream-chat";
import {
  Channel,
  Chat,
  MessageInput,
  MessageList,
  Window,
  useChannelStateContext,
} from "stream-chat-react";
import { IconButton, Icon } from "@stream-io/video-react-sdk";
import "stream-chat-react/dist/css/v2/index.css";

export const NoMessages = () => {
  const { messages } = useChannelStateContext();

  if (messages?.length === 0) {
    return (
      <div className="rd__chat__no-messages">
        <svg
          className="rd__chat__no-messages__icon"
          width="43"
          height="42"
          viewBox="0 0 43 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="try">
            <path
              id="Vector"
              d="M35.5 4.73024H7.5C5.575 4.73024 4 6.30524 4 8.23024V35.5127C4 37.0702 5.89 37.8577 6.9925 36.7552L11 32.7302H35.5C37.425 32.7302 39 31.1552 39 29.2302V8.23024C39 6.30524 37.425 4.73024 35.5 4.73024ZM24.2475 21.4777L22.2875 25.7477C21.9725 26.4302 21.01 26.4302 20.695 25.7477L18.735 21.4777L14.465 19.5177C13.7825 19.2027 13.7825 18.2402 14.465 17.9252L18.735 15.9652L20.695 11.6952C21.01 11.0127 21.9725 11.0127 22.2875 11.6952L24.2475 15.9652L28.5175 17.9252C29.2 18.2402 29.2 19.2027 28.5175 19.5177L24.2475 21.4777Z"
              fill="#B0B4B7"
            />
          </g>
        </svg>

        <p className="rd__chat__no-messages__title">Start chatting!</p>
        <p className="rd__chat__no-messages__description">
          Let’s get this chat started, why not send the first message?
        </p>
      </div>
    );
  }
  return null;
};

const ChatStream = ({ onClose, channelId, chatClient }: { onClose: any, channelId: any, chatClient : any}) => {

  const [channel, setChannel] = useState<StreamChannel>();
  useEffect(() => {
    if (!chatClient) return;

    const spaceChannel = chatClient.channel("livestream", channelId);

    setChannel(spaceChannel);
  }, [chatClient]);

  if (!chatClient) return null;

  return (
    <Chat client={chatClient} theme="str-chat__theme-dark">
      <Channel EmptyStateIndicator={NoMessages} channel={channel}>
        <Window>
          <div className="rd__chat-wrapper">
            <div className="rd__chat-header">
              <h2 className="rd__chat-header__title">Chat</h2>
              <IconButton
                className="rd__chat-header__icon"
                onClick={onClose}
                icon="close"
              />
            </div>
          </div>
          <MessageList />
          <MessageInput
            focus
            additionalTextareaProps={{ placeholder: "Send a message" }}
          />
        </Window>
      </Channel>
    </Chat>
  );
};

export default ChatStream;
