import React from 'react';
import {Box, ButtonBase, Checkbox, Divider, FormControlLabel, IconButton, Typography} from "@mui/material";
import styles from "../../styles/Login.module.scss";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import Link from 'next/link'
import Head from "next/head";
import {useRouter} from "next/router";
import {NextPage} from "next";
import Image from 'next/image'
import {styled} from "@mui/system";

interface Props {

}

const Login: NextPage<Props> = () => {
    const router = useRouter();

    const onLoginGoogle = async () => {
        const URL: string = process.env.URL_LOGIN_GOOGLE || 'http://localhost:4000/auth/google';
        await router.push(URL);
    }

    return (
        <>
            <Head>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                <title>Login</title>
            </Head>
            <Box className={styles.wrapper}>
                <form className={styles.wrapperForm}>
                    <Box className={styles.wrapperLogo}>
                        <Image src='/images/LogoLogin.png' width={50} height={50} alt={'Logo'}/>
                    </Box>
                    <Box className={styles.wrapperTitle}>
                        <Typography fontSize={20} color={'darkslategray'}>Sign In</Typography>
                    </Box>
                    <Box>
                        <Input type="text" placeholder='Email'/>
                        <Input type="password" placeholder='Password'/>
                    </Box>
                    <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                        <FormControlLabel label={'Remember Me'} control={<Checkbox color="success"/>}/>
                        <Link href="/login">
                            <a>
                                <Typography>Forgot Password ?</Typography>
                            </a>
                        </Link>
                    </Box>
                    <Box mb={3}>
                        <ButtonBase className={styles.buttonSubmit}>Sign In</ButtonBase>
                    </Box>
                    <Divider/>
                    <Box my={2}>
                        <Typography fontSize={14} color={'gray'} component={'span'}>
                            Login with your social media account.
                        </Typography>
                        <Box mt={2}>
                            <IconButton onClick={onLoginGoogle} color={'error'}>
                                <GoogleIcon fontSize={'large'}/>
                            </IconButton>
                        </Box>
                    </Box>
                    <Divider/>
                    <Box mt={1}>
                        <Link href="/register">
                            <a>
                                <Typography fontSize={15} color={'gray'} component={'span'}>
                                    Dont have an account?
                                </Typography>
                            </a>
                        </Link>
                    </Box>
                </form>
            </Box>
        </>
    );
};

const Input = styled('input')({
    width: '100%',
    height: '50px',
    borderRadius: '5px',
    border: '1px solid #dcdcdc',
    paddingLeft: '10px',
    marginBottom: '20px',
    fontSize: '16px',
    '&:focus': {
        outline: 'none',
        border: '2px solid #3DB16B'
    }
})

export default Login;