import { getToken } from "firebase/messaging";
import { VAPID_KEY, messaging } from "./firebase";
import { databases } from "../app/appwrite";
import { ID } from "appwrite";

export const requestNotificationPermission = async () => {
  if ("Notification" in window) {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    if (isSafari) {
      console.log("Safari browser detected.");
      
      if (Notification.permission === "granted") {
        console.log("Notification permission already granted in Safari.");
        const token = await getToken(messaging, { vapidKey: VAPID_KEY });
        console.log("+++ token", token);
        await databases.createDocument(
          process.env.NEXT_PUBLIC_DATABASE_ID,
          process.env.NEXT_PUBLIC_COLLECTION_ID,
          ID.unique(),
          { token: token }
        );
        console.log("Token saved in database.");
      } else {
        alert("Safari does not allow manual notification permission prompts.");
      }
    } else {
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
        console.log("Token saved in database.");
      } else if (permission === "denied") {
        alert('Permission denied for notifications.');
      }
    }
  }
};
