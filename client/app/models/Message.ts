import {Room} from "./Room";
import {User} from "./User";

interface Message {
    room: Room,
    owner: User,
    text: string,
    image: string[],
}