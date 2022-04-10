import {IRoom} from "./Room";
import {IUser} from "./User";

export interface IMessage {
    _id: string;
    room: IRoom,
    owner: IUser,
    text: string,
    image: string[],
}