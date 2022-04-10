import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IResponseListObject} from "../models/ResponseObject";
import {IMessage} from "../models/Message";
import Cookies from "universal-cookie";

const BASE_URL = process.env.URL_API;

export const messageService = createApi({
    reducerPath: "messageService",
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/message`,
        prepareHeaders(headers) {
            const cookies = new Cookies();
            const token = cookies.get("auth");
            if (token) headers.set('Authorization', `Bearer ${token}`);
            return headers;
        },
    }),
    tagTypes: ['IMessage'],
    endpoints: (build) => ({
        getMessageByRoom: build.query<IResponseListObject<IMessage>, string>({
            query: (roomId) => `/${roomId}`,
            providesTags: ['IMessage'],
        })
    }),
});

export const {useGetMessageByRoomQuery} = messageService;
