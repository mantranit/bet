import * as React from 'react';
import type { NextPage, NextPageContext } from 'next';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Layout from '../src/components/Layout';
import withAuth from '../shared/withAuth';

const Homepage: NextPage = () => {
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
          HOME
        </Typography>
      </Box>
    </Layout>
  );
};

export const getServerSideProps = withAuth((ctx: NextPageContext) => {
  return {
    props: {
    },
  };
});

export default Homepage;
