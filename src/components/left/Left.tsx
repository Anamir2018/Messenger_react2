import React from 'react'
import Header from './Header'
import ListFriends from './ListFriends'
import SearchBar from '../SearchBar'
import {SearchIcon} from '../../assets/svgs/SvgIcons'

import {MAIN_COLOR_GRAY_a} from '../../assets/theme/colors'

function Left() {
    return (
        <div className="h-full flex flex-col w-full overflow-hidden">
            <Header />
            <div className=" px-2 lg:px-5.3 py-1">
                {/* Search button for mobile */}
                <SmSearchBtn />
                {/* Search bar for other devices */}
                <div className="hidden sm:block ">
                    <SearchBar colorIcon={MAIN_COLOR_GRAY_a} leftPadding="pl-2 lg:pl-3.85" idInput="searchFriend" />
                </div>

            </div>
            <ListFriends />
        </div>
    )
}

export default Left

function SmSearchBtn() {

    const onClickSearchBtn = () => {};
    return (
    <div className="flex justify-center py-2">
        <button className = "inline-block sm:hidden transform scale-150"
                onClick = {onClickSearchBtn}
        >
            <SearchIcon color ={MAIN_COLOR_GRAY_a} />
        </button>
    </div>
    )
}