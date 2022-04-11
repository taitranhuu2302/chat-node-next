import React, {useEffect} from "react";
import {wrapper} from "../../app/store";
import {GetServerSideProps} from "next";
import MainLayout from "../../layouts/MainLayout";
import Head from "next/head";
import ChatComponent from "../../components/Chat.component";
import withAuth from "../../HOC/withAuth";
import {useGetMessageByRoomQuery} from "../../app/services/Message.service";
import {IRoom} from "../../app/models/Room";
import LoadingComponent from "../../components/Loading.component";
import {useGetRoomQuery} from "../../app/services/Room.service";

export interface IRoomChat {
    id: string
}

const RoomChat: React.FC<IRoomChat> = ({id}) => {
    const {refetch, data: responseMessage} = useGetMessageByRoomQuery(id);
    const {data, isLoading} = useGetRoomQuery(id);

    useEffect(() => {
        refetch();
    }, [id, refetch])

    return (
        <>
            <Head>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                <title>Chat Room</title>
            </Head>
            <MainLayout>
                {isLoading ? <LoadingComponent/> : (data && <ChatComponent room={data.body}/>)}
            </MainLayout>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ({query}) => {
    const id = query.id;

    return {
        props: {
            id
        },
    };
};

export default withAuth(RoomChat);