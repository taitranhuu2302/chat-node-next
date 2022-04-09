import { Box, Button, Card, CardContent, List, Typography, InputBase } from "@mui/material";
import React, {useState} from "react";
import styles from "../../styles/SidebarFriend.module.scss";
import AddIcon from "@mui/icons-material/Add";
import ItemFriend from "./ItemFriend.component";
import ModalAddFriend from "./ModalAddFriend.component";

const SidebarFriend = () => {
    const [openAdd, setOpenAdd] = useState(false);

    return (
        <Card variant="outlined" className={styles.root}>
            <CardContent className={styles.cardContent}>
                <Box className={styles.cardHeader}>
                    <Typography className={styles.title}>Friends</Typography>
                    <Button className={styles.buttonAddFriend} onClick={() => setOpenAdd(true)} startIcon={<AddIcon />}>Add Friends</Button>
                    <ModalAddFriend open={openAdd} setOpen={setOpenAdd}/>
                </Box>
                <Box className={styles.cardSearch}>
                    <InputBase className={styles.inputSearch} placeholder="Search" />
                </Box>
                <List>
                    {/*<ItemFriend/>*/}
                </List>
            </CardContent>
        </Card>
    );
};

export default SidebarFriend;