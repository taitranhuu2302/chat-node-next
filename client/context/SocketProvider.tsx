import React, {createContext, useEffect} from 'react';
import {io} from 'socket.io-client';
import {useGetUserQuery} from "../app/services/User.service";
import {IUser} from "../app/models/User";
import {useAppDispatch} from "../app/hook";
import {addFriendRequest} from "../app/features/User.slice";
import {toast} from "react-toastify";

const URL = process.env.URL_SERVER || 'http://localhost:4000';

const socket = io(URL);

export const SocketContext = createContext(socket);

interface IProps {

}

const SocketProvider: React.FC<IProps> = ({children}) => {
    const {data} = useGetUserQuery();
    const dispatch = useAppDispatch();

    useEffect(() => {

        socket.on('friend_pending', (data: IUser) => {
            dispatch(addFriendRequest(data))
            toast.info(`${data.email} sent you a friend request`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            })
        })

        return () => {
            socket.off('friend_pending');
        }
    }, [])

    useEffect(() => {
        if (data) socket.emit('user_connected', data?.body);


    }, [data])

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;