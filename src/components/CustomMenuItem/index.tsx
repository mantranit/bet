import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import * as React from "react";
import Link from "../Link";
import styles from "./menuItem.module.scss";

interface MenuItemProps {
  item: {
    label: string;
    to?: string;
    click?: Function;
  };
  sx?: any;
  activeClassName?: string;
}

const CustomMenuItem: React.FC<MenuItemProps> = (props) => {
  const { item, activeClassName, ...rest } = props;
  return (
    <>
      {item.to ? (
        <MenuItem component={Link} activeClassName={activeClassName} href={item.to} {...rest}>
          {item.label}
        </MenuItem>
      ) : (
        <MenuItem onClick={() => { item.click(); }} {...rest}>
          {item.label}
        </MenuItem>
      )}
    </>
  );
};

export default CustomMenuItem;
