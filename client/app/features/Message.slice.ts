import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IMessage} from "../models/Message";
import {messageService} from "../services/Message.service";
import {IResponseListObject} from "../models/ResponseObject";

interface IState {
    messages: IMessage[];
}

const initialState: IState = {
    messages: [],
};

const messageSlice = createSlice({
    name: "messageSlice",
    initialState,
    reducers: {},
    extraReducers: (builder => {
        builder.addMatcher(messageService.endpoints.getMessageByRoom.matchFulfilled,
            (state, {payload}: PayloadAction<IResponseListObject<IMessage>>) => {
                state.messages = payload.body;
            });
    })
});

export default messageSlice.reducer;