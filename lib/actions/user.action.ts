"use server";
import { connect } from "http2";
import { connectToDB } from "../mongoose";
import { User } from "../models/user.model";

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
    const user = await User.findOne({ _id: id })
    console.log(user)
    return user
  } catch (error: any) { 
        throw new Error(`Failed to get user ${error.message}`);
  }
}