import React, {useEffect, useState} from "react";
import {
    Avatar,
    Box,
    Button,
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
import {useAppSelector} from "../app/hook";
import {RootState} from "../app/store";
import {IUser} from "../app/models/User";

export interface IChat {
    room: IRoom;
}

const ChatComponent: React.FC<IChat> = ({room}) => {
    const {user} = useAppSelector((state: RootState) => state.userSlice)
    const {messages} = useAppSelector((state: RootState) => state.messageSlice);
    const [roomName, setRoomName] = useState("");
    const [roomAvatar, setRoomAvatar] = useState("");

    useEffect(() => {
        if (room.room_type === PRIVATE_ROOM) {
            const userDiff: IUser = room.members.filter(u => u._id !== user._id)[0];
            setRoomName(userDiff.full_name);
            setRoomAvatar(userDiff.avatar);
        } else {
            setRoomName(room.name)
            setRoomAvatar(room.avatar)
        }
    }, [room])


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
                {messages.map((message, index) => {
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
                })}
            </Box>
            <Box className={styles.chatFooter}>
                <form>
                    <TextField
                        variant={`outlined`}
                        className={styles.chatInput}
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