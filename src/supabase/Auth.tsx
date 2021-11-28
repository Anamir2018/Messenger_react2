import { useState } from 'react'
import { supabase } from './supabaseClient'
import {userType} from '../components/redux/types'
import { useDispatch } from 'react-redux'
import { setUser } from '../components/redux/user/userSlice';
import { LoadingIcon } from '../assets/svgs/SvgIcons';

export default function Auth() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const clickHandler = async (id: number) => {
        setLoading(true);
        let { data, error } = await supabase.from('users');
        if(error) {
            setLoading(false)
            setError(error.message)
        }else if(data) {
            setLoading(false)
            const user = data.filter(user => user.id === id)[0] as userType;
            dispatch(setUser(user));
        }
    }
    const UserBtn = (props:{id: number, name: string}) => {
        return <button 
                    className=" hover:bg-main_color_blue hover:text-white transition duration-500 ease-out hover:shadow-lg shadow-md ring-1 ring-facebook_color_blue rounded-md my-2 py-2"
                    onClick={() => clickHandler(props.id)}
                >
                    {props.name }
                    {
                        (error !== "") && <span className="text-red-600 text-sm block">Error fetching data! </span>
                    }
                </button>

    } 
    return (
    <div className=" w-full h-screen overflow-hidden flex items-center relative ">
        {
            loading && <div className="absolute z-50 w-full h-full bg-gray-200 bg-opacity-60"><div className="absolute  top-1/2 left-1/2 ">
                <LoadingIcon />
            </div></div>
        }
        <div 
            className={`
                flex justify-center flex-col text-center
                rounded-lg 
                shadow-sm 
                border border-gray-100  
                mx-2 sm:mx-auto mt-16 
                pb-20 pt-10 px-4  
                w-full sm:w-2/4 xl:w-1/4   
            `}
        >
            <h1 className=" text-gray-600 text-2xl my-12">Continu As:</h1>
                <UserBtn name="Mohamed" id={1} />
                <UserBtn name="El Mehdi" id={2} />
                

        </div>

    </div>
)
}
