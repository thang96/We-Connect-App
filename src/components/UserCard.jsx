import { MessageOutlined } from "@mui/icons-material";
import { Avatar, Button } from "@mui/material";
import { Link } from "react-router-dom";

const UserCard = ({ fullName = "Bui Duc Thang" }) => {
  return (
    <div className="bg-white">
      <Avatar className="!bg-primary-main">
        {fullName?.[0].toUpperCase()}
      </Avatar>
      <Link>
        <p>Bui Duc Thang</p>
      </Link>
      <Button>
        <MessageOutlined />
      </Button>
    </div>
  );
};

export default UserCard;
