import {IUser} from "./User";

export const PRIVATE_ROOM = "PRIVATE_ROOM"
export const GROUP_ROOM = "GROUP_ROOM"

export interface IRoom {
    id: string;
    name: string;
    owner: IUser;
    members: IUser[];
    room_type: string;
}