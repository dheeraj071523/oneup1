"use client";

import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "../public/styles/globals.css";
import logo from "../public/images/full-logo-black.dc3e624a01f5dc34c84d.png";
import { requestNotificationPermission } from "../helper/pushNotification";
import { useEffect, useState } from "react";

const isSafari = () => {
  if (typeof window !== "undefined" && window.navigator) {
    return /^((?!chrome|android).)*safari/i.test(window.navigator.userAgent);
  }
  return false;
};

const Home = () => {
  const [isSafariBrowser, setIsSafariBrowser] = useState(false);
  const linkData = [
    { isDropDown: false, name: "Home", link: "/" },
    { isDropDown: false, name: "Support", link: "/support" },
    {
      isDropDown: true,
      name: "About",
      dropDown: [
        { name: "About Us", link: "/aboutus" },
        { name: "Contact Us", link: "/contactus" },
      ],
    },
  ];

  useEffect(() => {
    setIsSafariBrowser(isSafari());
  }, []);

  return (
    <>
      <Header
        logo={logo}
        links={linkData}
        showSearch={true}
        showProfile={true}
        showNotification={true}
        isLoggedIn={true}
        theme="light"
      />
      {isSafariBrowser && <p>You are using Safari browser.</p>}
      <button onClick={requestNotificationPermission}>Notification</button>
    </>
  );
};

export default Home;
