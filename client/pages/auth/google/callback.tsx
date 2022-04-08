import React, {useEffect, useState} from 'react';
import Cookies from "universal-cookie";
import LoadingComponent from "../../../components/Loading.component";
import {googleCallbackApi} from "../../../api/GoogleCallback.api";
import {useRouter} from 'next/router';

type Props = {}

const GoogleLogin: React.FC<Props> = (props) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const query = window.location.search;
        const cookies = new Cookies();

        (async () => {
            const data = await googleCallbackApi(query);
            if (data?.status === 200) {
                const {token, expires_in} = data.body;
                cookies.set('auth', token, {path: '/', expires: new Date(Date.now() + expires_in)});
                await router.replace('/');
            } else {
                await router.replace('/login');
            }
        })()
    }, [router]);

    return <>
        <LoadingComponent/>
    </>
}

export default GoogleLogin;
