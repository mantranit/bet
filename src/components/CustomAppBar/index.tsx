import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AdbIcon from "@mui/icons-material/Adb";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import styles from "./appbar.module.scss";
import { useApp } from "../../../shared/AppProvider";
import CustomMenuItem from "../CustomMenuItem";

interface AppBarProps {
  pages?: Array<any>;
  settings?: Array<any>;
}

const CustomAppBar: React.FC<AppBarProps> = (props) => {
  const { user, logout } = useApp();
  const [anchorElNav, setAnchorElNav] = React.useState<Element | null>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<Element | null>(null);

  const handleLogout = () => {
    setAnchorElUser(null);
    logout();
  };

  const {
    pages = [{ label: "HOME", to: "/" }],
    settings = [
      ...(user
        ? [
            { label: "Profile", to: "/profile" },
            { label: "Logout", click: handleLogout },
          ]
        : [{ label: "Login", to: "/login" }]),
    ],
  } = props;

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                onClick={(event) => setAnchorElNav(event.currentTarget)}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={() => setAnchorElNav(null)}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <CustomMenuItem
                    key={page.label}
                    item={page}
                    activeClassName={styles.mainMenuActive}
                  />
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page, index) => (
                <React.Fragment key={page.label}>
                  {index !== 0 && (
                    <div className={styles.menuDivider}>
                      <span />
                    </div>
                  )}
                  <CustomMenuItem
                    key={page.label}
                    item={page}
                    activeClassName={styles.mainMenuActive}
                    sx={{ my: 2, color: "white", display: "block" }}
                  />
                </React.Fragment>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton
                  onClick={(event) => setAnchorElUser(event.currentTarget)}
                  sx={{ p: 0 }}
                >
                  <Avatar
                    alt={user?.displayName ?? user?.email ?? ""}
                    src={user?.photoURL ?? ""}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={() => setAnchorElUser(null)}
              >
                {settings.map((setting) => (
                  <CustomMenuItem
                    key={setting.label}
                    item={setting}
                    activeClassName={styles.mainMenuActive}
                  />
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
export default CustomAppBar;
