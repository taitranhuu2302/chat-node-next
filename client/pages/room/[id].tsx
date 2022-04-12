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
import Router from "next/router";
import InfiniteScroll from "react-infinite-scroll-component";

export interface IRoomChat {
    id: string
}

const RoomChat: React.FC<IRoomChat> = ({id}) => {
    const [limit, setLimit] = React.useState(10);
    const {refetch: refetchMessage, data: responseMessage} = useGetMessageByRoomQuery({
        roomId: id,
        limit
    });
    const {data, refetch: refetchRoom, isLoading} = useGetRoomQuery(id);
    useEffect(() => {
        refetchMessage();
        refetchRoom()
    }, [id, refetchMessage, refetchRoom]);

    const onGetMore = (n: number) => {
        setLimit(limit + n);
        refetchMessage();
    }


    return (
        <>
            <Head>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                <title>Chat Room</title>
            </Head>
            <MainLayout>
                {isLoading ? <LoadingComponent/> : (data && <ChatComponent onGetMore={onGetMore} room={data.body.room} totalMessage={data.body.total_message}/>)}
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