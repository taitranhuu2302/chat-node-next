import React, {useState} from 'react';
import {
    Autocomplete,
    Box,
    Button,
    FormControl,
    IconButton,
    InputLabel,
    Modal,
    TextField,
    Typography
} from "@mui/material";
import styles from '../styles/ModalCreateRoom.module.scss';
import GroupsIcon from '@mui/icons-material/Groups';
import CloseIcon from '@mui/icons-material/Close';

interface IModalCreateRoom {
    setOpen: (open: boolean) => void;
    open: boolean;
    users: Array<any>;
    user: any;
}


const ModalCreateRoom: React.FC<IModalCreateRoom> = ({open, setOpen, users, user}) => {
    const [members, setMembers] = useState<any>([]);

    const handleChange = (event: any, values: any) => {
        setMembers(values)
    }

    return <Modal open={open} onClose={() => setOpen(false)}>
        <Box className={styles.root}>
            <Box className={styles.header}>
                <Box sx={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                    <GroupsIcon/>
                    <Typography sx={{fontSize: '18px'}}>New Group</Typography>
                </Box>
                <IconButton onClick={() => setOpen(false)}><CloseIcon/></IconButton>
            </Box>
            <Box className={styles.content}>
                <form>
                    <FormControl fullWidth={true}>
                        <InputLabel shrink className={styles.label}>
                            Group Name
                        </InputLabel>
                        <TextField type="text" className={styles.formInput} placeholder={"Group Name"}/>
                    </FormControl>
                    <FormControl fullWidth={true}>
                        <InputLabel shrink className={styles.label}>
                            The Group Members
                        </InputLabel>
                        <Autocomplete
                            multiple
                            options={users}
                            getOptionLabel={(user) => user.email}
                            renderInput={(params) => (
                                <TextField {...params} variant="outlined"/>
                            )}
                            onChange={handleChange}
                            className={styles.formInput}
                        />
                    </FormControl>
                    <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                        <Button type="submit" variant="contained" color={"success"}>Create Group</Button>
                    </Box>
                </form>
            </Box>
        </Box>
    </Modal>
}

export default ModalCreateRoom