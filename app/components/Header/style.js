import styled from "styled-components";

const Wrapper = styled.header`
    height: 56px;

    nav {
        position: fixed;
        width: 100%;
        background-color: ${({ theme }) => (theme === "dark" ? "#0b2239 !important" : "#f8f9fa !important")};

        .nav-toggle-btn {
            background-color: unset;
            border: none;
            &:hover {
                background-color: ${({ theme }) => (theme === "dark" ? "#ffffff30 !important" : "#ddd")};
            }
        }

        .nav-link,
        .nav-link.show,
        .dropdown-item {
            color: ${({ theme }) => (theme === "dark" ? "#ffffffdd" : "#000000dd")};

            &:hover {
                color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#000000")};
            }
        }

        .dropdown-menu {
            background-color: ${({ theme }) => (theme === "dark" ? "#0b2239 !important" : "#f8f9fa !important")};

            .dropdown-item:hover {
                background-color: ${({ theme }) => (theme === "dark" ? "#ffffff20 !important" : "#eee !important")};
            }
        }

        .search-bar {
            display: block;
            width: 100%;
            font-size: 1rem;
            font-weight: 400;
            line-height: 1.5;
            color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#000000")};
            background-color: ${({ theme }) => (theme === "dark" ? "#0b2239 !important" : "#f8f9fa !important")};
            background-clip: padding-box;
            outline: 1px solid ${({ theme }) => (theme === "dark" ? "#ffffff40" : "#00000040")};
            border-radius: 0.375rem;
            transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
            justify-content: space-between;
            align-items: center;

            &:focus-within {
                outline: 1px solid ${({ theme }) => (theme === "dark" ? "#ffffff" : "#000000")};
            }

            @media (max-width: 767px) {
                position: fixed;
                z-index: 1;
                width: calc(100vw - 20px);
                left: 0;
                right: 0;
                margin: 0 10px;
                padding: 2px 0;
                input {
                    flex: 1;
                }
            }

            input {
                border: none !important;
                outline: none !important;
                background-color: unset;
                color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#000000")};
                &::placeholder {
                    color: ${({ theme }) => (theme === "dark" ? "#ffffff60" : "#00000060")};
                }
            }
        }

        .notification-container {
            top: 40px;
            right: -12px;
            z-index: 1030;
            border-radius: 5px;
            width: 425px;
            max-width: 100vw;
            background-color: ${({ theme }) => (theme === "dark" ? "#0b2239 !important" : "#ffffff")};
            color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#000000")};

            h6 {
                margin: 0;
            }

            .notif-close {
                background-color: ${({ theme }) => (theme === "dark" ? "unset" : "#eee")};
                border: none;

                &:hover {
                    background-color: ${({ theme }) => (theme === "dark" ? "#ffffff20" : "#ddd")};
                }
            }

            .list-group {
                color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#000000")};
                gap: 5px;
                border-radius: 0;
                max-height: 400px;
                overflow-y: auto;
                .list-group-item {
                    border-radius: 5px;
                    border: none;
                    background-color: ${({ theme }) => (theme === "dark" ? "#ffffff20" : "#ffffff")};
                    color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#000000")};
                }
            }
        }
    }
`;

export default Wrapper;

export const StyledOffCanvas = styled.div`
    background-color: ${({ theme }) => (theme === "dark" ? "#0b2239 !important" : "#ffffff")};
    color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#000000")};
    height: 100%;

    button {
        filter: ${({ theme }) => (theme === "dark" ? "invert(1)" : "invert(0)")};
        box-shadow: none !important;
    }

    .dropdown-menu {
        background-color: ${({ theme }) => (theme === "dark" ? "#ffffff10 !important" : "#f8f9fa !important")};

        .dropdown-item {
            color: ${({ theme }) => (theme === "dark" ? "#fff !important" : "#000 !important")};
        }

        .dropdown-item:hover {
            background-color: ${({ theme }) => (theme === "dark" ? "#ffffff20 !important" : "#eee !important")};
        }
    }
`;
