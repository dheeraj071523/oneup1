import { getToken } from "firebase/messaging";
import { VAPID_KEY, messaging } from "./firebase";
import { databases } from "../app/appwrite";
import { ID } from "appwrite";

export const requestNotificationPermission = async () => {
  if ("Notification" in window) {
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      console.log("Notification permission granted.");

      const token = await getToken(messaging, { vapidKey: VAPID_KEY });
      console.log("+++ token", token);
      await databases.createDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID,
        process.env.NEXT_PUBLIC_COLLECTION_ID,
        ID.unique(),
        { token: token }
      );
      console.log("token saved in database");
    } else if (permission === "denied") {
      alert('permission === "denied"');
    }
  }
};
