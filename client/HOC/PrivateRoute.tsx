import React from 'react';
import Router from 'next/router';
import {checkUserAuthentication} from "../api/CheckUserAuthentication.api";

const loginPath = '/login'; // Define your login route address.


export default (WrappedComponent: any) => {
    const hocComponent = ({...props}) => <WrappedComponent {...props} />;

    hocComponent.getInitialProps = async (context: any) => {
        const token = context.req?.cookies?.auth || null;
        let userAuth = null;
        if (token) {
            userAuth = await checkUserAuthentication(token);
        }
        // Are you an authorized user or not?
        if (userAuth?.status !== 200) {
            // Handle server-side and client-side rendering.
            if (context.res) {
                context.res?.writeHead(302, {
                    Location: loginPath,
                });
                context.res?.end();
            } else {
                Router.replace(loginPath);
            }
        } else if (WrappedComponent.getInitialProps) {
            const wrappedProps = await WrappedComponent.getInitialProps({...context, auth: userAuth});
            return {...wrappedProps, userAuth};
        }

        return {userAuth};
    };

    return hocComponent;
};