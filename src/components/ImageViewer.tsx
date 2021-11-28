import { useDispatch, useSelector } from 'react-redux';
import { CloseIcon } from '../assets/svgs/SvgIcons'
import { RootState } from './redux/store';
import {showImageViewer} from './redux/imageViewer/imageViewerSlice'

function ImageViewer() {
    const urlImage = useSelector((state: RootState) => state.imageViewer.urlImage);
    const dispatch = useDispatch();
    const onCloseHandler = () => {
        dispatch(showImageViewer(""));
    }
    return (
        <div className={(urlImage !== "" ? " block " : " hidden ") + " absolute top-0 left-0 w-full h-full bg-gray-400 bg-opacity-90 z-50 text-center flex items-center justify-center"} >
            <div className="relative max-w-90 max-h-90   flex flex-col pt-4">
                <button
                    className="absolute ring-gray-100 ring-1 -top-0 -right-4  rounded-full bg-gray-800 p-1"
                    onClick={onCloseHandler}
                >
                    <CloseIcon />
                </button>
                <div className="bg-gray-100 text-center p-4 max-h-90  overflow-auto ">
                        <img className="inline-block h-full w-auto  max-w-full " src={urlImage} alt="" />
    
                </div>
            </div>
        </div>
    )
}

export default ImageViewer
