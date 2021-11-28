import React from 'react'
import {AvatarIcon} from '../../assets/svgs/SvgIcons'
import { useSelector } from 'react-redux';
import { friendType } from '../redux/types';
import {RootState} from "../redux/store"
import Loading from '../helpers/Loading';

function FriendInfos() {
    const selectedFriend: friendType|undefined = useSelector((state: RootState) => {
        if(state.friends.list.length > 0) {
            if(state.friends.selectedFriendId) {
                return state.friends.list.filter(friend => friend.id === state.friends.selectedFriendId)[0]
            }else 
                return state.friends.list[0]
        }
        return undefined;
    });
    if(selectedFriend === undefined)
        return <Loading />
    else
    return (
        <div className=" text-center">
            {
                !(selectedFriend.avatar) ? 
                                <AvatarIcon /> 
                            :
                                <div className="w-16.28 h-16.28 mx-auto rounded-full flex items-center justify-center overflow-hidden ring-gray_e ring-2 ">
                                    <img className="w-full inline-block" src={selectedFriend.avatar} alt="avatar" />
                                </div>
            }
            <h4 className="text-gray_4 mt-5.11" > {`${selectedFriend.firstName} ${selectedFriend.lastName}`} </h4>
            <p className="text-gray_a text-sm2"> {selectedFriend.adress} </p>
            {selectedFriend.fbLink && <p className="text-sm2 text-main_color_blue"> 
                <a href={"https://facebook.com" + selectedFriend.fbLink}>
                    <span className="text-white inline-block w-4 h-4 bg-facebook_color_blue font-extrabold rounded-sm pl-1 mr-3.44">f</span>
                    {selectedFriend.fbLink}

                </a>
            </p>}
        </div>
    )
}

export default FriendInfos
