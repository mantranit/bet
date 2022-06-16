import type { NextPageContext } from "next";
import nookies from "nookies";

export const useAuth = (gssp: Function) => {
  return async (context: NextPageContext) => {
    const cookies = nookies.get(context);
    const { _access_token: token } = cookies;

    if (!token) {
      // Redirect to login page
      return {
        redirect: {
          destination: process.env.NEXT_PUBLIC_LOGIN_URL,
          statusCode: 302,
        },
      };
    }

    return await gssp(context); // Continue on to call `getServerSideProps` logic
  };
};

export default useAuth;
