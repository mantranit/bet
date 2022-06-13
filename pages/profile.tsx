import * as React from "react";
import type { NextPage } from "next";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "../src/components/Link";
import Layout from "../src/components/Layout";
import nookies from "nookies";

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

export const getServerSideProps = (ctx: any) => {
  // Parse
  const cookies = nookies.get(ctx);
  console.log(cookies)

  // Set
  // nookies.set(ctx, "fromGetInitialProps", "value", {
  //   maxAge: 30 * 24 * 60 * 60,
  //   path: "/",
  // });

  // Destroy
  // nookies.destroy(ctx, 'cookieName')

  return {
    props: {
      cookies,
    },
  };
};

export default AboutPage;
