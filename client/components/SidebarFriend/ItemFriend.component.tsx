import {
    Avatar,
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Menu,
    Divider,
    MenuItem, Typography, Tooltip,
} from "@mui/material";
import {styled} from "@mui/styles";
import React, {useState} from "react";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import {IUser} from "../../app/models/User";

const ListItemCustom = styled(ListItem)(() => ({
    padding: 0,
}));

export interface ItemFriend {
    user: IUser
}

const ItemFriendComponent: React.FC<ItemFriend> = ({user}) => {
    const [anchorEl, setAnchorEl] = useState<any>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <ListItemCustom
            secondaryAction={
                <IconButton onClick={handleClick}>
                    <MoreHorizOutlinedIcon/>
                </IconButton>
            }
        >
            <ListItemAvatar>
                <Avatar src={user.avatar} alt="Avatar"/>
            </ListItemAvatar>
            <Tooltip title={user.full_name}>
                <ListItemText primary={
                    <Typography
                        textOverflow={'ellipsis'}
                        overflow={'hidden'}
                        maxWidth={'100%'}
                        component={'p'}>
                        {user.full_name}
                    </Typography>
                }/>
            </Tooltip>
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
                <Divider/>
                <MenuItem onClick={handleClose}>Block</MenuItem>
            </Menu>
        </ListItemCustom>
    )
        ;
};

export default ItemFriendComponent;