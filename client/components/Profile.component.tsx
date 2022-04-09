import React, {useEffect, useMemo, useState} from 'react';
import {
    Avatar,
    Box, Button, ButtonBase,
    FormControl,
    FormControlLabel,
    IconButton,
    Input,
    InputBase,
    InputLabel,
    Modal,
    Typography
} from "@mui/material";
import styles from '../styles/Profile.module.scss';
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import CloseIcon from '@mui/icons-material/Close';
import {styled} from "@mui/styles";
import {ButtonGreen} from "../commons/ButtonCustom";
import {InputCustomBase} from '../commons/InputCustom';
import {useAppSelector} from "../app/hook";
import {RootState} from "../app/store";
import {useForm} from "react-hook-form";
import * as yup from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";
import {TextError} from '../commons/TextCustom';

interface IProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

type Inputs = {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    avatar: string;
}

const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    fullName: yup.string().required('Full name is required'),
    phone: yup.string(),
    address: yup.string(),
})

const ProfileComponent: React.FC<IProps> = ({open, setOpen}) => {
    const {user} = useAppSelector((state: RootState) => state.userSlice)
    const {register, setValue, handleSubmit, formState: {errors}} = useForm<Inputs>({
        mode: 'onBlur',
        resolver: yupResolver(schema),
    })
    const [avatar, setAvatar] = useState(user.avatar)

    useEffect(() => {
        setValue('fullName', user.full_name)
        setValue('email', user.email)
        setValue('phone', user.phone)
        setValue('address', user.address)
        setValue('avatar', user.avatar)

    }, [user])

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
        >
            <Box className={styles.root}>
                <Box className={styles.header}>
                    <Box display={'flex'} alignItems={'center'} gap={1}>
                        <ModeEditOutlineOutlinedIcon/>
                        <Typography color={'#212529'} fontSize={20} fontWeight={'bold'} variant="h5">Profile
                            Edit</Typography>
                    </Box>
                    <IconButton onClick={() => setOpen(false)}>
                        <CloseIcon/>
                    </IconButton>
                </Box>
                <form className={styles.content}>

                    <Box className={styles.inputGroup}>
                        <label>Email</label>
                        <InputCustomBase {...register('email')} readOnly type={'email'}/>
                        {errors.email && <TextError>{errors.email.message}</TextError>}
                    </Box>
                    <Box className={styles.inputGroup}>
                        <label>Full Name</label>
                        <InputCustomBase {...register('fullName')} placeholder={"Tran Huu Tai"}/>
                    </Box>
                    {errors.fullName && <TextError>{errors.fullName.message}</TextError>}
                    <Box className={styles.inputGroup}>
                        <label>Avatar</label>
                        <Box display={'flex'} alignItems={'center'} gap={2}>
                            <Avatar src={avatar}/>
                            <InputCustomBase type={'file'}/>
                        </Box>
                    </Box>
                    <Box className={styles.inputGroup}>
                        <label>Address</label>
                        <InputCustomBase {...register('address')} placeholder={"Thanh Pho Hue"}/>
                    </Box>
                    {errors.address && <TextError>{errors.address.message}</TextError>}

                    <Box className={styles.inputGroup}>
                        <label>Phone</label>
                        <InputCustomBase {...register('phone')} placeholder={'(555) 555 55 55'}/>
                    </Box>
                    {errors.phone && <TextError>{errors.phone.message}</TextError>}
                    <Box className={styles.footer}>
                        <ButtonBase className={styles.button}>Save</ButtonBase>
                    </Box>
                </form>
            </Box>
        </Modal>
    )
}

export default ProfileComponent;