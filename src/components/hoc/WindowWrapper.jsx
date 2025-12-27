import useWindowStore from "#store/window";
import { use, useLayoutEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Draggable } from "gsap/all";
const WindowWrapper=(Component, windowKey)=>{
    const Wrapped=(props)=>{
        const {focusWindow, windows}=useWindowStore();
        const {isOpen, zIndex}=windows[windowKey];
        const ref=useRef(null);

        useGSAP(()=>{
            const el=ref.current;
            if(!el || !isOpen) return;

            el.style.display="block";

            // reduce final size slightly for opened windows (but keep full size when maximized)
            const targetScale = windows[windowKey]?.isMaximized ? 1 : 0.88;

            gsap.fromTo(el, {scale:0.8, opacity:0, y:40},
                {scale:targetScale, opacity:1, y:0, duration:2, ease:"power3.out"}
            )
        },[isOpen, windows[windowKey]?.isMaximized])
        useGSAP(()=>{
            const el=ref.current;
            if(!el) return;
            // create draggable only when present; note: maximizing will keep it but window styles will override drag
            const [instance]=Draggable.create(el, 
                {onPress:()=>focusWindow(windowKey),                    
                });

                return ()=>instance.kill();
        },[])

        useLayoutEffect(()=>{
            const el=ref.current;
            if(!el)return;
            // hide when closed or minimized
            if(!isOpen || windows[windowKey]?.isMinimized){
                el.style.display = 'none';
                return;
            }
            el.style.display = 'block';

            // apply maximized styles
            if(windows[windowKey]?.isMaximized){
                Object.assign(el.style, {
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    width: '100vw',
                    height: '100vh',
                    margin: '0',
                    // keep rounded corners instead of sharp rectangle
                    borderRadius: '12px',
                    overflow: 'hidden',
                });
            } else {
                // reset to default absolute positioning used by app
                el.style.position = 'absolute';
                el.style.width = '';
                el.style.height = '';
                // ensure windows have rounded corners by default
                el.style.borderRadius = '12px';
                el.style.overflow = '';
            }
        },[isOpen, windows[windowKey]?.isMinimized, windows[windowKey]?.isMaximized])

        return( <section
         id={windowKey} 
         ref={ref} 
         style={{zIndex}}
         className="absolute"
         >
            <Component {...props}/>
        </section>
        );
    };
    Wrapped.displayName= `WindowWrapper(${Component.displayName
    || Component.name || 'Component'})`
    return Wrapped;
};
export default WindowWrapper;