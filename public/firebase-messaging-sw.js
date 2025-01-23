importScripts(
  "https://www.gstatic.com/firebasejs/9.15.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.15.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyD1eR66a4wzSB-4s3EFs5w7dgpv8Ryxarw",
  authDomain: "oneup-f71f5.firebaseapp.com",
  projectId: "oneup-f71f5",
  storageBucket: "oneup-f71f5.firebasestorage.app",
  messagingSenderId: "560676854221",
  appId: "1:560676854221:web:c13786026853a1e2660c84",
  measurementId: "G-E8Z8TLLNYG",
});

const isSupported = firebase.messaging.isSupported();
if (isSupported) {
  const messaging = firebase.messaging();

  messaging.onBackgroundMessage((payload) => {
    console.log(
      "[firebase-messaging-sw.js] Received background message ",
      payload
    );
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: payload.notification.image,
    };

    // self.registration.showNotification(notificationTitle, notificationOptions);
    console.log("background");
  });

  // self.addEventListener("push", (event) => {
  //   const data = event.data.json();
  //   const { title, body, icon } = data.notification;

  //   event.waitUntil(
  //     self.registration.showNotification(title, {
  //       body,
  //     })
  //   );
  // });
}
