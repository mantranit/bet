import * as React from "react";
import type { NextPage, NextPageContext } from "next";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "../src/components/Link";
import Layout from "../src/components/Layout";
import useAuth from "../shared/useAuth";

const AboutPage: NextPage = () => {
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
          PROFILE
        </Typography>
        <Box maxWidth="sm">
          <Button variant="contained" component={Link} noLinkStyle href="/">
            Go to the home page
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};

export const getServerSideProps = useAuth((ctx: NextPageContext) => {
  return {
    props: {
    },
  };
});

export default AboutPage;
