import { Room } from "./Room";

export interface User {
    id: string;
    full_name: string;
    avatar: string;
    rooms: Room[];
    friends: User[];
    friend_pending: User[];
}