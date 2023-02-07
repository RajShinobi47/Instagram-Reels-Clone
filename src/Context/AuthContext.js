import React, {useState, useEffect} from 'react'
import { auth } from '../firebase';
export const AuthContext = React.createContext();


// In the AuthProvider function, we will get props.children from destructuring
// we have used. Because, at down we have return the values inside component starting and closing tag.
export function AuthProvider({children}){
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

    function signup(email, password){
        return auth.createUserWithEmailAndPassword(email, password);
    }

    function login(email, password){
        return auth.signInWithEmailAndPassword(email, password);
    }

    function logout(){
        return auth.signOut();
    }

    // State Changing Functions
    // It will act as componentDidMount, whenever a data a come whether
    // of Sigin, Logout or else, our setLoading will be false.
    useEffect(()=>{
        const unsub = auth.onAuthStateChanged((user)=>{
            setUser(user);
            setLoading(false);
        })

        // Be returning the unsub(), at the componentWillUnmount, our event
        // listener will be removed
        return ()=>{
            unsub();
        }
    }, [])

    const store={
        user,
        signup,
        login,
        logout
    }

    return(
        // If we use like <Component val='xyz' /> then val will given accessed as a props of component.
        <AuthContext.Provider value={store}>
            {/* Whatever we are writing inside this component, we will get it's access in props.children */}
            {!loading && children}
        </AuthContext.Provider>
    )

}
