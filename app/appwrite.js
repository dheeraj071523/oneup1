import { Client, Databases } from "appwrite";

const client = new Client();
client
  .setEndpoint(process.env.NEXT_PUBLIC_END_POINT) // Tumhara Appwrite endpoint
  .setProject(process.env.NEXT_PUBLIC_PROJECT_ID); // Tumhara project ID

export const databases = new Databases(client);
