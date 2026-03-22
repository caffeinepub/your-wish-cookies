import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Message {
    role: string;
    text: string;
    timestamp: Time;
}
export type Time = bigint;
export interface Cookie {
    id: bigint;
    name: string;
    description: string;
    category: string;
    price: string;
}
export interface backendInterface {
    getAllCookies(): Promise<Array<Cookie>>;
    getChatHistory(): Promise<Array<Message>>;
    getCookieById(id: bigint): Promise<Cookie | null>;
    sendChatMessage(message: string): Promise<string>;
}
