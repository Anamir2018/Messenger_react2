import React from 'react'

function OptionsPopup() {
    return (
        <>
            <div className=" absolute  bottom-0 left-0 bg-white text-gray-500 transform -translate-x-1/2 p-0.5 sm:p-1 flex items-center rounded-full z-10 text-xs sm:text-base">
                <button className="px-1 sm:px-3 py-1 hover:bg-gray-200 rounded-xl">Delete</button>
                <button className="px-1 sm:px-3 py-1 hover:bg-gray-200 rounded-xl">Transfer</button>
            </div>
            <span className="absolute bottom-0 left-0 h-6 w-6 bg-white -rotate-45 transform -translate-x-3 translate-y-3 z-0"></span>
        </>
    )
}

export default OptionsPopup
