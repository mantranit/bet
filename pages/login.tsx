import * as React from "react";
import type { NextPage } from "next";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Link from '../src/components/Link';
import Layout from "../src/components/Layout";
import { useApp } from "../shared/AppProvider";
import { useEffect } from "react";

const LoginPage: NextPage = () => {
  const { showToast } = useApp();

  useEffect(() => {
    showToast("login");
  }, []);

  return (
    <Layout>
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          LOGIN
        </Typography>
        <Box maxWidth="sm">
          <Button variant="contained" component={Link} noLinkStyle href="/register">
            Go to the register page
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};

export default LoginPage;
