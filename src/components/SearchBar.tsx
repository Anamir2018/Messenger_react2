import React from 'react'
import { useDispatch} from 'react-redux'
import {SearchIcon} from '../assets/svgs/SvgIcons'
import { setSearchConversation } from './redux/chat/chatSlice';
import { setSearchFriend } from './redux/friends/friendsSlice';


type props = {
    colorIcon: string,
    idInput: string,
    leftPadding?: string,
    iconSize?: string,
}
function SearchBar(props: props) {
    const dispatch = useDispatch();
    const onChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
        if(props.idInput === "searchFriend") {
            dispatch(setSearchFriend(e.currentTarget.value))
        }else if(props.idInput === "searchConversation") {
            dispatch(setSearchConversation(e.currentTarget.value))
        }
    }
    return (
        <div className={"flex items-center sm:justify-start  overflow-hidden " + (props.leftPadding || "")}>
            <label htmlFor={props.idInput}>
                <SearchIcon color ={props.colorIcon} />
            </label>
            <input 
                className=" w-16 flex-1 pl-2 lg:pl-4 text-gray_a text-base focus:outline-none border-gray-100 border-b-2 border-opacity-0 focus:border-opacity-100 focus:transition-opacity ease-in-out duration-300 " 
                id={props.idInput} 
                type="text" 
                placeholder={"Search " + (props.idInput === "searchConversation" ? "conversation" : "friend")} 
                onChange={onChangeHandler}
            />
        </div>
    )
}

export default SearchBar
