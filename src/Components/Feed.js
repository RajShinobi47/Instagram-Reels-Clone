import React, {useContext, useEffect, useState} from 'react'
import { AuthContext } from '../Context/AuthContext'
import UploadFile from './UploadFile';
import { database } from '../firebase';
import Posts from './Posts';
import Navbar from './Navbar';

function Feed() {
  const {user, logout} = useContext(AuthContext);
  const [userData, setUserData] = useState('');
  useEffect(()=>{
    const unsub = database.users.doc(user.uid).onSnapshot((snapshot)=>{
        setUserData(snapshot.data())
    })
    return ()=>{unsub()}
  }, [user]) // by writing user in [], will ensure that event listener will listen to new user is any new user has loggin and will not point anymore to previous user.

  return (
    <>
    <Navbar userData={userData}/>
    <div style={{display:'flex', justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
      {/* <div className='comp' style={{width:'50%'}}>

        <h1>Welcome To Feed</h1>
        <button onClick={logout}>Logout</button>
        
      </div>
      {console.log(userData)} */}
     
      <UploadFile user={userData}/>
      <Posts userData={userData}/>
    </div>
    </>
  )
}

export default Feed