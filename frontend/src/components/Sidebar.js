import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import './styles/Sidebar.css'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import Loader from "./Loader";


const Sidebar = () => {
    const navigate = useNavigate();
    const { loading, error, dispatch } = useContext(AuthContext);

    if (loading) return <Loader />;

    if (error) console.log(error);

    const handleLogout = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGOUT" });
        try {
            navigate("/signin");

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="sidebar" id="sidebar">
            <div className="top">
                <span className="logo">CV easy</span>
            </div>
            <hr />
            <div className="center">
                <ul>
                    <Link to="/about" style={{ textDecoration: "none" }}>
                        <li>
                            <PersonIcon />
                            <span>My Profile</span>
                        </li>
                    </Link>
                    <Link to="/skills" style={{ textDecoration: "none" }}>
                        <li>
                            <WorkspacePremiumIcon />
                            <span>My Skills</span>
                        </li>
                    </Link>
                    <Link to="/projects" style={{ textDecoration: "none" }}>
                        <li>
                            <FolderSpecialIcon />
                            <span>My Projects</span>
                        </li>
                    </Link>
                    <Link to="/report" style={{ textDecoration: "none" }}>
                        <li>
                            <AssessmentIcon />
                            <span>My Report</span>
                        </li>
                    </Link>
                    <li onClick={handleLogout}>
                        <LogoutIcon />
                        <span>SignOut</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
