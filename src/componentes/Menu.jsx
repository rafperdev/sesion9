import React from "react";
import { Link } from "react-router-dom";

export function Menu() {
    function logout() {
        localStorage.removeItem("token");
        // const navigate = useNavigate()
        // navigate('/');
        window.location.href = "/";
    }
    return (
        <nav style={{ margin: 10 }}>
            <Link to="/producto" style={{ padding: 5 }}>Productos </Link>
            <Link to="/ventas" style={{ padding: 5 }}>Ventas </Link>
            <Link to="/categoria" style={{ padding: 5 }}>Categoria </Link>
            <button className="btn btn-primary" type="button" onClick={logout}>Logout</button>
        </nav>
    )
}