import React from 'react'
import { useSelector } from 'react-redux'
import { PhoneIcon, CamIcon } from '../../assets/svgs/SvgIcons'
import Loading from '../helpers/Loading';
import { RootState } from '../redux/store'

function Header() {
    const selectedFriend = useSelector((state: RootState) => {
        if(state.friends.list.length > 0) {
            if(state.friends.selectedFriendId) {
                return state.friends.list.filter(friend => friend.id === state.friends.selectedFriendId)[0]
            }else 
                return state.friends.list[0]
        }
        return undefined;
    });
    if(!selectedFriend)
        return <Loading />
    const fullName = selectedFriend.firstName + " " + selectedFriend.lastName;
    const status = selectedFriend.status ? (selectedFriend.status?.trim()[0].toUpperCase() + selectedFriend.status?.trim().slice(1)) : "";
    return (
        <header className=" relative h-16.18 min-h-16.18 pt-3.9 overflow-hidden shadow-sm">
            <div className="absolute right-2 sm:right-5.62 top-5.46">
                <button>
                    <PhoneIcon />
                </button>
                <button className=" ml-2 sm:ml-8.26">
                    <CamIcon />
                </button>
            </div>
            <h2 className=" pl-4 sm:p-0 sm:text-center text-1.14 text-gray_4">{fullName}</h2>
            <p className=" pl-4 sm:p-0 sm:text-center text-gray_a"> {status} </p>
        </header>
    )
}

export default Header
