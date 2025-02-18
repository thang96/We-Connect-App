import { useUseLogout } from "@hooks/useUseLogout";
import { useUserInfo } from "@hooks/useUserInfo";
import { Menu as MenuIcon, Notifications, Search } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Badge,
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
import { Link } from "react-router-dom";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const userInfo = useUserInfo();
  const { logoutUser } = useUseLogout();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
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
      <AppBar color="white" position="static" className="py-4">
        <Toolbar className="!min-h-fit justify-between">
          {isMobile ? (
            <IconButton onClick={() => dispatch(toggleDrawer())}>
              <MenuIcon />
            </IconButton>
          ) : (
            <div className="flex items-center gap-4">
              <Link to={"/"}>
                <img className="h-8 w-8" src="/weconnect-logo.png" alt="" />
              </Link>
              <div className="flex items-center gap-1">
                <Search />
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
                />
              </div>
            </div>
          )}
          <div>
            {isMobile && (
              <IconButton>
                <Search />
              </IconButton>
            )}
            <IconButton size="medium">
              <Badge badgeContent={4} color="error">
                <Notifications />
              </Badge>
            </IconButton>
            <IconButton onClick={handleUserProfileClick} size="medium">
              {/* <AccountCircle /> */}
              <Avatar className="!bg-primary-main">
                {userInfo.fullName?.[0].toUpperCase()}
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
