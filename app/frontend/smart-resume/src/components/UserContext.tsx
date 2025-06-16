import {useEffect, useState, useContext, createContext} from 'react'
import axios from '../api/axios'

const UserContext = createContext({})

export const useUser = (): any => useContext(UserContext) 

export const UserProvider = ({children}: any) => {
    const [user, setUser] = useState<any>(null)
    
    useEffect(() => {
        const getProfile = async () =>{
            if(!user){
                try{
                    const response = await axios.get('/auth/profile')
                    if(response){
                        const profile: any = {
                            userID: response.data.id,
                            userEmail: response.data.email
                        }
                        setUser(profile)
                    }
                    else{
                        return;
                    }
                }
                catch(e: any){
                    if(e.status === 401){
                        return;
                    }
                    console.error(e)
                }
            }
        }
        getProfile();
    }, [])

    return(
        <UserContext.Provider value={user}>{children}</UserContext.Provider >
    )
}