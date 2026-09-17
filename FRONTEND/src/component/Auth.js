
import { Outlet } from "react-router-dom"

export const Auth=()=>{
    return(
            <div>
               Authentication:this page is about auth
               <Outlet/>
            </div>
    )
}