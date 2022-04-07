import React, {useEffect} from 'react';
import Cookies from "universal-cookie";
import LoadingComponent from "../../../components/Loading.component";

type Props = {}

const GoogleLogin: React.FC<Props> = (props) => {

    useEffect(() => {
        fetch(`${process.env.URL_LOGIN_GOOGLE_CALLBACK}${window.location.search}`, {
            method: 'GET',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                // if (data.status === 200) {
                //      const cookie = new Cookies();
                //      cookie.set('token_login', data.body.token, {path: '/', expires: new Date(Date.now() + (1000 * 60 * 60 * 24))});
                //      window.location.href = '/';
                // }
            })
    }, []);

    return <><LoadingComponent/></>
}

export default GoogleLogin;
