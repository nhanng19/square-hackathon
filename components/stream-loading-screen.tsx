"use client";

import { useEffect, useState } from "react";
import Logo from "./svg/logo";
import { createRoom } from "@/lib/actions/room.action";
import { encodeRoomId } from "@/utils/helpers";
import { toast } from "sonner";
import { Button } from "./ui/button";

interface Props {
  userId: string;
  productName: string;
  catalogId: string;
}

const StreamLoadingScreen = ({
  userId,
  productName,
  catalogId
}: Props) => {
  let previousWindow = null;

  const handleOpenStream = async () => {
    try {
      const roomId = encodeRoomId(productName);
      await createRoom({
        userId,
        roomId,
        catalogId,
        activeUsers: 0,
      });
      const newWindowFeatures = "left=100,top=100";
      const roomUrl = `${
        process.env.NEXT_PUBLIC_ENVIRONMENT === "production"
          ? process.env.NEXT_PUBLIC_PRODUCTION_BASE_URL
          : process.env.NEXT_PUBLIC_DEVELOPMENT_BASE_URL
      }/video/${roomId}?host=true`;
      previousWindow = window.open(roomUrl, "_blank", newWindowFeatures);
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  useEffect(() => {
    handleOpenStream();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-4">
      <div className="flex flex-col items-center">
        <Logo />
      </div>
      <div className="flex flex-col justify-center items-center gap-4">
        <h1 className="font-light">
          Your livestream has been launched in the SquareEdge browser.
        </h1>
        <span className="font-normal">Don't see your meeting?</span>
        <Button variant="default" onClick={handleOpenStream}>
          Start livestream
        </Button>
      </div>
    </div>
  );
};

export default StreamLoadingScreen;
