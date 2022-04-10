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
        _id: "",
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
    reducers: {
        addFriendRequest: (state, action: PayloadAction<IUser>) => {
            state.user.friend_pending.push(action.payload);
        },
        removeFriendRequest: (state, action: PayloadAction<IUser>) => {
            state.user.friend_pending = state.user.friend_pending.filter(friend => friend._id !== action.payload._id);
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(userService.endpoints.getUser.matchFulfilled,
            (state, {payload}: PayloadAction<IResponseObject<IUser>>) => {
                state.user = payload.body;
            });
    }
});

export const {addFriendRequest, removeFriendRequest} = userSlice.actions;

export default userSlice.reducer;