import React from "react";
import {wrapper} from "../../app/store";
import {GetServerSideProps} from "next";
import MainLayout from "../../layouts/MainLayout";
import Head from "next/head";
import ChatComponent from "../../components/Chat.component";
import withAuth from "../../HOC/withAuth";

export interface IRoomChat {
    id: string;
}

const RoomChat: React.FC<IRoomChat> = ({id}) => {
    return (
        <>
            <Head>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                <title>Chat Room</title>
            </Head>
            <MainLayout>
                <ChatComponent room={{name: "Ralph"}}/>
            </MainLayout>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ({query}) => {
    const id = query.id;
    return {
        props: {
            id,
        },
    };
};

export default withAuth(RoomChat);