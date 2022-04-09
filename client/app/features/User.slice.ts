import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../models/User";
import {IRoom} from "../models/Room";
import {userService} from "../services/User.service";
import {IResponseObject} from "../models/ResponseObject";

interface IState {
    user: IUser
}

const initialState: IState = {
    user: {
        id: "",
        email: "",
        full_name: "",
        address: "",
        phone: "",
        avatar: "",
        rooms: [],
        friends: [],
        friend_pending: [],
    }
};

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(userService.endpoints.getUser.matchFulfilled,
            (state, {payload}: PayloadAction<IResponseObject<IUser>>) => {
                state.user = payload.body;
            });
    }
});

export default userSlice.reducer;