/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface ToastProps {
  onClose: (arg0: boolean) => void;
  open: boolean;
  message: React.ReactNode;
  severity: AlertColor | undefined;
}

const Toast: React.FC<ToastProps> = (props) => {
  const {onClose = () => {} } = props;
  const [open, setOpen] = useState<boolean>(false);
  const [severity, setSeverity] = useState<AlertColor | undefined>("error");
  const [message, setMessage] = useState<React.ReactNode>("");

  useEffect(()=> {
    const { open, message, severity } = props;
    setSeverity(severity);
    setOpen(open);
    setMessage(message);
  }, [props])

  const handleClose = () => {
    setOpen(false);
    onClose(false);
  }

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
