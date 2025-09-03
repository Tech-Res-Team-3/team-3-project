import { create } from "zustand";

interface MessageState {
    messages: any[];
    addMessage: (msg: any) => void;
    setMessages: (msgs: any[]) => void;
    clearMessages: () => void;
}

export const useMessageStore = create<MessageState>((set) => ({
    messages: [],
    addMessage: (msg) => set((state) => ({ messages: [msg, ...state.messages] })),
    setMessages: (msgs) => set({ messages: msgs }),
    clearMessages: () => set({ messages: [] }),
}));