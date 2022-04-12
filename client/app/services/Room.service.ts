import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import Cookies from "universal-cookie";
import {IRoom} from "../models/Room";
import {IResponseObject} from "../models/ResponseObject";

const BASE_URL = process.env.URL_API;

export const roomService = createApi({
    reducerPath: "roomService",
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/room`,
        prepareHeaders(headers) {
            const cookies = new Cookies();
            const token = cookies.get("auth");
            if (token) headers.set('Authorization', `Bearer ${token}`);
            return headers;
        },
    }),
    tagTypes: ['IRoom'],
    endpoints: (build) => ({
        getRoom: build.query<IResponseObject<{
            room: IRoom
            total_message: number
        }>, string>({
            query: (id) => `/${id}`,
            providesTags: ['IRoom'],
        })
    })
})

export const {useGetRoomQuery} = roomService;
