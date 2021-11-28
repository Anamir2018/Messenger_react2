import { useState, useEffect } from 'react';
import Left from './components/left/Left';
import Center from './components/center/Center';
import Right from './components/right/Right';
import ImageViewer from './components/ImageViewer';
import { supabase } from './supabase/supabaseClient';
import Auth from './supabase/Auth';
import { useSelector } from 'react-redux';
import { RootState } from './components/redux/store';
import Loading from './components/helpers/Loading';

function App() {
  const user = useSelector((state: RootState) => state.user.user);
  const isRightClosedState = useState(true);
  // Check screen width & listen to window resize event
  const [isMobileScreenState, setToMobileScreen] = useState(true);
  useEffect(() => {
    const checkScreenWidth = () => {
      if(window.innerWidth < 768)
        setToMobileScreen(true)
      else {
        setToMobileScreen(false);
        isRightClosedState[1](false);
      }
    }
    // Get the screen size
    checkScreenWidth();
    // Listen to screen resize event
    window.addEventListener('resize', checkScreenWidth);
  }, []);


  useEffect(() => {

  }, []);

  return( (user === null) ? <Auth /> :
    <div className='w-screen h-screen bg-gray-50 overflow-hidden'>
      <ImageViewer />
      <div className=' w-full flex  max-w-screen-2xl mx-auto bg-white overflow-hidden h-full '>
        <div className='w-14 sm:w-1/3 md:w-1/4 overflow-hidden   shadow-lg'>
          <Left />
        </div>

        <Center
          isRightClosedState={isRightClosedState}
          isMobileScreenState={[isMobileScreenState, setToMobileScreen]}
        />

        <Right
          isRightClosedState={isRightClosedState}
          isMobileScreenState={[isMobileScreenState, setToMobileScreen]}
        />
      </div>
    </div>
  )
}

export default App;
