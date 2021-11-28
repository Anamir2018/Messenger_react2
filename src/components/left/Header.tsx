import { NewMessageIcon } from '../../assets/svgs/SvgIcons'

function Header() {
    return (
        <header className="flex sm:content-between flex-col sm:flex-row sm:h-16.18 px-2 lg:px-5.3 py-2 sm:py-0 items-center overflow-hidden">
            <img className="px-0 sm:px-1 lg:px-3.46 w-10 min-w-10 sm:w-12 mb-4 sm:mb-0" src="/images/icon_messenger.png" alt="logo messenger" />
            <h1 className="pl-0 sm:pl-2 lg:pl-3.48 flex-1 text-base md:text-xl hidden sm:block">Messenger</h1>
            <button>
                <NewMessageIcon />
            </button>
            
        </header>
    )
}

export default Header
