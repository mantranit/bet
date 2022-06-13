import * as React from "react";
import type { NextPage, NextPageContext } from "next";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "../src/components/Link";
import Layout from "../src/components/Layout";
import nookies from "nookies";
import { verifyIdToken } from "../shared/firebase/firebaseAdmin";

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

export const getServerSideProps = (ctx: NextPageContext) => {
  // Parse
  const cookies = nookies.get(ctx);

  verifyIdToken("cookies._access_token")
    .then((token) => {
      console.log(token);
    })
    .catch((error) => {
      const { res } = ctx;
      (res as any).statusCode = 302;
      (res as any).setHeader("Location", `/login`);
    });

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
