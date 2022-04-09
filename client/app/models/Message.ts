import {IRoom} from "./Room";
import {IUser} from "./User";

interface IMessage {
    room: IRoom,
    owner: IUser,
    text: string,
    image: string[],
}