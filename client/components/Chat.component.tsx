import React, {useContext, useEffect, useMemo, useState} from "react";
import {
    Avatar,
    Box,
    Button, ButtonBase,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from "@mui/material";
import styles from "../styles/Chat.module.scss";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import VideocamIcon from "@mui/icons-material/Videocam";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AttachmentIcon from "@mui/icons-material/Attachment";
import MicIcon from "@mui/icons-material/Mic";
import SendIcon from "@mui/icons-material/Send";
import {IRoom, PRIVATE_ROOM} from "../app/models/Room";
import {useAppDispatch, useAppSelector} from "../app/hook";
import {RootState} from "../app/store";
import {IUser} from "../app/models/User";
import {SubmitHandler, useForm} from "react-hook-form";
import {useSendMessageMutation} from "../app/services/Message.service";
import {SocketContext} from "../context/SocketProvider";
import {IMessage} from "../app/models/Message";
import {sendMessage} from "../app/features/Message.slice";
import InfiniteScroll from "react-infinite-scroll-component";

export interface IChat {
    room: IRoom;
    onGetMore: (n: number) => void;
    totalMessage: number
}

type Inputs = {
    text: string;
}


const ChatComponent: React.FC<IChat> = ({room, onGetMore, totalMessage}) => {
    const socket = useContext(SocketContext);
    const [sendMessageApi] = useSendMessageMutation();
    const {user} = useAppSelector((state: RootState) => state.userSlice)
    const {messages} = useAppSelector((state: RootState) => state.messageSlice);
    const [roomName, setRoomName] = useState("");
    const [roomAvatar, setRoomAvatar] = useState("");
    const {register, handleSubmit, setValue} = useForm<Inputs>();
    const dispatch = useAppDispatch();

    useEffect(() => {
        socket.on('chat_message', (message: IMessage) => {
            if (message.room === room._id) {
                dispatch(sendMessage(message));
            }
        });

        return () => {
            socket.off('chat_message');
        }

    }, [socket, messages, room._id, dispatch])

    useEffect(() => {
        if (room.room_type === PRIVATE_ROOM) {
            const userDiff: IUser = room.members.filter(u => u._id !== user._id)[0];
            setRoomName(userDiff.full_name);
            setRoomAvatar(userDiff.avatar);
        } else {
            setRoomName(room.name)
            setRoomAvatar(room.avatar)
        }
    }, [room, user._id])

    const handleSendMessage: SubmitHandler<Inputs> = async (data) => {

        const request = {
            roomId: room._id,
            text: data.text,
        }

        await sendMessageApi(request).then((res: any) => {
            if (!res.error) {
                setValue("text", "");
            }
        });
    }

    const renderChat = useMemo(() => {
        return messages.map((message, index) => {
            if (message.owner._id === user._id) {
                return <Box key={index} className={styles.wrapperContentRight}>
                    <Typography className={styles.username}>
                        {message.owner.full_name}
                    </Typography>
                    <Typography className={styles.textRight}>
                        {message.text}
                    </Typography>
                </Box>
            } else {
                return <Box key={index} className={styles.wrapperContentLeft}>
                    <Typography variant="caption" className={styles.username}>
                        {message.owner.full_name}
                    </Typography>
                    <Typography className={styles.textLeft}>
                        {message.text}
                    </Typography>
                </Box>
            }
        })
    }, [messages, user._id]);

    return (
        <Box className={styles.root}>
            <Box className={styles.chatHeader}>
                <Box className={styles.title}>
                    <Avatar src={roomAvatar}/>
                    <Box>
                        <Typography variant="h6">{roomName}</Typography>
                        <Typography variant="caption">Online</Typography>
                    </Box>
                </Box>
                <Box className={styles.actions}>
                    <Button className={styles.buttonGreen}>
                        <LocalPhoneIcon/>
                    </Button>
                    <Button className={styles.buttonGray}>
                        <VideocamIcon/>
                    </Button>
                    <Button className={styles.buttonGray}>
                        <MoreHorizIcon/>
                    </Button>
                </Box>
            </Box>
            <Box className={styles.chatContent}>
                {renderChat}
                {(messages.length !== totalMessage) && <Box display={'flex'} justifyContent={'center'}>
                    <ButtonBase
                        onClick={() => onGetMore(10)}
                        sx={{padding: '6px 12px', backgroundColor: '#fff', borderRadius: '4px', fontSize: '14px'}}>
                        Xem thêm
                    </ButtonBase>
                </Box>}
            </Box>
            <Box className={styles.chatFooter}>
                <form onSubmit={handleSubmit(handleSendMessage)}>
                    <TextField
                        variant={`outlined`}
                        className={styles.chatInput}
                        {...register('text', {required: true})}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton>
                                        <AttachmentIcon/>
                                    </IconButton>
                                    <IconButton>
                                        <MicIcon/>
                                    </IconButton>
                                    <IconButton type="submit" sx={{color: "#0abb87"}}>
                                        <SendIcon/>
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </form>
            </Box>
        </Box>
    )
};

export default ChatComponent;