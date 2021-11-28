import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { DotsHorizontalIcon } from '../../assets/svgs/SvgIcons'
import { showImageViewer } from '../redux/imageViewer/imageViewerSlice'
import { RootState } from '../redux/store'
import { supabase } from '../../supabase/supabaseClient';
import Loading from '../helpers/Loading';
import { setSharedPhotos } from '../redux/friends/friendsSlice';

function SharedPhotos() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const sharedPhotos = useSelector((state: RootState) => state.friends.sharedPhotos);
    const user = useSelector((state: RootState) => state.user.user);
    const seletedFriendId = useSelector((state: RootState) => state.friends.selectedFriendId);
    useEffect(() => {
        const getSharedPhotos = async () => {
            setLoading(true)
            const { data, error } = await supabase.from('sharedImages')
                                                                .select("*")
            if(error) {
                setError(error.message)
            } else if(data) {
                const shared = data.filter(photo => 
                    (photo.id_sender === seletedFriendId && photo.id_reciever === user?.id)||
                    (photo.id_sender === user?.id && photo.id_reciever === seletedFriendId))
                dispatch(setSharedPhotos(shared.map(shared => shared.url)));
            }
            setLoading(false);
        }
        getSharedPhotos();
    }, [seletedFriendId])
    return (
        <div>
            <div className="flex justify-between items-center my-8.89">
                <h3 className="text-gray_a text-sm2">Shared Photos</h3>
                <button>
                    <DotsHorizontalIcon />
                </button>
            </div>
            <div className="relative">
                {
                    loading && <Loading />
                }
                {
                    error && <div className="text-red-600"> Error fetching data !</div>
                }
                {sharedPhotos.length > 0 && <ul className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3  gap-3.36">
                    {sharedPhotos.map( (url, index) => <Image  key={index} url={url}/>)}
                </ul>}
            </div>

        </div>
    )
}

export default SharedPhotos

function Image(props: {url: string}) {
    const dispatch = useDispatch();
    const clickHandler= () => {
        dispatch(showImageViewer(props.url.trim()))
    }
    return(
        <div className="w-full pt-full rounded-full relative cursor-pointer "
                onClick={clickHandler}
        >
            <img className=" absolute top-0 left-0 h-full" src={props.url} alt="shared" />
        </div>
    )
}

// const SHARED_PHOTOS = [
//     "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80",
//     "https://photographycourse.net/wp-content/uploads/2014/11/Landscape-Photography-steps.jpg",
//     "https://t3.ftcdn.net/jpg/03/15/34/90/360_F_315349043_6ohfFyx37AFusCKZtGQtJR0jqUxhb25Y.jpg",
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz3aA8kY27O6MPCBz9RPODXdyN2xI0AEFBJA&usqp=CAU",
//     "https://i.pinimg.com/originals/72/0b/93/720b938b447a5db0d93da13cebc1e591.jpg"
// ]