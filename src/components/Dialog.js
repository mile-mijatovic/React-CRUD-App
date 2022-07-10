import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { deleteLocation } from "../redux/features/location/locationActions";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const AlertDialog = ({
  locationKey,
  isDialogOpened,
  handleCloseDialog,
  title,
  content,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteLocation(locationKey));
    handleCloseDialog();
    navigate("/locations");
  };

  return (
    <div>
      <Dialog
        open={isDialogOpened}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>No</Button>
          <Button onClick={handleDelete}>Yes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlertDialog;
