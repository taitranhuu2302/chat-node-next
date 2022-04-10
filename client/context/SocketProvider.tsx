import React, {createContext, useEffect} from 'react';
import {io} from 'socket.io-client';
import {useGetUserQuery} from "../app/services/User.service";
import {IUser} from "../app/models/User";
import {useAppDispatch} from "../app/hook";
import {addFriend, addFriendRequest, addRoom} from "../app/features/User.slice";
import {toast} from "react-toastify";
import {IRoom} from "../app/models/Room";

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
    const {data} = useGetUserQuery();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (data) {
            const user = {
                ...data?.body,
                rooms: data?.body?.rooms ? data?.body.rooms : []
            }
            socket.emit('user_connected', user)
        };

        socket.on('friend_pending', (data: IUser) => {
            dispatch(addFriendRequest(data))
            toast.info(`${data.email} sent you a friend request`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
            })
        })

        socket.on('friend_accept', (data: FriendAccept) => {
            dispatch(addRoom(data.room));
            dispatch(addFriend(data.user));
            if (data.message) {
                toast.success(data.message, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                })
            }
        })

        return () => {
            socket.off('friend_pending');
            socket.off('friend_accept');
        }
    }, [data])

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;