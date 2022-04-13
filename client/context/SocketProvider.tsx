import React, {createContext, useEffect} from 'react';
import {io} from 'socket.io-client';
import {useGetUserQuery} from "../app/services/User.service";
import {IUser} from "../app/models/User";
import {useAppDispatch} from "../app/hook";
import {addFriend, addFriendRequest, addRoom} from "../app/features/User.slice";
import {toast} from "react-toastify";
import {IRoom} from "../app/models/Room";
import {IMessage} from "../app/models/Message";
import {sendMessage} from "../app/features/Message.slice";

const URL = process.env.URL_SERVER || 'http://localhost:4000';

const socket = io(URL);

export const SocketContext = createContext(socket);

interface IProps {

}

type FriendAccept = {
    user: IUser,
    room: IRoom,
    message?: string
}

const SocketProvider: React.FC<IProps> = ({children}) => {
    const {data, refetch} = useGetUserQuery();
    const dispatch = useAppDispatch();


    useEffect(() => {
        if (data) {
            const user = {
                ...data?.body,
                rooms: data?.body?.rooms ? data?.body.rooms : []
            }
            socket.emit('user_connected', user)
        }

        socket.on('friend_pending', (data: IUser) => {
            dispatch(addFriendRequest(data))
            toast.info(`${data.email} đã gửi lời mời kết bạn`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
            })
        })

        socket.on('friend_accept', (data: FriendAccept) => {
            refetch();
            if (data.message) {
                toast.success(`${data.user.full_name} đã đồng ý lời mời kết bạn`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                })
            }
        })
        socket.on('friend_cancel', () => {
            refetch();
        })

        return () => {
            socket.off('friend_pending');
            socket.off('friend_accept');
            socket.off('friend_cancel');
        }
    }, [data])

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;