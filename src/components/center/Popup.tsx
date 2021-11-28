import REACTION_ICONS from '../../assets/reactionIcons'
import { useDispatch, useSelector } from 'react-redux'
import { deleteMessage, setAction, updateReactionMessage } from '../redux/chat/chatSlice';
import { RootState } from '../redux/store';
import { supabase } from '../../supabase/supabaseClient';

function Popup(props: {type: string}) {
    const deleteMessageDb = async (id: number) => {
        await supabase.from('messages')
                        .delete()
                        .eq('id', id)
    } 
    const dispatch = useDispatch();
    const idSelectedMessage = useSelector((state: RootState) => state.reactionPopup.idSelectedMessage);
    const onDeleteHandller = () => {
        if(idSelectedMessage) {
            dispatch(deleteMessage(idSelectedMessage));
            deleteMessageDb(idSelectedMessage)
        }
    }
    
    if(props.type === "reaction")
        return(
            <>
                <ul className=" absolute  bottom-11 left-1/2 bg-white transform -translate-x-1/2 px-2 sm:px-4 py-2 flex items-center rounded-full z-10">
                {
                    REACTION_ICONS.map((icon, index) => <ReactionIcon key={index} id={index} url={icon} />)
                }
                </ul>
                <span className="absolute bottom-12 left-1/2 h-6 w-6 bg-white -rotate-45 transform -translate-x-3 translate-y-3 z-0"></span>
            </>
        )
    else if(props.type === "options")
            return(
                <>
                    <div className=" absolute  bottom-11 left-1/2 bg-white text-gray-500 transform -translate-x-1/2 p-0.5 sm:p-1 flex items-center rounded-full z-10 text-xs sm:text-base">
                        <button className="px-1 sm:px-3 py-1 hover:bg-gray-200 rounded-xl"
                                onClick={onDeleteHandller}
                        >
                            Delete
                        </button>
                        <button className="px-1 sm:px-3 py-1 hover:bg-gray-200 rounded-xl">Transfer</button>
                    </div>
                    <span className="absolute bottom-12 left-1/2 h-6 w-6 bg-white -rotate-45 transform -translate-x-3 translate-y-3 z-0"></span>
                </>
            )
    else
        return <></>;
}

export default Popup

function ReactionIcon(props: {url: string, id: number}) {
    const updateReactionMessageDb = async ( id_messsage: number, 
                                            index_reacion: number, 
                                            reactionType?: "text" | "image" | "like" | ""
                                        ) => {

        const update = (reactionType === "text") ? {reaction_text: index_reacion} 
                                                : {reaction_shared_image: index_reacion}

        await supabase.from('messages')
                                        .update(update)
                                        .eq('id', id_messsage)
            
    }
    const dispatch = useDispatch();
    const reactionType = useSelector((state: RootState) => state.reactionPopup.messageType)
    const idSelectedMessage = useSelector((state: RootState) => state.reactionPopup.idSelectedMessage)
    const clickHandler = () => {
        if(idSelectedMessage) {
            dispatch(setAction("reactToMessage"));
            dispatch(updateReactionMessage({idSelectedMessage, reaction: props.id, reactionType}))
            updateReactionMessageDb(idSelectedMessage, props.id, reactionType)
        }
        
    }
    return(
        <button className="w-4 sm:w-7 sm:mx-1 mx-0.5">
            <img 
                className="w-full" 
                src={props.url} 
                alt="reaction" 
                onClick={clickHandler}
                />
        </button>
    )
}