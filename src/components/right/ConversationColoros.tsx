import React, { Dispatch, useEffect, useReducer, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { DotsHorizontalIcon, CheckedIcon } from '../../assets/svgs/SvgIcons'
import { RootState } from '../redux/store';
import {setColorChat} from "../redux/friends/friendsSlice"
import { supabase } from '../../supabase/supabaseClient';

function ConversationColoros() {
    const colorChat: string|undefined = useSelector((state: RootState) => state.friends.colorChat);
    const dispatch = useDispatch();

    return (
        <div>
            <div className="flex justify-between items-center my-8.89">
                <h3 className="text-gray_a text-sm2">Conversation Color</h3>
                <button>
                    <DotsHorizontalIcon />
                </button>
            </div>
            <ul className="grid grid-cols-7  md:grid-cols-4 xl:grid-cols-7 gap-3.97">
                {
                PALETTE_COLORS.map( (colorCode, index) => <Color 
                                                                id={index} 
                                                                code={colorCode} 
                                                                key={index} 
                                                                colorChat={colorChat}
                                                                setColorChat={dispatch}
                                                            />
                                    )
                }
            </ul>

        </div>
    )
}

export default React.memo(ConversationColoros)

function Color(props: {id: number, code: string, colorChat?: string, setColorChat: Dispatch<any>}) {
    const user = useSelector((state: RootState) => state.user.user)
    const id_selected_friend = useSelector((state: RootState) => state.friends.selectedFriendId)
    const updateColorChatDb = async (color: string) => {
        if(user && id_selected_friend) {
            const res = await supabase.from('friends')
                                                    .select('*')
            if(res.error)
                console.log(res.error);
            else {
                const res2 = res.data.filter(friendShip  => (friendShip.id_user1 === user.id && friendShip.id_user2 === id_selected_friend) || (friendShip.id_user2 === user.id && friendShip.id_user1 === id_selected_friend))[0];
                let update, match;
                if(res2.id_user1 === user.id) {
                    update = {color_chat : color};
                    match = {id_user1: user.id, id_user2: id_selected_friend};
                } else {
                    update = {color_chat2 : color};
                    match = {id_user2: user.id, id_user1: id_selected_friend};
                    
                }
                const { data, error } = await supabase.from('friends')
                                                    .update(update)
                                                    .match(match)
                if(error)
                    console.log(error);
                else 
                    console.log(data);
            }
                
                
        }

    }
    const clickHandler: React.MouseEventHandler<HTMLButtonElement> = React.useCallback(() => {
        props.setColorChat(setColorChat(props.code));
        updateColorChatDb(props.code);
    }, [props])
    
    return(
        <button className="w-8 pt-8 sm:w-8.26 sm:pt-8.26 rounded-full relative "
                style={{backgroundColor: props.code}}
                onClick={clickHandler}
        >
            {
                ((props.colorChat === undefined && props.id === 0) || props.colorChat === props.code) && <div className="absolute sm:top-1/4 sm:left-1/4 top-1.5 left-1.5 "><CheckedIcon /></div>
            }
        </button>
    )
}
const PALETTE_COLORS = [
    "#0084ff",
    "#f44336",
    "#9c27b0",
    "#3f51b5",
    "#51cbf9",
    "#00bcd4",
    "#009688",
    "#4caf50",
    "#8bc34a",
    "#cddc39",
    "#ffc107",
    "#ff5722",
    "#795548",
    "#607d8b",
]