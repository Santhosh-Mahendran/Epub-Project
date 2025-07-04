import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Autocomplete, InputAdornment, TextField, Badge } from "@mui/material";
import { CiSearch } from "react-icons/ci";
import { MdOutlineLanguage } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { FaHeart } from "react-icons/fa6";
import MenuItems from "../../Core-Components/MenuItem";
import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { User_Logout } from "../../../Redux/Action/UserAction/UserAuthAction";
import { MdLibraryBooks } from "react-icons/md";
import UserFilterMenu from "./UserFilterMenu";
import Profile from "../Profile/Profile";
import { IoMdMenu } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { RiBookShelfFill } from "react-icons/ri";
import SideNavBar from "./SideNavBar";

function UserHeader() {
  const { BookDataList } = useSelector((state) => state.BookData);
  const [searchQuery, setSearchQuery] = useState("");

  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  const [showSearchOption, setShowSearchOption] = useState(false);
  const [cart_Count, setCart_Count] = useState(0);
  const [OpenSideNav, setOpenSideNav] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAccountMenuOpen = (event) => {
    setOpenProfileMenu(event.currentTarget);
  };

  const [openProfileDetails, setProfileDetails] = useState(false);
  const { cartCount } = useSelector((state) => state.CartBook);
 

  const handleProfileDetailClose = () => {
    setProfileDetails(false);
  };
  useEffect(() => {
    setCart_Count(cartCount);
  }, [cartCount]);

  const uniqueOptions = [
    ...new Set(
      BookDataList.flatMap((book) => [book?.author, book?.title, book?.genre])
    ),
  ];
  const handleProfileOpen = () => {
    setProfileDetails(true);
    setOpenProfileMenu(null);
  };
  const handleLogout = () => {
    setOpenProfileMenu(null);
    dispatch(User_Logout());
    navigate("/");
  };

  const handleClose = () => {
    setOpenProfileMenu(null);
  };

  useEffect(() => {
    if (window.location.pathname === "/reader/dashboard/explore") {
      return;
    }
    setSearchQuery(""); // Clear search query when component mounts
  }, [window.location.pathname]);

  const handleSearchChange = (event, newValue) => {
    if (newValue) {
      setSearchQuery(newValue);
      setShowSearchOption(false);
      if (window.location.pathname !== "/reader/dashboard/explore") {
        navigate(`/reader/dashboard/explore?search=${newValue}`);
      }
    }
  };


  const handleMenuOpen = () => {
    setOpenSideNav(!OpenSideNav);
  };

  return (
    <>
      <div className="header">
        <div className="d-flex justify-centent-center align-items-center">
          <div className="menu-icon">
            <IoMdMenu
              size={25}
              className="menu-icon me-2"
              style={{ cursor: "pointer" }}
              onClick={handleMenuOpen}
            />
          </div>
          <h3
            role="button"
            className="title"
            onClick={() => navigate("/reader/dashboard")}
          >
            HALO PAD READER
          </h3>
        </div>
        <div className="userHeader d-none d-lg-block">
          <Autocomplete
            options={uniqueOptions}
            value={searchQuery}
            open={showSearchOption}
            onClose={() => setShowSearchOption(false)}
            onChange={handleSearchChange}
            onInputChange={(event) =>
              event?.target?.value?.length > 2
                ? setShowSearchOption(true)
                : setShowSearchOption(false)
            }
            disableClearable
            popupIcon={null}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Search by Title , Author , Genre and more..."
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <InputAdornment position="end">
                      <CiSearch size={22} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    paddingRight: "20px !important",
                  },
                }}
              />
            )}
            sx={{
              padding: "0px",
              backgroundColor: "white",
              borderRadius: "5px",
              width: "400px",
              height: "38px",
              "& .MuiTextField-root": {
                padding: "0px",
                width: "400px",
                height: "38px",
              },
              "& .MuiOutlinedInput-root": {
                width: "400px",
                height: "38px",
                borderRadius: "10px",
                "& fieldset": { border: "none" }, // Remove border
              },
              "& .MuiAutocomplete-hasPopupIcon": {
                paddingRight: "0px",
              },
            }}
          />
        </div>
        <div className="d-none d-lg-block">
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ columnGap: "50px" }}
          >
            <div
              className="explore"
              style={{ cursor: "pointer", userSelect: "none" }}
              onClick={() => navigate("/reader/dashboard/explore")}
            >
              <RiBookShelfFill
                className="me-2 mb-1"
                size={16}
                style={{ color: "#f6f6f6" }}
              />
              <span>Explore</span>
            </div>
            <div
              className="wishlist"
              style={{ cursor: "pointer", userSelect: "none" }}
              onClick={() => navigate("/reader/dashboard/detail/wishlist")}
            >
              <FaHeart
                className="me-2 mb-1"
                size={16}
                style={{ color: "#f6f6f6" }}
              />
              <span>wishlist</span>
            </div>
            <div
              className="profile"
              style={{ cursor: "pointer", userSelect: "none" }}
              role="button"
              onClick={() => navigate("/reader/dashboard/detail/library")}
            >
              <MdLibraryBooks
                className="me-2 mb-1"
                size={16}
                style={{ color: "#f6f6f6" }}
              />
              <span>My Library</span>
            </div>
                <div
              className="cart"
              style={{ cursor: "pointer", userSelect: "none" }}
              onClick={() => navigate("/reader/dashboard/detail/order")}
            >
              <Badge
                badgeContent={cart_Count}
                color="primary"
                size="small"
                sx={{
                  "& .MuiBadge-badge": {
                    fontSize: "0.7rem", // Change text size inside the badge
                    height: "16px", // Adjust badge height
                    minWidth: "15px",
                  },
                }}
              >
                <IoCartOutline
                  className="mb-1"
                  size={18}
                  style={{ color: "#f6f6f6" }}
                />
              </Badge>

              <span className="ms-2">Cart</span>
            </div>
            <div
              className="profile"
              style={{ cursor: "pointer", userSelect: "none" }}
              role="button"
              aria-controls={openProfileMenu ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openProfileMenu ? "true" : undefined}
              onClick={handleAccountMenuOpen}
            >
              <FaRegUserCircle
                className="me-2 mb-1"
                size={16}
                style={{ color: "#f6f6f6" }}
              />
              <span>Account</span>
            </div>
            <MenuItems
              anchorEl={openProfileMenu}
              open={openProfileMenu}
              onClose={handleClose}
              listdata={[
                { label: "Profile", handleClick: handleProfileOpen },
                // { label: "My account", handleClick: handleClose },
                { label: "Logout", handleClick: handleLogout },
              ]}
            />
        
          </div>
        </div>
      </div>
      <UserFilterMenu />
      <Profile
        openProfileDetails={openProfileDetails}
        handleClose={handleProfileDetailClose}
      />
      {OpenSideNav && (
        <SideNavBar
          setOpenSideNav={setOpenSideNav}
          menu={[
            {
              path: "/reader/dashboard",
              icon: <FaHome size={15} className="mx-3 mb-1" />,
              label: "Home",
            },
            {
              path: "/reader/dashboard/detail/wishlist",
              icon: <FaHeart size={15} className="mx-3 mb-1" />,
              label: "wishlist",
            },
            {
              path: "/reader/dashboard/detail/library",
              icon: <MdLibraryBooks size={15} className="mx-3 mb-1" />,
              label: "My Library",
            },
            {
              path: "/reader/dashboard/detail/order",
              icon: <IoCartOutline size={15} className="mx-3 mb-1" />,
              label: "Cart",
            },
          ]}
        />
      )}
    </>
  );
}

export default UserHeader;
