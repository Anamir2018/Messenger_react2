import react, {useRef, useEffect} from 'react'
import { JsxChild } from 'typescript'

type popupObj = {
    parentRef: react.MutableRefObject<null> | null,
    elementRef: react.MutableRefObject<null> | null,
    setParent: Function,
    Element: Function,
}
const POPUP_OBJECT: popupObj = {
    parentRef: null,
    elementRef: null,
    setParent: function(ref: react.MutableRefObject<null> ) {
        
        if(this.elementRef !== null) {
            if(ref && ref.current) {
                // @ts-ignore: Object is possibly 'null'.
                if(ref.current !== this.elementRef.current.parentNode) {
                    
                    // @ts-ignore: Object is possibly 'null'.
                    ref.current.prepend(this.elementRef.current)
                    // @ts-ignore: Object is possibly 'null'.
                    this.elementRef.current.style.display = "block";
                    this.parentRef = ref;
                }else{
                    // @ts-ignore: Object is possibly 'null'.
                    this.elementRef.current.style.display = "none";
                    this.parentRef = null;
                    // @ts-ignore: Object is possibly 'null'.
                    document.body.prepend(this.elementRef.current)
                }
            }else {
                // @ts-ignore: Object is possibly 'null'.
                this.elementRef.current.style.display = "none";
                this.parentRef = null;
                // @ts-ignore: Object is possibly 'null'.
                document.body.prepend(this.elementRef.current)
            } 
        }
        
        //REACTION_POPUP.elementRef.current.parentNode = ref.current;
    },
    Element: function(props: {className: string, children: JsxChild, objRef: popupObj}) {
        props.objRef.elementRef = useRef(null);
        return (
            <div ref={props.objRef.elementRef} className={props.className}>
                {props.children}
            </div>
        )
    }
}

export const SINGLETON_REACTION_POPUP = Object.assign({},POPUP_OBJECT);
export const SINGLETON_OPTIONS_POPUP = Object.assign({},POPUP_OBJECT);
export const SINGLETON_IMAGE_VIEWER = Object.assign({},POPUP_OBJECT);




// const REACTION_POPUP: popupObj = {
//     parentRef: null,
//     elementRef: null,
//     setParent: (ref: react.MutableRefObject<null> ) => {
//         console.log(ref);
//         if(REACTION_POPUP.elementRef !== null) {
//             if(ref && ref.current) {
//                 // @ts-ignore: Object is possibly 'null'.
//                 if(ref.current !== REACTION_POPUP.elementRef.current.parentNode) {
//                     // @ts-ignore: Object is possibly 'null'.
//                     ref.current.prepend(REACTION_POPUP.elementRef.current)
//                     // @ts-ignore: Object is possibly 'null'.
//                     REACTION_POPUP.elementRef.current.style.display = "block";
//                 }else{
//                     // @ts-ignore: Object is possibly 'null'.
//                     REACTION_POPUP.elementRef.current.style.display = "none";
//                 }
//             }else {
//                 // @ts-ignore: Object is possibly 'null'.
//                 REACTION_POPUP.elementRef.current.style.display = "none";
//             } 
//         }
        
//         //REACTION_POPUP.elementRef.current.parentNode = ref.current;
//     },
//     Element: () => {
//         REACTION_POPUP.elementRef = useRef(null);
//         return (
//             <div ref={REACTION_POPUP.elementRef} className="absolute -top-5 left-1/2 hidden">
//                 <ul className=" absolute  bottom-0 left-0 bg-white transform -translate-x-1/2 px-4 py-2 flex items-center rounded-full z-10">
//                     {
//                         REACTION_ICONS.map((icon, index) => <ReactionIcon key={index} url={icon} />)
//                     }
//                 </ul>
//                 <span className="absolute bottom-0 left-0 h-6 w-6 bg-white -rotate-45 transform -translate-x-3 translate-y-3 z-0"></span>
//             </div>
//         )
//     }
// }

// function ReactionIcon(props: {url: string}) {
//     return(
//         <button className="w-7 mx-1">
//             <img className="w-7" src={props.url} alt="reaction" />
//         </button>
//     )
// }
// export default REACTION_POPUP;

// //------------------------------------------------------ Actions popup -----------------
// export const OPTIONS_POPUP: popupObj = {
//     parentRef: null,
//     elementRef: null,
//     setParent: (ref: react.MutableRefObject<null> ) => {
//         console.log(ref);
//         if(OPTIONS_POPUP.elementRef !== null) {
//             if(ref && ref.current) {
//                 // @ts-ignore: Object is possibly 'null'.
//                 if(ref.current !== OPTIONS_POPUP.elementRef.current.parentNode) {
//                     // @ts-ignore: Object is possibly 'null'.
//                     ref.current.prepend(OPTIONS_POPUP.elementRef.current)
//                     // @ts-ignore: Object is possibly 'null'.
//                     OPTIONS_POPUP.elementRef.current.style.display = "block";
//                 }else{
//                     // @ts-ignore: Object is possibly 'null'.
//                     OPTIONS_POPUP.elementRef.current.style.display = "none";
//                 }
//             }else {
//                 // @ts-ignore: Object is possibly 'null'.
//                 OPTIONS_POPUP.elementRef.current.style.display = "none";
//             } 
//         }
        
//         //REACTION_POPUP.elementRef.current.parentNode = ref.current;
//     },
//     Element: () => {
//         OPTIONS_POPUP.elementRef = useRef(null);
//         return (
//             <div ref={OPTIONS_POPUP.elementRef} className="absolute -top-5 left-1/2 hidden">
//                 <div className=" absolute  bottom-0 left-0 bg-white text-gray-500 transform -translate-x-1/2 p-1 flex items-center rounded-full z-10">
//                     <button className=" px-3 py-1 hover:bg-gray-200 rounded-xl">Delete</button>
//                     <button className=" px-3 py-1 hover:bg-gray-200 rounded-xl">Transfer</button>
//                 </div>
//                 <span className="absolute bottom-0 left-0 h-6 w-6 bg-white -rotate-45 transform -translate-x-3 translate-y-3 z-0"></span>
//             </div>
            
//         )
//     }
// }