"use server"

import Room  from "../models/room.model";
import { connectToDB } from "../mongoose";

export interface RoomProps {
  roomId: string;
  productName: string;
  productDescription: string;
  price: string;
  productUrl: string;
  activeUsers: number;
}

export const createRoom = async ({
  roomId,
  productName,
  productDescription,
  price,
  productUrl,
  activeUsers,
}: RoomProps) => {
  connectToDB();
  try {
    return await Room.create({
      roomId,
      productName,
      productDescription,
      price,
      productUrl,
      activeUsers,
    });
  } catch (error) {
    throw new Error(`Failed to create room: ${error}`);
  }
};
