import type { NextPageContext } from "next";
import nookies from "nookies";
import { verifyIdToken } from "./firebaseAdmin";

const gotoLoginPage = () => {
  return {
    redirect: {
      destination: process.env.NEXT_PUBLIC_LOGIN_URL,
      statusCode: 302,
    },
  };
}

export const withAuth = (gssp: Function) => {
  return async (context: NextPageContext) => {
    const cookies = nookies.get(context);
    const { _access_token: token } = cookies;

    if (!token) {
      return gotoLoginPage();
    }
    try {
      await verifyIdToken(token);
    } catch (error: any) {
      return gotoLoginPage();
    }

    return await gssp(context); // Continue on to call `getServerSideProps` logic
  };
};

export default withAuth;
