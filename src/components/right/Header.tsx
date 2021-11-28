import React from 'react'
import {AvatarIcon} from '../../assets/svgs/SvgIcons'
import { useSelector } from 'react-redux';
import { userType } from '../redux/types';
import {RootState} from "../redux/store"
import Loading from '../helpers/Loading'

type props = {
    isRightClosedState: [boolean, Function], 
}
function Header(props: props) {
    
    const user: userType | null = useSelector((state: RootState) => state.user.user);
    let className = ""; 
    if(props.isRightClosedState[0])
        className = " w-0 overflow-hidden  ";
    else
        className = " md:w-auto h-16.18 p-0 md:px-2 lg:px-5.3 flex items-center justify-end ";

    if(user !== null)
        return (
            <header className= {className} >
                <h2 className=" transition-width  text-sm lg:text-base text-right text-gray_4 overflow-hidden overflow-ellipsis whitespace-nowrap flex-1">
                    {
                    // @ts-ignore: Object is possibly 'null'.
                    `${user.firstName} ${user.lastName}`
                } 
                </h2>
                <div className="w-9 min-w-9 rounded-full overflow-hidden ml-2 lg:ml-3.97">
                {
                // @ts-ignore: Object is possibly 'null'.
                (user.avatar === "") ?  <AvatarIcon w="w-full" h="auto" /> 
                // @ts-ignore: Object is possibly 'null'.
                                        : <img className="w-full" src={user.avatar} alt="avatar" />
                }
                </div>
            </header>
        )
    return <Loading />
}

export default Header
