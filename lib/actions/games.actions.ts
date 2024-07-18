"use server";

import { ID, InputFile, Query } from "node-appwrite";

import {
  DATABASE_ID,
  REPORT_COLLECTION_ID,
  databases,
} from "../appwrite.config";
import { parseStringify } from "../utils";

// CREATE APPWRITE REPORT
export const createReport = async (report: CreateReportParams) => {
  try {
    // Create new user -> https://appwrite.io/docs/references/1.5.x/server-nodejs/users#create
    const newReport = await databases.createDocument(
        DATABASE_ID!,
        REPORT_COLLECTION_ID!,
        ID.unique(),
        report
    );

    return parseStringify(newReport);
  } catch (error: any) {
    console.error("An error occurred while creating a new user:", error);
  }
};

// GET USER
export const getReports = async () => {
  try {
    // TODO get all the report
    const reports = await databases.listDocuments(
        DATABASE_ID!, 
        REPORT_COLLECTION_ID!
    );
    
    return parseStringify(reports);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the user details:",
      error
    );
  }
};