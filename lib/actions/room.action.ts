"use server"

import Room  from "../models/room.model";
import { connectToDB } from "../mongoose";

export interface RoomProps {
  userId: string;
  roomId: string;
  catalogId: string;
  activeUsers: number;
}

export const createRoom = async ({
  userId,
  roomId,
  catalogId,
  activeUsers,
}: RoomProps) => {
  connectToDB();
  try {
    const existingRoom = await Room.findOne({ roomId });
    if (existingRoom) {
      throw new Error(`Room with roomId ${roomId} already exists.`);
    }
    return await Room.create({
      userId,
      roomId,
      catalogId,
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

export const getRoomById = async (roomId: string) => { 
  connectToDB();
  try {
    const room = await Room.findOne({ roomId: roomId });
    return room;
  } catch (error) { 
    throw new Error(`Failed to get room: ${error}`)
  }
}

export const deleteRoom = async (roomId: string) => { 
  connectToDB();
  try {

    return await Room.deleteOne({ roomId: roomId })
  } catch (error) { 
    throw new Error(`Failed to delete room ${error}`)
  }
}