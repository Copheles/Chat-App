import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { hideToast } from "@redux/toast/toast.slice";

export default function Toast() {
  const { open, message, severity } = useAppSelector((state) => state.toast);

  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(hideToast());
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{ width: "100%", color: "white" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
