import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AdbIcon from "@mui/icons-material/Adb";
import "./appbar.module.scss";
import { useApp } from "../../../shared/AppProvider";
import Link from "../Link";

interface AppBarProps {
  pages?: Array<any>;
}

const CustomAppBar: React.FC<AppBarProps> = (props) => {
  const { auth, setAuth } = useApp();

  const handleLogout = () => {
    setAuth(null);
    localStorage.clear();
  };

  const {
    pages = [
      ...(auth
        ? [
            { label: "Home", to: "/" },
            { label: "Logout", click: handleLogout },
          ]
        : [
            { label: "Login", to: "/login" },
            { label: "Register", to: "/register" },
          ]),
    ],
  } = props;

  return (
    <AppBar position="static">
      <Toolbar disableGutters>
        <AdbIcon sx={{ mx: 2 }} />
        <Box sx={{ flexGrow: 1, display: "flex" }}>
          {pages.map((page, index) => (
            <React.Fragment key={page.label}>
              {index !== 0 && (
                <div className="menu-divider">
                  <span />
                </div>
              )}
              {page.to ? (
                <Button
                  component={Link}
                  href={page.to}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.label}
                </Button>
              ) : (
                <Button
                  onClick={page.click}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.label}
                </Button>
              )}
            </React.Fragment>
          ))}
        </Box>
        <Typography variant="h6" sx={{ flexGrow: 2 }}>
          {auth}
        </Typography>
        <Box sx={{ flexGrow: 0, mx: 2 }}>
          <Button
            component={Link}
            href="/about"
            sx={{ my: 2, color: "white", display: "block" }}
          >
            About
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default CustomAppBar;
