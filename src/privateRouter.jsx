import { toast } from "react-toastify";
import {Navigate, Outlet } from 'react-router-dom'

const privateRouter = () => {

    let currentUser = localStorage.getItem('user')||false;
    
    if(!currentUser) {
        toast.warning('You need to login first!')
        return <Navigate to="/auth/login" replace/>
    }else{
        return <Outlet/>
    }
}

export default privateRouter