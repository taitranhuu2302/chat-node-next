import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {checkUserAuthentication} from "../api/CheckUserAuthentication.api";
import Cookies from "universal-cookie";
import LoadingComponent from "../components/Loading.component";
import {useGetUserQuery} from "../app/services/User.service";

const withAuth = (WrappedComponent: any) => {
    // eslint-disable-next-line react/display-name
    return (props: any) => {
        const router = useRouter();
        // we call the api that verifies the token.
        const {isLoading, data, isSuccess} = useGetUserQuery();
        const cookie = new Cookies();

        useEffect(() => {
            (async () => {
                const accessToken = cookie.get('auth');
                // if no accessToken was found,then we redirect to "/login" page.
                if (!accessToken) {
                    await router.replace("/login");
                } else {
                    // if token was verified we set the state.
                    // if (!data) await router.replace("/login");
                }
            })()
        }, [router]);


        return <>
            {isLoading ? <LoadingComponent/> : <WrappedComponent {...props} />}
        </>
    };
};

export default withAuth;
