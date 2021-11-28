import { useDispatch, useSelector } from 'react-redux';
import {SmileIcon, DotsHorizontalIcon, ReplyIcon, TransferIcon} from '../../assets/svgs/SvgIcons'
import { showPopup } from '../redux/chat/reactionPopupSlice';
import { RootState } from '../redux/store';
import Popup from './Popup'


type props = {
    idMessage?: number,
    isFriendContent: boolean,
    setShowPopup: Function,
    type: "image" | "text" | "like"
}
const reactionType = {react:"react", replay: "reply", options: "options"} 


function MessageActions(props: props) {
    // const REACT_ICON_REF = useRef(null);
    // const OPTIONS_ICON_REF = useRef(null);
    if(props.idMessage !== undefined) {
        
    }
    const dispatch = useDispatch();
    const popup = useSelector((state: RootState) => {
        return ({
            show: state.reactionPopup.show && state.reactionPopup.idSelectedMessage === props.idMessage,
            messageType: state.reactionPopup.messageType,
            popupType: state.reactionPopup.popupType
        })
    })

    // -------------------------------- start bLabla
    const reactionHandler = (reaction: string) => {
        switch(reaction) {
            case reactionType.react:
                dispatch(showPopup({
                    idSelectedMessage: props.idMessage, 
                    messageType: props.type,
                    popupType: "react",
                }));
                break;
            case reactionType.replay:
                dispatch(showPopup({
                    idSelectedMessage: -1,
                }));
                break;
            case reactionType.options:
                dispatch(showPopup({
                    idSelectedMessage: props.idMessage, 
                    messageType: props.type,
                    popupType: "options",
                }));
                break;
            default:
                break;
        }
        
    }

    
    return (
        <div className={` flex mx-4 ${!props.isFriendContent ? "flex-row-reverse": ""} ${props.type === "image" ? "flex-col sm:flex-row" : ""}`}>
            {props.isFriendContent && <div className="relative">
                <div className=" cursor-pointer text-gray_a rounded-full overflow-hidden p-1 hover:bg-gray-300"
                        onClick={() => reactionHandler(reactionType.react)}
                >
                    {(popup.show && popup.messageType === props.type && popup.popupType === "react") && <Popup type="reaction" />}
                    <SmileIcon />
                </div>
            </div>}
            <div>
                <button className={" text-gray_a rounded-full overflow-hidden p-1 hover:bg-gray-300 " + (!props.isFriendContent ? " transform scale-x-n100 ": "") }
                    onClick={() => reactionHandler(reactionType.replay)}
                >
                    {
                        (props.type === "text") ? <ReplyIcon /> : props.type === "image" ? <TransferIcon /> : ""
                    }
                </button>
            </div>
            <div  className="relative">
                <div className=" cursor-pointer text-gray_a rounded-full overflow-hidden p-1 hover:bg-gray-300"
                    onClick={() => reactionHandler(reactionType.options)}
                >
                    {(popup.show&& popup.messageType === props.type && popup.popupType === "options") && <Popup type="options" />}
                    <DotsHorizontalIcon />
                </div>
            </div>
        </div>
    )
}

export default MessageActions



    // --------------------------------  end bLabla

/*/
    const showPopup = (iconRef:React.MutableRefObject<null>, popupParentRef: React.MutableRefObject<null> | null ) => {
        //if(parentRef && (popupParentRef === null || popupParentRef.current !== parentRef.current))
        // return false in case no ref to the icon or the popup already shown
        
        if(iconRef === null || (popupParentRef && (popupParentRef.current === iconRef.current)))
            return false;
        return true;
    }
    const reactHandler = (i: number) => {
        dispatch(setMessageIdForReaction(props.idMessage))
        dispatch(setReactionType(props.type));
        // Reaction popup
        if(i === 1) {
            const show = showPopup(REACT_ICON_REF, SINGLETON_REACTION_POPUP.parentRef)
            
            if(show) {
                SINGLETON_REACTION_POPUP.setParent(REACT_ICON_REF);
                SINGLETON_OPTIONS_POPUP.setParent(null);
                // Keep showing the popup without hover
                props.setShowPopup(true)
            }else {
                SINGLETON_REACTION_POPUP.setParent(null);
                // hide the popup 
                props.setShowPopup(false)
            }
            
        }else if(i === 3) { // Other options popup
            
            const show = showPopup(OPTIONS_ICON_REF, SINGLETON_OPTIONS_POPUP.parentRef)
            
            if(show) {
                SINGLETON_OPTIONS_POPUP.setParent(OPTIONS_ICON_REF);
                SINGLETON_REACTION_POPUP.setParent(null);
                // Keep showing the popup without hover
                props.setShowPopup(true)
            }else {
                SINGLETON_OPTIONS_POPUP.setParent(null);
                // Hide the popup 
                props.setShowPopup(false)
            }
        }else {
            // hide other popups 
            SINGLETON_REACTION_POPUP.setParent(null);
            SINGLETON_OPTIONS_POPUP.setParent(null);
            // Hide the popup 
            props.setShowPopup(false)
            // To do: show respond to the message
            //.........
        }
    };
*/