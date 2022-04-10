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
    ListItemText, Menu, MenuItem, Tooltip,
    Typography
} from "@mui/material";
import styles from "../styles/SidebarFriendRequest.module.scss";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import {IUser} from "../app/models/User";
import {useAppDispatch, useAppSelector} from "../app/hook";
import {RootState} from "../app/store";
import {useAcceptFriendRequestMutation, useRemoveFriendRequestMutation} from "../app/services/User.service";
import {removeFriendRequest} from "../app/features/User.slice";
import {toast} from "react-toastify";
import DialogConfirmComponent from "./DialogConfirm.component";


interface IItem {
    user: IUser
}

const SidebarFriendRequestComponent = () => {
    const {user} = useAppSelector((state: RootState) => state.userSlice)

    return <Card variant="outlined" className={styles.root}>
        <CardContent className={styles.cardContent}>
            <Box className={styles.cardHeader}>
                <Typography className={styles.title}>Friend Request</Typography>
            </Box>
            <Box className={styles.cardSearch}>
                <InputBase className={styles.inputSearch} placeholder="Search"/>
            </Box>
            <List className={styles.list}>
                {
                    user.friend_pending.map((friend, index) => {
                        return <Item key={index} user={friend}/>
                    })
                }
            </List>
        </CardContent>
    </Card>
}


const Item: React.FC<IItem> = ({user}) => {
    const [removeFriendRequestApi, {}] = useRemoveFriendRequestMutation();
    const [acceptFriendRequestApi, {}] = useAcceptFriendRequestMutation();
    const [openConfirmCancel, setOpenConfirmCancel] = useState(false);
    const [openConfirmAccept, setOpenConfirmAccept] = useState(false);
    const dispatch = useAppDispatch();
    const [anchorEl, setAnchorEl] = useState<any>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleRemoveFriendRequest = async (id: string) => {

        const data = {
            userId: id
        }

        await removeFriendRequestApi(data).then((res: any) => {
            if (res?.error) {
                toast.error('Remove friend request failed', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    progress: undefined,
                })
            } else {
                dispatch(removeFriendRequest(data))
                toast.success('Remove friend request success', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    progress: undefined,
                })
            }
        });

    }

    const handleAcceptFriendRequest = async (id: string) => {
        const data = {
            userId: id
        }
        await acceptFriendRequestApi(data).then((res: any) => {
            if (res?.error) {
                toast.error('Accept friend request failed', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    progress: undefined,
                })
            } else {
                toast.success('Accept friend request success', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    progress: undefined,
                })
                dispatch(removeFriendRequest(data))
            }
        });

    }

    const handleConfirmCancel = async () => {
        setOpenConfirmCancel(false)
        setAnchorEl(null);
        await handleRemoveFriendRequest(user._id);
    }

    const handleConfirmAccept = async () => {
        setOpenConfirmAccept(false)
        setAnchorEl(null)
        await handleAcceptFriendRequest(user._id);
    }


    return (
        <>
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
                <Tooltip title={user.email}>
                    <ListItemText primary={
                        <Typography
                            textOverflow={'ellipsis'}
                            overflow={'hidden'}
                            maxWidth={'80%'}
                            component={'p'}>
                            {user.email}
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
                    <MenuItem onClick={() => setOpenConfirmAccept(true)}>Accept</MenuItem>
                    <MenuItem onClick={() => setOpenConfirmCancel(true)}>Delete</MenuItem>
                </Menu>
            </ListItem>
            <DialogConfirmComponent
                open={openConfirmCancel} setOpen={setOpenConfirmCancel} handleConfirm={handleConfirmCancel}
                title={'Delete friend request'}
                message={'Are you sure you want to delete this friend request?'}
            />
            <DialogConfirmComponent
                open={openConfirmAccept} setOpen={setOpenConfirmAccept} handleConfirm={handleConfirmAccept}
                title={'Accept friend request'}
                message={'Are you sure you want to accept this friend request?'}
            />
        </>
    )
}

export default SidebarFriendRequestComponent;