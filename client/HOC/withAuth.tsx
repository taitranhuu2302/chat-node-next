import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { checkUserAuthentication } from "../api/CheckUserAuthentication.api";
import Cookies from "universal-cookie";
import LoadingComponent from "../components/Loading.component";

const withAuth = (WrappedComponent: any) => {
    // eslint-disable-next-line react/display-name
    return (props: any) => {
        const Router = useRouter();
        const [verified, setVerified] = useState(false);
        const cookie = new Cookies();

        const handle = async () => {
            const accessToken = cookie.get('auth');
            // if no accessToken was found,then we redirect to "/" page.
            if (!accessToken) {
                Router.replace("/login");
            } else {
                // we call the api that verifies the token.
                const response = await checkUserAuthentication(accessToken);
                // if token was verified we set the state.
                if (response?.status === 200) {
                    setVerified(true);
                } else {
                    // If the token was fraud we first remove it from localStorage and then redirect to "/"
                    Router.replace("/login");
                }
            }
        }
        useEffect(() => {
            handle();
            console.log(verified)
        }, []);

        if (verified) {
            return <WrappedComponent {...props} />;
        } else {
            return <LoadingComponent />;
        }
    };
};

export default withAuth;
