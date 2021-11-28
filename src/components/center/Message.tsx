import React, { useEffect, useState } from 'react'
import {AvatarIcon} from '../../assets/svgs/SvgIcons'
import Reaction from './Reaction'
import MessageActions from './MessageActions'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { showImageViewer } from '../redux/imageViewer/imageViewerSlice'
import { messageType } from '../redux/types'

type props = {
    data: messageType,
    borderRadius: string,
    showTime: boolean,
    isLastRead: boolean,
    lastUserMessageReadRef?: React.MutableRefObject<null>,
}
function Message(props: props) {
    useEffect(() => {
        if(props.lastUserMessageReadRef && props.lastUserMessageReadRef.current) {
            // @ts-ignore: Object is possibly 'null'.
            props.lastUserMessageReadRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }, [])
    const showPopupState= useState(false);
    const user = useSelector((state: RootState) => state.user)
    const selectedfriend = useSelector((state: RootState) => state.friends.list.filter(friend => friend.id === state.friends.selectedFriendId)[0])
    return (
        <div className="w-full flex flex-col overflow-hidden" ref={props.lastUserMessageReadRef}>
            {props.showTime && <Time time={props.data.time} />}
            <div className={"flex  " + (!props.data.isFriendMessage ? " flex-row-reverse " : "")}>
                <Avatar src={selectedfriend.avatar} isLastRead={props.isLastRead}  isFriend={props.data.isFriendMessage} />
                <div className="flex-auto">
                    {
                        (props.data.text === "" && props.data.sharedImage === "") ? 
                            <SharedImage 
                                    idMessage={props.data.id}
                                    src={"/images/like.png"}
                                    isFriendMessage={props.data.isFriendMessage} 
                                    showPopupState={showPopupState}
                                    isLikeMessage={true}
                            /> 
                        :
                        <>
                            <Content 
                                idMessage={props.data.id}
                                content={props.data.text} 
                                isFriendMessage={props.data.isFriendMessage}
                                borderRadius = {props.borderRadius}
                                reaction={props.data.reactionText}
                                showPopupState={showPopupState}
                                />
                            <SharedImage 
                                idMessage={props.data.id}
                                src={props.data.sharedImage}
                                isFriendMessage={props.data.isFriendMessage} 
                                showPopupState={showPopupState}
                                reaction={props.data.reactionSharedImage}
                            />
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default React.memo(Message)

function SharedImage(props: {idMessage?: number, src: string|undefined, isFriendMessage: boolean, showPopupState: [boolean, Function], reaction?: number, isLikeMessage?: boolean}) {
    const dispatch = useDispatch();

    const showPopup = useSelector((state: RootState) => 
        (state.reactionPopup.show &&
        (state.reactionPopup.idSelectedMessage === props.idMessage) &&
        (state.reactionPopup.messageType === "image"))
    )
    const clickHandler = () => {
        dispatch(showImageViewer(props.src || ""))
    }
    return (
        <>
            {props.src && <div className={" group flex items-center" + (!props.isFriendMessage ? "  flex-row-reverse " : "")}>
                {
                    props.isLikeMessage ?
                    <img className={` w-10 inline-block  ${!props.isFriendMessage ? "transform scale-x-n100" : ""}`} src={props.src} alt="like"/>
                    : <>
                        <img 
                            className={" cursor-pointer inline-block max-w-70 sm:max-w-37.84 " + (props.isFriendMessage ? " rounded-tr-xl rounded-br-xl sm:rounded-tr-3xl sm:rounded-br-3xl " : " rounded-tl-xl rounded-bl-xl sm:rounded-tl-3xl sm:rounded-bl-3xl ")} src={props.src} 
                            alt="shared" 
                            onClick={clickHandler}
                        />
                        {(props.reaction !== undefined) && <span className={"inline-block self-end text-gray_a "}>
                            <Reaction value={props.reaction} />
                        </span>}
                    </>
                }
                <div className={` opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out ${showPopup ? "opacity-100":""} `}>
                    <MessageActions
                        idMessage= {props.idMessage}
                        setShowPopup= {props.showPopupState[1]}
                        isFriendContent={props.isFriendMessage} 
                        type={!props.isLikeMessage ? "image" : "like"}
                    />

                </div>
            </div>}
        </>
)
}

function Content(props: {idMessage?: number, content: string, isFriendMessage: boolean, borderRadius: string, reaction?: number, showPopupState: [boolean, Function]}) {
    const colorChat = useSelector((state: RootState) => state.friends.colorChat)
    const showPopup = useSelector((state: RootState) =>
        (state.reactionPopup.show &&
        (state.reactionPopup.idSelectedMessage === props.idMessage) &&
        (state.reactionPopup.messageType === "text"))
    )
    const searchMessage: string = useSelector((state: RootState) => state.chat.searchConversation);
    useEffect(() => {
        console.log("searchMessage", searchMessage);
        
    }, [searchMessage])
    let TextContent = () => {
        if(searchMessage.trim() !== "") {
            const text: string = props.content;
            if(text.toLowerCase().includes(searchMessage.trim().toLowerCase())) {
                const index = text.toLowerCase().indexOf(searchMessage.trim().toLowerCase());
                if(index > -1){
                    let textStart = ""; 
                    if(index !== 0)
                        textStart = text.slice(0, index);
                    
                    const textSearch = text.slice(index, index + searchMessage.length);
                    const textEnd = text.slice(index + searchMessage.length)
                    
                    return (<>
                        {textStart}<span className=" text-red-600 bg-yellow-300 inline-block">{textSearch}</span>{textEnd}
                    </>)
                    
                }
            } 
        }
        return <>{props.content}</>
    };

    return (
        <>
            {props.content && <div className= {" group mb-3.2 flex items-center " + (props.isFriendMessage ? " text-white " : " text-gray_4 text-right flex-row-reverse ")}> 
                <p className={props.borderRadius + " inline-block px-2 py-2 sm:px-5.11 sm:py-3 "}
                    style={{backgroundColor: props.isFriendMessage ? colorChat : "white"}}
                >
                    {<TextContent />}
                </p>
                {(props.reaction !== undefined) && <span className={"inline-block self-end text-gray_a "}>
                    <Reaction value={props.reaction} />
                </span>}
                <div className={` opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out ${showPopup ? "opacity-100":""} `}>
                    <MessageActions 
                        idMessage= {props.idMessage}
                        setShowPopup={props.showPopupState[1]} 
                        isFriendContent={props.isFriendMessage} 
                        type="text"
                    />
    
                </div>
            </div>}
        </>
    )
}

function Avatar(props:{src?: string, isFriend?: boolean, isLastRead: boolean}) {
    const {src, isFriend, isLastRead} = props;
    console.log(!props.isFriend && props.isLastRead);
    
    return (
        <div className={"self-end " + (!props.isFriend ? " w-6 sm:w-8.33 pl-3.3 " : " px-1 sm:px-3.92 ") }>
            {
                src ? (isFriend || isLastRead ? <img 
                                className={"rounded-full  w-4 " + (isFriend ? " sm:w-8.29 " : "") }
                                src={src} 
                                alt="avatar" 
                        /> : "")
                    :  
                        (isFriend || isLastRead ? <AvatarIcon w={isFriend ? "w-6 sm:w-8.29" : "w-4"}
                        h={isFriend ? "w-6 sm:h-8.29" : "h-4"}
                        />: "")
                        
            }
        </div>
    )
}
function Time(props:{time: number}) {
    return(
        <p className="text-center text-gray_a py-5.37"> {formatDate(props.time)} </p>
    )
}
function formatDate(timestamp: number) {
    if(Date.now() - timestamp < 60000)
        return "now";
    const time = new Date(timestamp)
    const day = time.getDate() > 9 ? time.getDate() : "0"+time.getDate();
    const month = (time.getMonth()+1) > 9 ? (time.getMonth()+1) : "0"+(time.getMonth()+1);
    const year = time.getFullYear();
    const hours = time.getHours() > 9 ? time.getHours() : "0"+time.getHours();
    const minutes = time.getMinutes() > 9 ? time.getMinutes() : "0"+time.getMinutes();

    return (day  + "-" + month + "-" + year + " " + hours + ":" + minutes);
}