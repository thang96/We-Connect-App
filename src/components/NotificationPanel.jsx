import { Circle, Notifications } from "@mui/icons-material";
import { Badge, IconButton, Menu, MenuItem } from "@mui/material";
import { useGetNotificationsQuery } from "@services/notificationApi";
import React, { useState } from "react";

const NotificationPanel = (props) => {
  const { data = {} } = useGetNotificationsQuery();
  const [anchorEl, setAnchorEl] = useState(null);

  const newNotificationsCount =
    (data.notifications || []).filter((noti) => !noti.seen)?.length || 0;

  const renderNotificationsMenu = () => (
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
      classes={{ paper: "!min-w-80 !max-h-80 overflow-y-auto" }}
    >
      {(data?.notifications || []).map((notification) => {
        return (
          <MenuItem key={notification._id} className="flex !justify-between">
            {notification.like && (
              <p>{notification.author.fullName} thích bài viết của bạn</p>
            )}
            {notification.comment && (
              <p>{notification.author.fullName} bình luận bài viết của bạn</p>
            )}
            {!notification.seen && (
              <Circle fontSize="9px" className="text-primary-main" />
            )}
          </MenuItem>
        );
      })}
    </Menu>
  );

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClick = (e) => {
    setAnchorEl(e.target);
  };

  return (
    <div className="">
      <IconButton size="medium" onClick={handleNotificationClick}>
        <Badge badgeContent={newNotificationsCount || undefined} color="error">
          <Notifications />
        </Badge>
      </IconButton>
      {renderNotificationsMenu()}
    </div>
  );
};

export default NotificationPanel;
