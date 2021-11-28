import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { supabase } from '../../supabase/supabaseClient';

function IsFriendWriting() {
    const colorChat = useSelector((state: RootState) => state.friends.colorChat);
    const [showIsWriting, setShowIsWriting] = useState(false);
    const id_user = useSelector((state: RootState) => state.user.user?.id)
    const id_selected_friend = useSelector((state: RootState) => state.friends.selectedFriendId)
    
    const updateIsWriting = (friendShip: any) => {
        if((friendShip.id_user1 === id_user && friendShip.id_user2 === id_selected_friend)||(friendShip.id_user2 === id_user && friendShip.id_user1 === id_selected_friend)) {

            if(id_selected_friend === friendShip.id_user1) {
                setShowIsWriting(friendShip.user1_is_writing)
                
            }else {
                setShowIsWriting(friendShip.user2_is_writing)
            }
        }
    }
    useEffect(()=> {
        const mySubscription = supabase.from('friends')
            .on('UPDATE', payload => {
                updateIsWriting(payload.new)
            })
            .subscribe()
        return () => {supabase.removeSubscription(mySubscription);}
    }, [id_selected_friend])
    return (
        <div className={` opacity-0 transform transition-all duration-700 ease-out z-20 absolute bottom-0 left-8 sm:left-16.18  ${showIsWriting ? " opacity-100  transition-all duration-500 ease-in-out -translate-y-20.19": ""}`}>
            <div className="w-12.87 h-8.29 rounded-full flex items-center justify-between px-5.11 py-2"
                style={{backgroundColor: colorChat}}
            >
                <span className=" animate-bounce1  self-end  inline-block w-1.5 h-1.5 rounded-full bg-white"></span>
                <span className="animate-bounce2 self-end inline-block w-1.5 h-1.5 rounded-full bg-white"></span>
                <span className="animate-bounce1 self-end  inline-block w-1.5 h-1.5 rounded-full bg-white"></span>
            </div>
        </div>
    )
}

export default IsFriendWriting
