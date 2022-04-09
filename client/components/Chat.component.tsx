import React, {useContext, useEffect, useLayoutEffect, useState} from "react";
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
import {IRoom} from "../app/models/Room";

export interface IChat {
    // room: IRoom;
    room: any;
}


const ChatComponent: React.FC<IChat> = ({room}) => {
    return (
        <Box className={styles.root}>
            <Box className={styles.chatHeader}>
                <Box className={styles.title}>
                    <Avatar src=""/>
                    <Box>
                        <Typography variant="h6">{room.name}</Typography>
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
                <Box className={styles.wrapperContentLeft}>
                    <Typography variant="caption" className={styles.username}>
                        Ralph
                    </Typography>
                    <Typography className={styles.textLeft}>
                        lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </Typography>
                </Box>
                <Box className={styles.wrapperContentRight}>
                    <Typography className={styles.username}>
                        Ralph 2
                    </Typography>
                    <Typography className={styles.textRight}>
                        lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </Typography>
                </Box>
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