import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
    const navigate = useNavigate();
    const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("User");
    navigate("/")
    }
   
      return (
        <button 
            onClick={handleLogout}
            className="p-1 bg-black text-white cursor-pointer text-md inline-flex items-center gap-5"
        >
            Logout
        </button>
    )
}