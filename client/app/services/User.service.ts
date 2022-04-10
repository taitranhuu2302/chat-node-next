import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IUser} from "../models/User";
import {IResponseObject} from "../models/ResponseObject";
import Cookies from "universal-cookie";

const BASE_URL = process.env.URL_API;

interface IAddFriend {
    email: string;
}

export const userService = createApi({
    reducerPath: "userService",
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/user`,
        prepareHeaders(headers) {
            const cookies = new Cookies();
            const token = cookies.get("auth");
            if (token) headers.set('Authorization', `Bearer ${token}`);
            return headers;
        },
    }),
    tagTypes: ['IUser'],
    endpoints: (build) => ({
        getUser: build.query<IResponseObject<IUser>, void>({
            query: () => `/get-user`,
            providesTags: ['IUser'],
        }),
        addFriend: build.mutation<any, IAddFriend>({
            query: (data) => ({
                method: 'POST',
                url: `/add-friend`,
                body: data
            }),
            invalidatesTags: ['IUser'],
        })
    }),
});

export const {useGetUserQuery, useAddFriendMutation} = userService;