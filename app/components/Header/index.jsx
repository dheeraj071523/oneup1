"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
  FormControl,
} from "react-bootstrap";
import { FaHeadset } from "react-icons/fa";
import { GoSearch, GoBell } from "react-icons/go";
import { IoIosArrowBack } from "react-icons/io";
import { CgClose } from "react-icons/cg";
import Image from "next/image";
import defaultProfile from "../../../public/images/default profile.jpg";
import codeupLogo from "../../../public/images/full-logo-black.dc3e624a01f5dc34c84d.png";
import { CodeupButton } from "../utils";
import Wrapper, { StyledOffCanvas } from "./style";
import { requestNotificationPermission } from "../../../helper/pushNotification";
import { onMessage } from "firebase/messaging";
import { messaging } from "../../../helper/firebase";

const Header = ({
  logo = codeupLogo,
  links = "/",
  showSupport = false,
  showSearch = false,
  showNotification = false,
  showProfile = false,
  isLoggedIn = false,
  theme = "light",
}) => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] =
    useState(false);
  const notificationRef = useRef(null);
  const [showSearchBar, setShowSearchBar] = useState(false);

  const handleToggleOffcanvas = () => setShowOffcanvas(!showOffcanvas);
  const handleCloseOffcanvas = () => setShowOffcanvas(false);
  const handleToggleSearch = () => {
    setShowSearchBar((prevState) => {
      if (!prevState) {
        setTimeout(() => searchInputRef.current?.focus(), 0); // Focus the input when the bar is shown
      }
      return !prevState;
    });
  };
  const searchInputRef = useRef(null); // Ref to access the search input
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotificationDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    if (isSafari) {

  useEffect(() => {
    requestNotificationPermission();

    onMessage(messaging, (payload) => {
      console.log("Received foreground message:", payload);
      const { title, body, icon } = payload.notification;

      console.log("Notification Title:", title);
      console.log("Notification Body:", body);
      //console.log("Notification Icon:", icon);

      // alert(`notification ${title} ${body}`);

      new Notification(title, {
        body: body || "Foreground Notification Body",
      });
      //console.log("forground", notification);

      // Show notification
    });
  }, []);
    }

  return (
    <Wrapper theme={theme}>
      <Navbar
        bg={theme === "dark" ? "dark" : "light"}
        className={`shadow-sm navbar-${theme === "dark" ? "dark" : "light"}`}
        expand="lg"
      >
        <Container>
          {/* Navbar toggle for offcanvas (visible only on small screens) */}
          <Button
            variant="light"
            className="nav-toggle-btn d-lg-none p-1"
            aria-controls="offcanvas-navbar"
            onClick={handleToggleOffcanvas}
          >
            <span className="navbar-toggler-icon"></span>
          </Button>
          {/* Logo */}
          <Navbar.Brand
            href="/"
            className="mr-auto"
            style={{ marginRight: "auto", marginLeft: 8, lineHeight: 0 }}
          >
            <Image src={logo} alt="Logo" height="25" width="auto" />
          </Navbar.Brand>

          {/* Inline nav links and dropdowns (visible on large screens) */}
          <Navbar.Collapse className="d-none d-lg-flex">
            <Nav className="ms-5">
              {links.map((link, index) =>
                link.isDropDown ? (
                  <NavDropdown
                    title={link.name}
                    id={`nav-dropdown-${index}`}
                    key={index}
                  >
                    {link.dropDown.map((item, idx) => (
                      <NavDropdown.Item href={item.link} key={idx}>
                        {item.name}
                      </NavDropdown.Item>
                    ))}
                  </NavDropdown>
                ) : (
                  <Nav.Link href={link.link} key={index}>
                    {link.name}
                  </Nav.Link>
                )
              )}
            </Nav>
          </Navbar.Collapse>

          {/* Search Bar / Search Icon */}
          <div className="d-flex align-items-center position-relative">
            {showSearch && (
              <>
                {/* Search Bar */}
                <form
                  className={`search-bar-container ${
                    showSearchBar ? "d-flex" : "d-none"
                  } d-md-flex search-bar me-2`} // Prevent form submission
                >
                  <Button
                    variant="link"
                    className={`${
                      showSearchBar ? "d-flex" : "d-none"
                    } d-md-none`}
                    title="close"
                    onClick={() => setShowSearchBar(false)}
                  >
                    <IoIosArrowBack
                      color={theme === "dark" ? "white" : "black"}
                      size={20}
                      strokeWidth={0.5}
                    />
                  </Button>
                  <FormControl
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search..."
                    aria-label="Search"
                    style={{ width: "300px" }}
                    onBlur={() => setShowSearchBar(false)}
                  />
                  <Button
                    variant="link"
                    type="search"
                    className="search-icon-btn"
                    title="Search"
                  >
                    <GoSearch
                      color={theme === "dark" ? "white" : "black"}
                      size={18}
                      strokeWidth={0.5}
                    />
                  </Button>
                </form>

                {/* Search Toggle Button (Visible on small screens) */}
                <Button
                  variant="link"
                  className={`search-icon-btn ${
                    showSearchBar ? "d-none" : "d-flex"
                  } d-md-none me-1`}
                  title="Search toggle"
                  onClick={handleToggleSearch}
                >
                  <GoSearch
                    color={theme === "dark" ? "white" : "black"}
                    size={18}
                    strokeWidth={0.5}
                  />
                </Button>
              </>
            )}

            {showNotification && (
              <>
                <Button
                  ref={notificationRef}
                  variant="link"
                  className="p-0 me-sm-3 me-2"
                  title="Notification"
                  onClick={() => {
                    setShowNotificationDropdown(!showNotificationDropdown);
                  }}
                >
                  <GoBell
                    color={theme === "dark" ? "white" : "black"}
                    size={18}
                    strokeWidth={0.5}
                  />
                </Button>
                {showNotificationDropdown && (
                  <div className="notification-container position-absolute bg-light shadow-sm p-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h6>Notifications</h6>
                      <Button
                        variant={theme === "dark" ? "dark" : "light"}
                        className="notif-close"
                        size="sm"
                        onClick={() => setShowNotificationDropdown(false)}
                      >
                        <CgClose size={18} strokeWidth={0.5} />
                      </Button>
                    </div>
                    <ul className="list-group">
                      {Array.from({ length: 20 }, (_, i) => (
                        <li key={i} className="list-group-item">
                          Notification example {i + 1}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
            {showSupport && (
              <a href="/support">
                <Button
                  variant="link"
                  className="p-0 me-sm-3 me-2"
                  title="Support"
                >
                  <FaHeadset
                    color={theme === "dark" ? "white" : "black"}
                    size={18}
                  />
                </Button>
              </a>
            )}

            {showProfile && isLoggedIn ? (
              <NavDropdown
                title={
                  <Image
                    src={defaultProfile}
                    className="rounded-circle object-fit-cover ms-1"
                    alt="Profile"
                    height="40"
                    width="40"
                  />
                }
                id="profile-dropdown"
                align="end"
              >
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <a href="/signup" className="ms-1">
                <CodeupButton>Signup</CodeupButton>
              </a>
            )}
          </div>

          {/* Offcanvas for links and dropdowns (used on small screens) */}
          <Offcanvas
            show={showOffcanvas}
            onHide={handleCloseOffcanvas}
            placement="start"
            style={{
              backgroundColor:
                theme === "dark" ? "#0b2239 !important" : "#f8f9fa !important",
            }}
          >
            <StyledOffCanvas theme={theme}>
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Menu</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="flex-column">
                  {links.map((link, index) =>
                    link.isDropDown ? (
                      <NavDropdown
                        title={link.name}
                        id={`offcanvas-nav-dropdown-${index}`}
                        key={index}
                      >
                        {link.dropDown.map((item, idx) => (
                          <NavDropdown.Item href={item.link} key={idx}>
                            {item.name}
                          </NavDropdown.Item>
                        ))}
                      </NavDropdown>
                    ) : (
                      <Nav.Link href={link.link} key={index}>
                        {link.name}
                      </Nav.Link>
                    )
                  )}
                </Nav>
              </Offcanvas.Body>
            </StyledOffCanvas>
          </Offcanvas>
        </Container>
      </Navbar>
    </Wrapper>
  );
};

export default Header;
