import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { database } from '../firebase';

function Profile() {

  const {id} = useParams();
  const [userData, setUserData] = useState(null);
    // console.log(id);
  useEffect(()=>{
    database.users.doc(id).onSnapshot((snap)=>{
        setUserData(snap.data())
    })
  }, [id])
  return (
    <div>
      Hello {id}
    </div>
  )
}

export default Profile
