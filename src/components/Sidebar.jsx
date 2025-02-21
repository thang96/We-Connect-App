import { useUseDetectLayout } from "@hooks/index";
import { HomeOutlined, Hub, Message, People } from "@mui/icons-material";
import { Drawer, List, ListSubheader, styled } from "@mui/material";
import { toggleDrawer } from "@redux/slices/settingsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ListStyled = styled(List)`
  padding: 16px;
  background: white;
`;

const SideBarContent = () => {
  return (
    <div className="flex w-64 flex-col gap-4">
      <ListStyled className="flex flex-col gap-1 rounded border-solid !px-4 !py-3 shadow-sm">
        <Link className="flex items-center gap-1" to={"/"}>
          <HomeOutlined fontSize="small" />
          New Feeds
        </Link>
        <Link className="flex items-center gap-1" to={"/messages"}>
          <Message fontSize="small" />
          Messager
        </Link>
        <Link className="flex items-center gap-1" to={"/frends"}>
          <People fontSize="small" />
          Friends
        </Link>
        <Link className="flex items-center gap-1" to={"/groups"}>
          <Hub fontSize="small" />
          Groups
        </Link>
      </ListStyled>

      <List className="flex flex-col gap-1 rounded border-solid bg-white !px-4 !py-3 shadow-sm">
        <ListSubheader className="!px-0">Settings</ListSubheader>
        <Link className="flex items-center gap-1" to={"/settings/account"}>
          <People fontSize="small" />
          Account
        </Link>
        <Link className="flex items-center gap-1" to={"/settings/language"}>
          <Hub fontSize="small" />
          Language
        </Link>
      </List>
    </div>
  );
};

const Sidebar = () => {
  const {isMediumLayout} = useUseDetectLayout();
  const isShowDrawer = useSelector((store) => store.settings.isShowDrawer);
  const dispatch = useDispatch();

  return isMediumLayout ? (
    <Drawer
      classes={{ paper: "p-4 flex flex-col !bg-dark-200 gap-4" }}
      open={isShowDrawer}
      onClose={() => dispatch(toggleDrawer())}
    >
      <div>
        <Link>
          <img className="h-8 w-8" src="/weconnect-logo.png" alt="" />
        </Link>
      </div>
      <SideBarContent />
    </Drawer>
  ) : (
    <SideBarContent />
  );
};

export default Sidebar;
