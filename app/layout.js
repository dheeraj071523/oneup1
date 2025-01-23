"use client";
import { useEffect } from "react";
import StyledComponentsRegistry from "./registery";
// import { getToken } from "firebase/messaging";
// import { messaging } from "../firebaseConfig";

// export const metadata = {
//     title: "Oneup",
//     description: "A project using the app directory.",
// };

const RootLayout = ({ children }) => {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .then((registration) => {
          console.log(
            "Service Worker registered with scope:",
            registration.scope
          );
        })
        .catch((error) => {
          console.log("Service Worker registration failed:", error);
        });
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta
          title="Oneup"
          aria-description="A project using the app directory."
        />
            <meta name="apple-mobile-web-app-capable" content="yes" />
             <meta name="apple-mobile-web-app-status-bar-style" content="black" />
              <meta name="apple-mobile-web-app-title" content="CodeUp" />
              <link rel="apple-touch-icon" sizes="192x192" href="/images/icon-192.png" />
               <link rel="apple-touch-icon" sizes="384x384" href="/images/icon-384.png" />
                <link rel="apple-touch-icon" sizes="512x512" href="/images/icon-512.png" />

      </head>
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
