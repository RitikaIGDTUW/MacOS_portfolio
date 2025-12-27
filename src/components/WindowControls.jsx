import useWindowStore from '#store/window'
import React from 'react'

const WindowControls = ({target}) => {
  const {closeWindow, minimizeWindow, toggleMaximize, restoreWindow, windows, focusWindow} = useWindowStore();
  const win = windows[target] ?? {};

  const onClose = ()=>{
    closeWindow(target);
  }
  const onMinimize = ()=>{
    // if already minimized, restore
    if(win.isMinimized) restoreWindow(target);
    else minimizeWindow(target);
  }
  const onMaximize = ()=>{
    toggleMaximize(target);
  }

  return <div id="window-controls">
    <div className='close' onClick={onClose} style={{cursor:'pointer'}}/>
    <div className='minimize' onClick={onMinimize} style={{cursor:'pointer'}}/>
    <div className='maximize' onClick={onMaximize} style={{cursor:'pointer'}}/>
  </div>
}

export default WindowControls