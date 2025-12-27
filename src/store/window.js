import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "#constants";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const useWindowStore = create(
    immer((set)=>({    
    windows: WINDOW_CONFIG,
    nextZIndex: INITIAL_Z_INDEX+1,
    openWindow: (windowKey, data=null)=>set((state)=>{
        const win=state.windows[windowKey];
        win.isOpen=true;
        win.zIndex=state.nextZIndex;
        win.data=data ?? win.data;
        // opening a window should restore it from minimized state
        win.isMinimized = false;
        state.nextZIndex+=1;
    }),
    closeWindow: (windowKey)=>set((state)=>{
        const win=state.windows[windowKey];
        win.isOpen=false;
        win.zIndex=INITIAL_Z_INDEX
        win.data=null;
        // reset minimize/maximize when closed
        win.isMinimized = false;
        win.isMaximized = false;
        
    }),
    focusWindow: (windowKey)=>set((state)=>{
        const win=state.windows[windowKey];
        win.zIndex=state.nextZIndex;
        state.nextZIndex+=1;
    }),
    minimizeWindow: (windowKey)=>set((state)=>{
        const win = state.windows[windowKey];
        if(!win) return;
        win.isMinimized = true;
    }),
    restoreWindow: (windowKey)=>set((state)=>{
        const win = state.windows[windowKey];
        if(!win) return;
        win.isMinimized = false;
        win.isMaximized = false;
        win.isOpen = true;
        win.zIndex = state.nextZIndex;
        state.nextZIndex += 1;
    }),
    toggleMaximize: (windowKey)=>set((state)=>{
        const win = state.windows[windowKey];
        if(!win) return;
        win.isMaximized = !win.isMaximized;
        // if maximizing, ensure it's not minimized and bring to front
        if(win.isMaximized){
            win.isMinimized = false;
            win.isOpen = true;
            win.zIndex = state.nextZIndex;
            state.nextZIndex += 1;
        }
    }),
    
})),
);

export default useWindowStore;