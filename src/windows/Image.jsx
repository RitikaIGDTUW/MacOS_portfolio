import WindowWrapper from "#components/hoc/WindowWrapper";
import { WindowControls } from "#components";
import React from "react";
import useWindowStore from "#store/window";


const ImageWindowContent=()=>{
    const {windows}=useWindowStore();
    const data=windows.imgfile?.data;
    if(!data) return null;
    const {name, imageUrl}=data;
    return(
        <>
        <div id="window-header">
            <WindowControls target="imgfile" />
            <h2>{name}</h2>
        </div>
        <div className="p-5 font-medium space-y-6 bg-white shadow-[inset_0_0_30px_rgba(120,72,38,0.5)]">
            {imageUrl?(
                <div className="w-full">
                    <img src={imageUrl} alt={name} className="w-full h-auto max-h-[80vh] object-contain rounded"/>

                </div>
            ):null}
        </div>
        </>
    )
}
const ImageWindow= WindowWrapper(ImageWindowContent, "imgfile");

export default ImageWindow;