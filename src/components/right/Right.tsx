import Header from './Header'
import FriendInfos from './FriendInfos'
import SearchBar from '../SearchBar'
import {MAIN_COLOR_BLUE} from '../../assets/theme/colors'
import {LeftChevronIcon, RightChevronIcon, SettingsIcon} from '../../assets/svgs/SvgIcons'
import ConversationColoros from './ConversationColoros'
import SharedPhotos from './SharedPhotos'

type props = {
    isRightClosedState: [boolean, Function], 
    isMobileScreenState: [boolean, Function],
}

function Right(props: props) {

    let className = "shadow-lg  relative transform transition-width duration-500 ease-in-out overflow-hidden h-full ";

    if(props.isRightClosedState[0]) // if rigth is closed 
        className += " w-5.3 ";
    else 
        props.isMobileScreenState[0] ? className += " right-width-calc " : className += " w-1/4 ";


    return (
        <div className={className}>
            <Header isRightClosedState={props.isRightClosedState} />
            <HideRightBtn isRightClosedState={props.isRightClosedState} />
            <div className={" relative overflow-auto h-full  " + (props.isRightClosedState[0] === true ? " p-0 w-0 ": " px-5.3 w-full ")}>
                <SettingsBtn />
                <FriendInfos />
                <div className=" mt-8.26">
                    <SearchBar colorIcon={MAIN_COLOR_BLUE}  idInput="searchConversation" />

                </div>
                <div className=" my-8.26">
                    <ConversationColoros />
                </div>
                <div className=" my-8.26">
                    <SharedPhotos />
                </div>
            </div>
        </div>
    )
}

export default Right

function HideRightBtn(props: {isRightClosedState: [boolean, Function]}) {
    const [isRightClosed, setRightToClose] = props.isRightClosedState;
    const onClickHandler = () => {
        console.log("click btn");
        
        setRightToClose(!isRightClosed)
    }
    return (
        <button className="absolute z-10 cursor-pointer w-5.3 h-8.89 top-16.18 left-0 bg-main_color_blue"
        onClick={onClickHandler}
        >
            {
                isRightClosed ? <LeftChevronIcon /> : <RightChevronIcon />
            }
        </button>
    )
}

function SettingsBtn() {
    return (
        <div className="text-right">
            <button>
                <SettingsIcon />
            </button>
        </div>
    )
}

