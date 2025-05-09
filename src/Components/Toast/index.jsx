import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

export default function ClearToast() {
  const dispatch = useDispatch();

  const { open, message, variant } = useSelector((state) => state.toast);

  function handleClose() {
    dispatch({
      type: "ClearToast",
    });
  }

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={open}
      autoHideDuration={2000}
      onClose={handleClose}
      aria-describedby="client-snackbar"
    >
      <Alert onClose={handleClose} severity={variant}>
        {message}
      </Alert>
    </Snackbar>
  );
}
