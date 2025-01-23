import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "../public/styles/globals.css";
import logo from "../public/images/full-logo-black.dc3e624a01f5dc34c84d.png";

const Home = () => {
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
    </>
  );
};

export default Home;
