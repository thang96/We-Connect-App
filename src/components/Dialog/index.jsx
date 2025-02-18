import { DialogTitle, IconButton, Dialog as MUIDialog } from "@mui/material";
import { closeDialog } from "@redux/slices/dialogSlice";
import { useDispatch, useSelector } from "react-redux";

import { Close } from "@mui/icons-material";
import NewPostDialog from "./config/NewPostDialog";

const DynamicContent = ({ contentType, addtionalData }) => {
  switch (contentType) {
    case "NEW_POST_DIALOG":
      return <NewPostDialog userInfo={addtionalData} />;

    default:
      break;
  }
};

const Dialog = () => {
  const dialog = useSelector((store) => store.dialog);
  const dispatch = useDispatch();

  return (
    <MUIDialog
      open={dialog.open}
      maxWidth={dialog.maxWidth}
      fullWidth={dialog.fullWidth}
      onClose={() => dispatch(closeDialog())}
    >
      <DialogTitle className="flex items-center justify-between border-b">
        {dialog.title}
        <IconButton onClick={() => dispatch(closeDialog())}>
          <Close color="action" />
        </IconButton>
      </DialogTitle>
      <DynamicContent
        contentType={dialog.contentType}
        addtionalData={dialog.addtionalData}
      />
    </MUIDialog>
  );
};

export default Dialog;
