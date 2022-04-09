import { Box, Card, CardContent, Stack, Typography, Tooltip, List, InputBase } from "@mui/material";
import React, {useState} from "react";
import styles from "../../styles/SidebarChat.module.scss";
import GroupsIcon from "@mui/icons-material/Groups";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import ItemChatComponent from "./ItemChat.component";
// import ModalCreateRoomComponent from "./ModelCreateRoom.component";

const ColorButton = styled(Button)<ButtonProps>(() => ({
    color: "black",
    backgroundColor: "#e6e6e6",
}));

const InputSearch = styled(InputBase)(() => ({
    backgroundColor: "#ebebeb",
    padding: 6,
    width: "100%",
    borderRadius: 4,
    color: "black",
    fontSize: "18px",
}));

const SidebarChatComponent = () => {
    const [openCreateRoom, setOpenCreateRoom] = useState(false);
    return (
        <Card variant="outlined" className={styles.root}>
            <CardContent className={styles.content}>
                <Box className={styles.cardHeader}>
                    <Typography className={styles.cardHeaderTitle}>Chats</Typography>
                    <Stack direction="row" spacing={1}>
                        <Tooltip title="New Group" placement="top">
                            <ColorButton onClick={() => setOpenCreateRoom(true)}>
                                <GroupsIcon />
                            </ColorButton>
                        </Tooltip>
                        {/*<ModalCreateRoomComponent user={{}} open={openCreateRoom} setOpen={setOpenCreateRoom} users={{}}/>*/}
                        <Tooltip title="New Chat" placement="top">
                            <ColorButton>
                                <MessageOutlinedIcon />
                            </ColorButton>
                        </Tooltip>
                    </Stack>
                </Box>
                <Box className={styles.cardSearch}>
                    <InputSearch placeholder="Search" />
                </Box>
                <List className={styles.list}>
                    <ItemChatComponent avatar={""} name={"asd"} id={"12"}/>
                </List>
            </CardContent>
        </Card>
    );
};

export default SidebarChatComponent;