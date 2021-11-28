import React, { useEffect, useRef, useState } from 'react'
import Header from './Header'
import {AttachIcon, LikeIcon} from '../../assets/svgs/SvgIcons'
import Message from './Message';
import IsFriendTyping from './IsFriendWriting';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import {addNewMessage, setAction, setChatMessages, updateMessageToBeRead} from '../redux/chat/chatSlice'
import {supabase} from '../../supabase/supabaseClient'
import Loading from '../helpers/Loading';
import { messageType } from '../redux/types';
import { setColorChat, setIsFriendWriting, setIsFriendWritingTimeout } from '../redux/friends/friendsSlice';
import { RealtimeSubscription } from '@supabase/realtime-js';

type props = {
    isRightClosedState: [boolean, Function], 
    isMobileScreenState: [boolean, Function],
}

function Center(props: props) {
    const dispatch = useDispatch();
    const chat = useSelector((state: RootState) => state.chat.messages);
    const user = useSelector((state: RootState) => state.user.user);
    const selectedFriendId = useSelector((state: RootState) => state.friends.selectedFriendId);
    const actionType = useSelector((state: RootState) => state.chat.action)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const chatContainerRef = useRef(null);
    const lastUserMessageReadRef = useRef(null);
    
    useEffect(()=> {
        // Scroll to the end of the chat when the user add a new message
        if(chat.length > 0 && !chat[chat.length-1].isFriendMessage && actionType === "newMessage" && chatContainerRef.current !== null) {
            // @ts-ignore: Object is possibly 'null'.
            chatContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
        }
    }, [chat])


    const setMessageReadDb = async (id?: number) => {
        if(id) {
            await supabase.from('messages')
                            .update({ is_read: true })
                            .eq('id', id);
        }
        
    }
    const getChat = async (update?: boolean) => {
        !update && setLoading(true);
        const { data, error } = await supabase.from('messages').select("*")
                                                .order('time', { ascending: true })
        if(error) {
            setError(error.message)
        }else if(data) {
            let messages = data.filter((message) => 
            (message.id_sender === user?.id && message.id_reciever === selectedFriendId)||
            (message.id_sender === selectedFriendId && message.id_reciever === user?.id))
            messages = messages.map(message => {
                const newMsg: messageType = {
                    id: message.id,
                    isFriendMessage: message.id_sender === selectedFriendId,
                    isRead: message.is_read,
                    time: message.time,
                    text: message.text,
                    reactionText: message.reaction_text,
                    sharedImage: message.shared_image,
                    reactionSharedImage: message.reaction_shared_image,
                }
                return (newMsg)
            })
            dispatch(setChatMessages(messages))
        }
        !update && setLoading(false);
    }
    useEffect(()=> {
        async function getColorChat() {
            let { data } = await supabase.from('friends').select('*')
            if(data) {
                const friendShipData = data.filter(element => 
                    (element.id_user1 === user?.id && element.id_user2 === selectedFriendId)||
                    (element.id_user2 === user?.id && element.id_user1 === selectedFriendId)
                    )
                    
                    if(friendShipData.length > 0) {
                        const color = (friendShipData[0].id_user1 === user?.id) ? friendShipData[0].color_chat : friendShipData[0].color_chat2;
                        dispatch(setColorChat(color));
                    }
            }
        }
        getChat();
        getColorChat();

    }, [selectedFriendId])
    
    useEffect(() => {
        // Subscribe to changes Db
            const mySubscription: RealtimeSubscription = supabase
                    .from('messages')
                    .on('*', payload => {
                        if(payload && payload.eventType === "INSERT") {
                            getChat(true);
                        }
                        else if (payload && payload.eventType === "UPDATE") {
                            const message = chat.filter(msg => msg.id === payload.new.id)
                            if(message.length !== 0 && message[0].id && !message[0].isRead ) {
                                dispatch(updateMessageToBeRead(message[0].id))
                            }
                        }
                    })
                    .subscribe()
                    return () => {
                        supabase.removeSubscription(mySubscription)
                    } 
    }, [])
    let lastFriendMsgReadIndex = -1;
    let lastUserMsgReadIndex = -1;
    // Get the last message read first
    chat.forEach((msg, i) => {
        if(msg.isRead) {
            if(!msg.isFriendMessage) 
                lastFriendMsgReadIndex = i; 
            else
                lastUserMsgReadIndex = i;
        } 
    })

    let className = "relative overflow-hidden h-full flex flex-col  transition-width duration-500 ease-in-out";

    if(props.isRightClosedState[0]) // if rigth is closed 
        className += " center-width-calc ";
    else 
        props.isMobileScreenState[0] ? className += " w-0" : className += " w-1/2  ";
    return (
        <div className={className}>
                
            <Header />
                    <IsFriendTyping />
            <div className=" h-3/6 flex-1 flex flex-col ">
                {
                    error && <p className="text-red-600">Error fetching data !</p>
                }
                
                    <div ref={chatContainerRef} className=" relative flex-1 overflow-auto bg-gray_e w-full ">
                    {
                    loading ? <Loading /> :
                        <>
                            {
                                chat.map((message, index) => {
                                    const previousMsg = index > 0 ? chat[index-1] : undefined;
                                    const nextMsg = index < chat.length - 1 ? chat[index + 1] : undefined;
                                    const borderRadius = generateMessageBorderRadius(message, previousMsg, nextMsg)
                                    const showTime = showMessageTime(message, previousMsg)
                                    // Update isRead message
                                    if(message.id && message.isFriendMessage && !message.isRead ) {
                                        // dispatch(updateMessageToBeRead(message.id))
                                        setMessageReadDb(message.id)
                                    }
                                return (<Message 
                                            key={index}
                                            data={message}
                                            showTime={showTime}
                                            isLastRead={lastFriendMsgReadIndex === index }
                                            borderRadius = {borderRadius}
                                            lastUserMessageReadRef={(lastUserMsgReadIndex === index) ? lastUserMessageReadRef : undefined }
                                        />)
                                })
                            }
                        </>
                    }
                    </div>
                <div className="h-12.97 w-full relative z-30 bg-white">
                    <TypeMessage />
                </div>
            </div>
        </div>
    )
}


