import * as React from "react";
import type { NextPage } from "next";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Layout from "../src/components/Layout";
import { useApp } from "../shared/AppProvider";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import * as yup from "yup";
import Paper from "@mui/material/Paper";
import styles from "../src/assets/scss/login.module.scss";
import { Divider } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import { getAuth } from "firebase/auth";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email.")
    .required("Email is required."),
  password: yup
    .string()
    .min(5, "Password should be of minimum 5 characters length.")
    .required("Password is required."),
});

const validationSchemaRegister = yup.object({
  email: yup
    .string()
    .email("Enter a valid email.")
    .required("Email is required."),
  password: yup
    .string()
    .min(6, "Password should be of minimum 6 characters length.")
    .required("Password is required."),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required.")
    .oneOf([yup.ref("password"), null], "Passwords does not match."),
});

const LoginPage: NextPage = () => {
  const { showToast, setLoading, loginByEmail, signInByEmail } = useApp();
  const [tabValue, setTabValue] = useState("1");

  useEffect(() => {
    // showToast("login");
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const { email, password } = values;
      loginByEmail(email, password);
    },
  });

  const formikRegister = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchemaRegister,
    onSubmit: (values) => {
      const { email, password } = values;
      signInByEmail(email, password);
    },
  });

  const handleLoginByGoogle = () => {

    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {
      // The user object has basic properties such as display name, email, etc.
      const displayName = user.displayName;
      const email = user.email;
      const photoURL = user.photoURL;
      const emailVerified = user.emailVerified;

      // The user's ID, unique to the Firebase project. Do NOT use
      // this value to authenticate with your backend server, if
      // you have one. Use User.getToken() instead.
      const uid = user.uid;
      console.log(user)
    }
  };

  return (
    <Layout>
      <div className={styles.setting}>
        <Paper className={styles.settingContent}>
          <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={(event, newValue) => {
                  setTabValue(newValue);
                }}
                variant="fullWidth"
              >
                <Tab label="Login" value="1" />
                <Tab label="Register" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <form onSubmit={formik.handleSubmit}>
                <div className={styles.settingContentRow}>
                  <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </div>
                <div className={styles.settingContentRow}>
                  <TextField
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                  />
                </div>
                <div>
                  <Button
                    size="large"
                    color="primary"
                    variant="outlined"
                    fullWidth
                    type="submit"
                  >
                    Submit
                  </Button>
                </div>
                <Divider sx={{ my: 3 }} />
                <div className={styles.settingContentRow}>
                  <Button
                    size="large"
                    color="primary"
                    variant="contained"
                    fullWidth
                    type="button"
                    className={styles.facebookButton}
                  >
                    <FacebookIcon sx={{ mx: 1 }} />
                    Login with Facebook
                  </Button>
                </div>
                <div>
                  <Button
                    size="large"
                    color="primary"
                    variant="contained"
                    fullWidth
                    type="button"
                    className={styles.googleButton}
                    onClick={handleLoginByGoogle}
                  >
                    <GoogleIcon sx={{ mx: 1 }} />
                    Login with Google
                  </Button>
                </div>
              </form>
            </TabPanel>
            <TabPanel value="2">
              <form onSubmit={formikRegister.handleSubmit}>
                <div className={styles.settingContentRow}>
                  <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    value={formikRegister.values.email}
                    onChange={formikRegister.handleChange}
                    error={
                      formikRegister.touched.email &&
                      Boolean(formikRegister.errors.email)
                    }
                    helperText={
                      formikRegister.touched.email &&
                      formikRegister.errors.email
                    }
                  />
                </div>
                <div className={styles.settingContentRow}>
                  <TextField
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    value={formikRegister.values.password}
                    onChange={formikRegister.handleChange}
                    error={
                      formikRegister.touched.password &&
                      Boolean(formikRegister.errors.password)
                    }
                    helperText={
                      formikRegister.touched.password &&
                      formikRegister.errors.password
                    }
                  />
                </div>
                <div className={styles.settingContentRow}>
                  <TextField
                    fullWidth
                    id="confirmPassword"
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    value={formikRegister.values.confirmPassword}
                    onChange={formikRegister.handleChange}
                    error={
                      formikRegister.touched.confirmPassword &&
                      Boolean(formikRegister.errors.confirmPassword)
                    }
                    helperText={
                      formikRegister.touched.confirmPassword &&
                      formikRegister.errors.confirmPassword
                    }
                  />
                </div>
                <div>
                  <Button
                    size="large"
                    color="primary"
                    variant="contained"
                    fullWidth
                    type="submit"
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </TabPanel>
          </TabContext>
        </Paper>
      </div>
    </Layout>
  );
};

export default LoginPage;
