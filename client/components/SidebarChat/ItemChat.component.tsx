import {
    Avatar,
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Menu,
    MenuItem,
} from "@mui/material";
import React, {useState} from "react";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import Router from 'next/router'

export interface ItemChat {
    name: string;
    avatar: string;
    id: string;
}

const ItemChat: React.FC<ItemChat> = ({name, avatar, id}) => {
    const [anchorEl, setAnchorEl] = useState<any>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOpenRoom = async () => {
        await Router.push(`/room/${id}`)
    }

    return (
        <ListItem
            sx={{padding: "0"}}
            secondaryAction={
                <IconButton onClick={handleClick}>
                    <MoreHorizOutlinedIcon/>
                </IconButton>
            }
        >
            <ListItemButton onClick={handleOpenRoom}>
                <ListItemAvatar>
                    <Avatar src={avatar ? avatar : ""} alt="Avatar"/>
                </ListItemAvatar>
                <ListItemText primary={name}/>
            </ListItemButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>Delete</MenuItem>
            </Menu>
        </ListItem>
    );
};

export default ItemChat;