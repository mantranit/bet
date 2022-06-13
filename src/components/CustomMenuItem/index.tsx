import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
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
  const { label, to, click = () => {} } = item;
  return (
    <>
      {to ? (
        <MenuItem
          component={Link}
          activeClassName={activeClassName}
          href={to}
          {...rest}
        >
          {label}
        </MenuItem>
      ) : (
        <MenuItem
          onClick={() => {
            click();
          }}
          {...rest}
        >
          {label}
        </MenuItem>
      )}
    </>
  );
};

export default CustomMenuItem;
