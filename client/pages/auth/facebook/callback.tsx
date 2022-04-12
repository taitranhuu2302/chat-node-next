import React, {useEffect} from 'react';
import Cookies from "universal-cookie";
import LoadingComponent from "../../../components/Loading.component";
import {useRouter} from 'next/router';

type Props = {}

const FacebookLogin: React.FC<Props> = (props) => {
    const router = useRouter();

    useEffect(() => {
        const query = window.location.search;
        const cookies = new Cookies();

        (async () => {
            try {
                await fetch(`${process.env.URL_LOGIN_FACEBOOK_CALLBACK}${query}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then(response => response.json())
                    .then(async (data) => {
                        if (data?.status === 200) {
                            const {token, expires_in} = data.body;
                            await cookies.set('auth', token, {path: '/', expires: new Date(Date.now() + expires_in)});
                            await router.push('/');
                        } else {
                            await router.replace('/login');
                        }
                    })
            } catch (e) {
                console.log(e);
            }
        })()
    }, []);

    return <>
        <LoadingComponent/>
    </>
}

export default FacebookLogin;