export default Center

function TypeMessage() {
    const dispatch = useDispatch();
    const isWriting = useSelector((state: RootState) => state.friends.isFriendWriting);
    const id_user = useSelector((state: RootState) => state.user.user?.id)
    const idSelectedFriend = useSelector((state: RootState) => state.friends.selectedFriendId)
    let timeOutInstance = useSelector((state: RootState) => state.friends.isFriendWritingTimeout)
    
    const updateIswritingDb = async (value: boolean) => {
        const res = await supabase.from('friends').select("*")
        if(res.error)
            console.log(res.error);
        else if(res.data){
            const res2 = res.data.filter(friendShip => (friendShip.id_user1 === id_user && 
                friendShip.id_user2 === idSelectedFriend) || (friendShip.id_user2 === id_user && friendShip.id_user1 === idSelectedFriend))[0];
            let update, match;
            if(res2.id_user1 === id_user) {
                update = {user1_is_writing: value};
                match = {id_user1: id_user, id_user2: idSelectedFriend}
            } else {
                update = {user2_is_writing: value};
                match = {id_user2: id_user, id_user1: idSelectedFriend}
            }
            await supabase.from('friends').update(update).match(match)  
        }
    }
    const updateSetTimeout = () => {
            if(typeof timeOutInstance === 'number') {
                clearTimeout(timeOutInstance);
            }
            const timeout = setTimeout(()=> {
                dispatch(setIsFriendWriting(false));
                updateIswritingDb(false);
            }, 2000);
            dispatch(setIsFriendWritingTimeout(timeout))
    }

    const idLastMessage = useSelector((state: RootState) => state.chat.messages.length > 0 ? state.chat.messages[state.chat.messages.length -1].id : 0)
    
    const [textMessage, setTextMessage] = useState('');
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTextMessage(e.target.value);
        if(!isWriting) {
            dispatch(setIsFriendWriting(true));
            updateIswritingDb(true);
            updateSetTimeout();
        }else {
            updateSetTimeout();
        }
    }
    const updateDb = async (message: messageType) => {
        await supabase.from('messages').insert([{
            id_reciever: idSelectedFriend,
            id_sender: id_user,
            text: message.text,
            reaction_text: message.reactionText,
            reaction_shared_image: message.reactionSharedImage,
            is_read: false,
        }]);
    }
    const sendNewMessage = (msg_text?: string, msg_image?: string)=> {
        const message: messageType = {
            id: idLastMessage,
            isFriendMessage: false,
            isRead: false,
            text: "",
            time: Date.now(),
            reactionText: -1,
            sharedImage: "",
            reactionSharedImage: -1,
        }
        // if the text and image are undefined => this msg is like message
        // else set text or shared image
        if(msg_text !== undefined)
            message.text = msg_text;
        if(msg_image !== undefined)
            message.sharedImage = msg_image;
        // Save the message
        dispatch(setAction("newMessage"));
        dispatch(addNewMessage(message));
        // if the message has text & image undefined => it is like message
        (msg_text !== undefined && msg_image !== undefined) && setTextMessage('');
        updateDb(message);
    }
    const onSubmitHandler = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if(textMessage.trim() !== "") {
            sendNewMessage(textMessage.trim(), "")
        }
    }
    const onLikeHandller = () => {
        sendNewMessage();
    }
    return (
        <form 
            className=" flex border-t border-opacity-40 h-full items-center"
            onSubmit={onSubmitHandler}
        >
            <input 
                placeholder="Type a message..." 
                className=" pl-5 w-9/12 sm:flex-1 text-gray_4 outline-none placeholder-gray_a" 
                type="text"
                onChange={onChangeHandler}
                value={textMessage}
            />
            <div className="relative cursor-pointer">
                <input className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" type="file" name="attach_file" id="attach_file" />
                <AttachIcon />
            </div>
            <button 
                type="button" 
                className=" mx-3 sm:mr-5.18 sm:ml-5.57"
                onClick={onLikeHandller}
            >
                <LikeIcon />
            </button>
        </form>
    )
}

