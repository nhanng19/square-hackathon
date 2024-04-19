"use server"

import Room  from "../models/room.model";
import { connectToDB } from "../mongoose";

export interface RoomProps {
  userId: string;
  roomId: string;
  productName: string;
  productDescription: string;
  price: string;
  productUrl: string;
  activeUsers: number;
}

export const createRoom = async ({
  userId,
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
      userId,
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

export const getRooms = async (userId : string) => { 
  connectToDB();
  try {
    const rooms = await Room.find({ userId: userId });
    return rooms;
  } catch (error) { 
    throw new Error(`Failed to create room: ${error}`)
  }
}