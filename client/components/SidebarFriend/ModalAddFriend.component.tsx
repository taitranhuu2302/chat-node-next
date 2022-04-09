import React from 'react';
import {
    Alert,
    Box, Button,
    FormControl,
    IconButton,
    InputLabel,
    Modal,
    TextField,
    Typography
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import styles from '../../styles/ModalAddFriend.module.scss'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

interface IModalAddFriend {
    setOpen: (open: boolean) => void;
    open: boolean;
}

const ModalAddFriendComponent: React.FC<IModalAddFriend> = ({open, setOpen}) => {
    return <Modal
        open={open}
        onClose={() => setOpen(false)}
    >
        <Box className={styles.root}>
            <Box className={styles.header}>
                <Box className={styles.title}>
                    <PersonOutlineIcon/>
                    <Typography className={styles.text}>Add Friends</Typography>
                </Box>
                <IconButton className={styles.buttonClose} onClick={() => setOpen(false)}>
                    <CloseIcon/>
                </IconButton>
            </Box>
            <Box className={styles.content}>
                <Alert severity="info" className={styles.alert}>Send invitations to friends.</Alert>
                <form>
                    <FormControl fullWidth={true}>
                        <InputLabel shrink className={styles.label}>
                            Email addresses
                        </InputLabel>
                        <TextField type="text" className={styles.formInput} placeholder={"Email Address"}/>
                    </FormControl>
                    <Box sx={{display: 'flex', justifyContent: 'center', marginTop: "20px"}}>
                        <Button type={'submit'} variant={"outlined"} className={styles.buttonMakeFriend}>Send
                            Invitation</Button>
                    </Box>
                </form>
            </Box>
        </Box>
    </Modal>
}

export default ModalAddFriendComponent