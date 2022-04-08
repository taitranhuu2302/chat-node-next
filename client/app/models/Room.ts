import {User} from "./User";

export const PRIVATE_ROOM = "PRIVATE_ROOM"
export const GROUP_ROOM = "GROUP_ROOM"

export interface Room {
    id: string;
    name: string;
    owner: User;
    members: User[];
    room_type: string;
}