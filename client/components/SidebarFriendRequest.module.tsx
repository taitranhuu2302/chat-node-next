import React, {useState} from 'react';
import {
    Avatar,
    Box,
    Card,
    CardContent, IconButton,
    InputBase,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText, Menu, MenuItem,
    Typography
} from "@mui/material";
import styles from "../styles/SidebarFriendRequest.module.scss";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";

const SidebarFriendRequestComponent = () => {

    return <Card variant="outlined" className={styles.root}>
        <CardContent className={styles.cardContent}>
            <Box className={styles.cardHeader}>
                <Typography className={styles.title}>Friend Request</Typography>
            </Box>
            <Box className={styles.cardSearch}>
                <InputBase className={styles.inputSearch} placeholder="Search"/>
            </Box>
            <List className={styles.list}>

            </List>
        </CardContent>
    </Card>
}

const Item = ({user}: any) => {
    const [anchorEl, setAnchorEl] = useState<any>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <ListItem
            sx={{padding: 0}}
            secondaryAction={
                <IconButton onClick={handleClick}>
                    <MoreHorizOutlinedIcon/>
                </IconButton>
            }
        >
            <ListItemAvatar>
                <Avatar src={user.avatar || ""}/>
            </ListItemAvatar>
            <ListItemText
                primary={user.email}
            />
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <MenuItem onClick={() => handleClose}>Accept</MenuItem>
                <MenuItem onClick={() => handleClose}>Delete</MenuItem>
            </Menu>
        </ListItem>
    )
}

export default SidebarFriendRequestComponent;