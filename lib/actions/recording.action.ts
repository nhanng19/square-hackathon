"use server"

import Recording from "../models/recording.model";
import { connectToDB } from "../mongoose"

export interface RecordingProps { 
    userId: string | undefined, 
    roomId: string,
    fileName: string,
    startTime: string,
    endTime: string,
    url: string,
    thumbnail?: string | unknown | undefined,
}

export const createRecording = async({ userId, roomId, fileName, startTime, endTime, url, thumbnail } : RecordingProps) => { 
    connectToDB();
    try {
        const recording = await Recording.create({ userId, roomId, fileName, startTime, endTime, url, thumbnail })
        return recording;
    } catch (error) { 
        throw new Error(`Failed to create recording: ${error}`)
    }
}

export const getRecordings = async (userId: string) => { 
    connectToDB();
    try {
        const recordings = await Recording.find({ userId: userId })
        return recordings;
    } catch (error) { 
        throw new Error(`Failed to get recordings: ${error}`)
    }
}

export const deleteRecording = async (recordingId: string) => {
    connectToDB();
    try {
      return await Recording.deleteOne({ _id: recordingId });
    } catch (error) {
      throw new Error(`Failed to delete recording: ${error}`);
    }
}