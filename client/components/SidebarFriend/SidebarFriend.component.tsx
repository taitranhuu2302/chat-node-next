import {Box, Button, Card, CardContent, List, Typography, InputBase, Tooltip} from "@mui/material";
import React, {useState} from "react";
import styles from "../../styles/SidebarFriend.module.scss";
import AddIcon from "@mui/icons-material/Add";
import ItemFriend from "./ItemFriend.component";
import ModalAddFriend from "./ModalAddFriend.component";
import {RootState} from "../../app/store";
import {useAppSelector} from "../../app/hook";

const SidebarFriend = () => {
    const [openAdd, setOpenAdd] = useState(false);
    const {user} = useAppSelector((state: RootState) => state.userSlice)

    return (
        <Card variant="outlined" className={styles.root}>
            <CardContent className={styles.cardContent}>
                <Box className={styles.cardHeader}>
                    <Typography className={styles.title}>Friends</Typography>
                    <Button className={styles.buttonAddFriend} onClick={() => setOpenAdd(true)} startIcon={<AddIcon/>}>Add
                        Friends</Button>
                    <ModalAddFriend open={openAdd} setOpen={setOpenAdd}/>
                </Box>
                <Box mb={2} className={styles.cardSearch}>
                    <InputBase className={styles.inputSearch} placeholder="Search"/>
                </Box>
                <List>
                    {user.friends.map((friend, index) => {
                        return (
                            <ItemFriend key={index} user={friend}/>
                        )
                    })}
                </List>
            </CardContent>
        </Card>
    );
};

export default SidebarFriend;