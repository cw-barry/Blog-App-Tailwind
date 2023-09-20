import React from "react";
import { useAuth } from "../context/Auth";
import { Link, useNavigate, NavLink } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { userInfo, logout } = useAuth();

  return (
    <nav className="border-gray-200 bg-gray-50 shadow-md">
      <div className="container mx-auto flex flex-wrap items-center justify-between p-2">
        <Link to="/" className="text-2xl font-semibold ">
          Blog App
        </Link>
        <div className=" w-full md:inline-block md:w-auto">
          <ul
            className="flex flex-col items-center space-y-4 font-medium mt-4 
            md:flex-row md:space-x-9 md:space-y-0 md:mt-0"
          >
            {userInfo && (
              <>
                <li>
               
                  <NavLink
                    to="/post/add"
                  >
    
                    Add Post
                  </NavLink>
                </li>
                <li>
  
                  <NavLink to="/post/profile"> Profile</NavLink>
                </li>
                <li>

                  <button className="btn-primary" onClick={()=>logout(navigate)}> Logout</button>
                </li>
              </>
            )}

            {!userInfo && (
              <>
                <li>

                  <Link className="btn-primary" to="/auth/login">
                    Log In
                  </Link>
                </li>
                <li>
 
                  <Link className="btn-primary" to="/auth/register">
                    Sign up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
