import { getAuth } from "firebase/auth";


 
export const Logout = async (setCurrentUser)=>{
    try {
         setCurrentUser(null)
        await  getAuth().signOut();
        
      } catch (error) {
        console.error(error);
      }
}