import { useUseLogout, useUserInfo } from "@hooks/index";
import { Menu as MenuIcon, Notifications, Search } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { toggleDrawer } from "@redux/slices/settingsSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import NotificationPanel from "./NotificationPanel";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTemp, setSearchTemp] = useState("");
  const userInfo = useUserInfo();
  const { logoutUser } = useUseLogout();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const renderMenu = () => {
    return (
      <Menu
        open={!!anchorEl}
        onClose={handleMenuClose}
        anchorEl={anchorEl}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem onClick={() => logoutUser()}>Logout</MenuItem>
      </Menu>
    );
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleUserProfileClick = (e) => {
    setAnchorEl(e.target);
  };

  return (
    <div>
      <AppBar color="white" position="static">
        <Toolbar className="container !min-h-fit justify-between py-0">
          {isMobile ? (
            <IconButton onClick={() => dispatch(toggleDrawer())}>
              <MenuIcon />
            </IconButton>
          ) : (
            <div className="flex items-center gap-4">
              <Link to={"/"}>
                <img
                  className="h-8 w-8"
                  src={
                    (import.meta.env.MODE == "development"
                      ? ""
                      : "/We-Connect-App") + "/weconnect-logo.png"
                  }
                  alt=""
                />
              </Link>
              <div className="flex items-center gap-1">
                <div
                  onClick={() => {
                    navigate("./search/Users", {
                      state: {
                        searchTemp,
                      },
                    });
                  }}
                >
                  <Search className="hover:text-primary-main cursor-pointer" />
                </div>
                <TextField
                  variant="standard"
                  slotProps={{
                    input: { className: "h-10 px-3 py-2" },
                    htmlInput: { className: "!p-0" },
                  }}
                  name="search"
                  placeholder="Search"
                  sx={{
                    ".MuiInputBase-root::before": {
                      display: "none",
                    },
                  }}
                  value={searchTemp}
                  onChange={(e) => {
                    setSearchTemp(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      navigate("./search/Users", {
                        state: {
                          searchTemp,
                        },
                      });
                    }
                  }}
                />
              </div>
            </div>
          )}
          <div className="flex items-center">
            {isMobile && (
              <IconButton>
                <Search />
              </IconButton>
            )}
            <NotificationPanel />
            <IconButton onClick={handleUserProfileClick} size="medium">
              {/* <AccountCircle /> */}
              <Avatar className="!bg-primary-main">
                {userInfo?.fullName?.[0].toUpperCase()}
              </Avatar>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu()}
    </div>
  );
};

export default Header;