function generateMessageBorderRadius(thisMsg: messageType, previousMsg?:messageType, nextMsg?:messageType) {
    let borderRadious = "";
    if(thisMsg.isFriendMessage) {
        // Friend message => rounded top right
        borderRadious += " rounded-tr-3xl ";
        // Friend message => rounded top left if no previous msg or (is friend msg also and time between the two messages less than 1min)
        borderRadious += (!previousMsg || !((previousMsg.isFriendMessage === thisMsg.isFriendMessage) && (thisMsg.time - previousMsg.time < 60000))) ? " rounded-tl-3xl " : "";
        // Friend message => rounded top right if no next msg or (next msg isFriend msg also and time between the two less than 1min)
        borderRadious += (!nextMsg || !((nextMsg.isFriendMessage === thisMsg.isFriendMessage) && (nextMsg.time - thisMsg.time < 60000))) ? " rounded-br-3xl " : "";
    }else {
        // Top left
        borderRadious += " rounded-tl-3xl ";
        // Top right
        borderRadious += (!previousMsg || !((previousMsg.isFriendMessage === thisMsg.isFriendMessage) && (thisMsg.time - previousMsg.time < 60000))) ? " rounded-tr-3xl " : "";
        // bottm left
        borderRadious += (!nextMsg || !((nextMsg.isFriendMessage === thisMsg.isFriendMessage) && (nextMsg.time - thisMsg.time < 60000))) ? " rounded-bl-3xl " : "";
    }
    return borderRadious;
}

function showMessageTime(message: messageType, previousMsg?: messageType) {
    return (previousMsg === undefined || (new Date(message.time).getTime() - new Date(previousMsg.time).getTime()) > 60000);
    
}

