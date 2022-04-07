import React from 'react';
import {Box, Button, TextField, Typography} from "@mui/material";
import styles from "../../styles/Login.module.scss";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import Link from 'next/link'
import Head from "next/head";
import {useRouter} from "next/router";
import {NextPage} from "next";

interface Props {

}

const Login: NextPage<Props> = () => {
    const router = useRouter();

    const onLoginGoogle = async () => {
        const url = process.env.URL_LOGIN_GOOGLE || 'http://localhost:4000/auth/google';
        await router.push(url);
    }

    return (
        <>
            <Head>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                <title>Login</title>
            </Head>
            <Box className={styles.wrapperLogin}>
                <Box className={styles.formLogin}>
                    <Typography
                        variant={`h4`}
                        className={styles.title}
                        align={`center`}
                    >
                        Welcome to Chat
                    </Typography>
                    <form>
                        <TextField
                            variant={`outlined`}
                            fullWidth={true}
                            className={styles.inputForm}
                            placeholder={`Email`}
                        />
                        <TextField
                            variant={`outlined`}
                            type="password"
                            fullWidth={true}
                            className={styles.inputForm}
                            placeholder={`Password`}
                        />
                        <Box className={styles.wrapperButton}>
                            <Button type={`submit`} className={styles.btnLogin}>
                                Login
                            </Button>
                        </Box>
                    </form>
                    <Box
                        className={styles.footerLogin}
                    >
                        <Typography>Or Login with</Typography>
                        <Box className={styles.wrapperButtonFooter}>
                            <Button
                                className={styles.buttonFace}
                                variant={"outlined"}
                                startIcon={<FacebookIcon/>}
                            >
                                Facebook
                            </Button>
                            <Button
                                variant={"outlined"}
                                startIcon={<GoogleIcon sx={{color: "#dd4b39"}}/>}
                                className={styles.buttonGoogle}
                                onClick={onLoginGoogle}
                            >
                                Google
                            </Button>
                        </Box>
                        <Box mt={4}>
                            <Link href="/register">
                                <a>
                                    <Typography sx={{textDecoration: "underline", color: "#4a86e8"}}>Do not have an
                                        account?</Typography>
                                </a>
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default Login;