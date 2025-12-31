import './loginpage.css';
import Login from '../Login';

import { Await } from 'react-router-dom';
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;



export function LoginPage(){


   

    // useEffect( ()=>{
    //   async  function test(){
    //     const res = await axios.get('http://localhost:5000')
    //         console.log(res.data)
    //   }
    //   test();
        
    // },[])
    return(
        <div className='body-l'>
           
           
            
            <div className='main-section-l'>
        <div className='Heading-l'><h1>Welcome Back </h1><p>Sign in to your account to continue</p></div>
                <div className=' flex justify-center items-center bg-white border border-[rgb(213,211,211)] rounded-md shadow-xl w-80 h-30'>
                   
                    <Login />
                           
                </div>
            </div>

           
        </div>
    )
}