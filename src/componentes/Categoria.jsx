import React, { useEffect, useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { auth } from "../auth/auth";

export function Categoria() {
    const productoRef = useRef();
    const nombreRef = useRef();
    

    function guardar() {
        const nombre = nombreRef.current.value;
        const token = localStorage.getItem("token");
        fetch("http://localhost:8081/categoria/guardar", {
            headers: {
                "content-type": "application/json",
                "authorization": `Bearer ${token}`
            },
            method: "POST",
            body: JSON.stringify({ nombre })
        }).then(res => res.json())
            .then(res => {
                alert(res.msg);
            })
    }

    return (
        <>
            {/* condicion ? true : false */}
            {auth() ?
                <form action="">
                    <label htmlFor="">Nombre</label>
                    <input ref={nombreRef} type="text" />                    
                    <button type="button" onClick={guardar}>Guardar</button>
                </form>
                :
                <Link to="/">No autorizado. Vaya al login</Link>
                // <Navigate to="/" />
            }
        </>
    )
}