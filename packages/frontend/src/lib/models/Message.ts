import type { SimplifiedUser } from "./User";

export interface Message {
    id: number,
    sender: SimplifiedUser,
    receiver: SimplifiedUser,
    content: string,
    /** A parsable date. */
    sentAt: string
}