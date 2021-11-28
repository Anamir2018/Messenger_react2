import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import {setListFriends, setSelectedFriend} from '../redux/friends/friendsSlice'
import { supabase } from '../../supabase/supabaseClient';
import { friendType, userType } from '../redux/types';
import Loading from '../helpers/Loading';

function ListFriends() {
    const friends = useSelector((state: RootState) => state.friends);
    const user = useSelector((state: RootState) => state.user.user);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
        
    useEffect(() => {
        async function getFriends() {
            setLoading(true);
            const { data, error } = await supabase.from('users')
            if(error) {
                setError(error.message);
            }else if(data) {
                const listFriend = data.filter((friend) => friend.id !== user?.id) as friendType[];
                
                dispatch(setListFriends(listFriend))
                dispatch(setSelectedFriend(listFriend[0].id))
                
            }
            setLoading(false);
        }

        getFriends();
    }, [])
    return (
        <ul className=" h-44 relative  overflow-y-auto flex-1">
            {
                (error !== "") && <span className="text-red-600">Error fetching data !</span>
            }
        {
            loading ? <Loading /> :
            friends.list.map(
                (friend, index) => <Friend 
                                key={friend.id}
                                id={friend.id}
                                firstName={friend.firstName}
                                lastName= {friend.lastName}
                                avatar= {friend.avatar}
                                lastMessage={friend.lastMessage}
                                timeLastMessage = "11:30"
                                isSelected={friends.selectedFriendId ? friend.id === friends.selectedFriendId : index === 0}    
                            />
            )
        }
        </ul>
    )
}

export default ListFriends

function Friend(props: {id: number, avatar: string, firstName: string, lastName: string, lastMessage?: string,timeLastMessage?: string, isSelected: boolean,}) {
    const { id,
            firstName, 
            lastName, 
            avatar, 
            lastMessage, 
            timeLastMessage, 
            isSelected
        } = props;
    const [nbMessagesNotRead, setNbMessagesNotRead] = useState(0);
    const idSelectedFriend = useSelector((state: RootState) => state.friends.selectedFriendId)
    useEffect(() => {
        const getNbMessagesNotRead = async () => {
            let { data, error } = await supabase.from('messages')
                                                    .select('*')
                                                    .eq('id_reciever', props.id);
            if(error)
                console.log(error);
            else {
                if(data && data?.length > 0) {
                    let nb = 0;
                    data?.map(msg => !msg.is_read && nb++)
                    setNbMessagesNotRead(nb);
                }
            }

        }
        getNbMessagesNotRead();    
    }, [idSelectedFriend])
    const searchFriend = useSelector((state: RootState) => state.friends.searchFriend);

    const showFriendFilter = searchFriend === "" ||
        (firstName.trim().toLocaleLowerCase() + " " + lastName.trim().toLocaleLowerCase())
        .includes(searchFriend.trim().toLocaleLowerCase())
        
    const dispatch = useDispatch();
    const clickHandler = () => {
        console.log(props);
        
        dispatch(setSelectedFriend(id))
    }
    return (
        showFriendFilter ? <li className={( isSelected ? " bg-gray_e " : "") + " cursor-pointer w-full flex items-center px-2 lg:px-5.3 py-3.48 lg:py-3.84 overflow-hidden"}
            onClick={clickHandler}
        >
            <div className=" rounded-full ring-2 ring-gray-100 overflow-hidden w-10 sm:w-12 min-w-10 flex ">
            <span className=" relative inline-block w-full pt-full  rounded-full text-white">
                {
                    avatar ? <img className="absolute top-0 left-0 w-full h-full" src={avatar} alt="avatar" /> : <span className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-main_color_blue">{ firstName[0] + lastName[0] }</span>
                }
                </span>
            </div>
            <div className="flex pl-2 lg:pl-5.3 flex-1 overflow-hidden">
                <div className=" w-1/4 flex-grow">
                    <h3 className=" w-full text-base text-gray_4   overflow-hidden whitespace-nowrap overflow-ellipsis">{firstName + " " + lastName}</h3>
                    <p className=" w-full text-sm2 text-gray_a  whitespace-nowrap overflow-ellipsis overflow-hidden ">{lastMessage || ""}</p>
                </div>
                {nbMessagesNotRead > 0 && <div className=" self-center p-1">
                    <span className=" inline-block bg-main_color_blue text-white  text-sm rounded-full px-2.6 py-1 self-start">
                        {nbMessagesNotRead}
                    </span>
                </div>}
                <div className="w-auto text-gray_a">
                    {timeLastMessage}
                </div>
            </div>
        </li>
        : <></>
    )
}