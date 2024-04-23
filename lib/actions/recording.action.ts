import Recording from "../models/recording.model";
import { connectToDB } from "../mongoose"

export interface RecordingProps { 
    userId: string, 
    roomId: string,
    fileName: string,
    startTime: string,
    endTime: string,
    url: string
}

export const createRecording = async ({ userId, roomId, fileName, startTime, endTime, url } : RecordingProps) => { 
    connectToDB();
    try {
        const recording = await Recording.create({ userId, roomId, fileName, startTime, endTime, url })
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