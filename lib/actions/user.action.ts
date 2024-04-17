"use server";

import { connectToDB } from "../mongoose";
import { MetaData, SquareData, User } from "../models/user.model";
import { DBUser, MetaDataType, SquareDataType } from "@/types/user";
import { isString } from "@/utils/helpers";
import { encryptToken } from "@/utils/server-helpers";
import { SCOPES } from "@/constants";
import mongoose from "mongoose";

interface Params {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  salt: string;
  avatar: string;
}

export async function createUser({
  email,
  password,
  firstName,
  lastName,
  salt,
  avatar,
}: Params) {
  connectToDB();
  try {
    const user = await User.create({
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      salt: salt,
      avatar: avatar,
    });
    return user;
  } catch (error: any) {
    throw new Error(`Failed to create user ${error.message}`);
  }
}

export async function getUserByEmail(email: string) {
  connectToDB();
  try {
    const user = await User.findOne({ email: email });
    return user;
  } catch (error: any) {
    throw new Error(`Failed to get user ${error.message}`);
  }
}

export async function getUser(id: string | undefined) {
  connectToDB();
  try {
    const userId = new mongoose.Types.ObjectId(id); // Convert string id to ObjectId
    const user = await User.findOne({ _id: userId })
    const squareData = await SquareData.findOne({ userId: userId });
    const metaData = await MetaData.findOne({ userId: userId })
    return { ...user._doc, squareData: squareData, metaData: metaData };
  } catch (error: any) {
    throw new Error(`Failed to get user ${error.message}`);
  }
}

export async function updateUser({ id, user }: { id: string | undefined; user: DBUser }) {
  connectToDB();
  try {
    // Update the user object in the database
    const updatedUser = await User.findOneAndUpdate(
      { _id: id }, // Query to find the user by ID
      { $set: user }, // Update with the new user object
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      throw new Error(`User with id ${id} not found`);
    }

    return updatedUser;
  } catch (error : any) {
    throw new Error(`Failed to update user: ${error.message}`);
  }
}
export async function createSquareData({
  id,
  squareData,
}: {
  id: string | undefined;
  squareData: SquareDataType;
}) {
  connectToDB();
  try {
    return await SquareData.create({
      tokens: squareData.tokens,
      expiresAt: squareData.expiresAt,
      merchantId: squareData.merchantId,
      userId: new mongoose.Types.ObjectId(id),
    });
  } catch (error: any) {
    throw new Error(`Failed to create squareData ${error.message}`);
  }
}

export async function createMetaData({
  id,
  metaData,
}: {
  id: string | undefined;
  metaData: MetaDataType;
}) {
  connectToDB();
  try {
    return await MetaData.create({
      userId: new mongoose.Types.ObjectId(id),
      ...metaData,
    });
  } catch (error: any) {
    throw new Error(`Failed to create squareData ${error.message}`);
  }
}


export async function authorizeUser({
  id,
  squareData,
}: {
  id: string | undefined;
  squareData: SquareDataType;
}) {
  connectToDB();
  if (!isString(squareData.tokens)) {
    throw new Error("Tokens must be a string");
  }
  const { iv, encrypted } = encryptToken(squareData.tokens);
  squareData.tokens = encrypted;
  
  await createSquareData({
    id,
    squareData
  })

  await createMetaData({
    id,
    metaData: {
      iv,
      scopes: SCOPES.join(",")
    }
  })
}
