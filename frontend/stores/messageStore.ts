import { create } from "zustand";
import type { Message } from "../types/message";

interface MessageState {
    messages: Message[];
    addMessage: (msg: Message) => void;
    setMessages: (msgs: Message[]) => void;
    clearMessages: () => void;
}

export const useMessageStore = create<MessageState>((set) => ({
    messages: [],
    addMessage: (msg) => set((state) => ({ messages: [msg, ...state.messages] })),
    setMessages: (msgs) => set({ messages: msgs }),
    clearMessages: () => set({ messages: [] }),
}));