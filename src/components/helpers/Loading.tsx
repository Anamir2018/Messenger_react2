import React from 'react'

function Loading() {
    return (
        <div className="absolute z-50 w-full h-full bg-gray-200 bg-opacity-60">
            <div className="absolute z-50 top-1/2 left-1/2">
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                </svg>
            </div>
        </div>
    )
}

export default Loading
