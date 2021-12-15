import React, { useEffect, useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { auth } from "../auth/auth";

export function Ventas() {
    const productoRef = useRef();
    const totalRef = useRef();
    const [listado, setListado] = useState([]);
    useEffect(() => {
        fetch("http://localhost:8081/producto/listar", {
            method: "GET"
        }).then(res => res.json())
            .then(res => {
                if (res.estado === "ok") { // 1 == "1"(true)  1 === "1" (false)
                    setListado(res.data);
                }
            })
    }, [])

    function guardar() {
        const total = totalRef.current.value;
        const producto = productoRef.current.value;
        const token = localStorage.getItem("token");
        fetch("http://localhost:8081/ventas/guardar", {
            headers: {
                "content-type": "application/json",
                "authorization": `Bearer ${token}`
            },
            method: "POST",
            body: JSON.stringify({ producto, total })
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
                    <label htmlFor="">Producto</label>
                    <select ref={productoRef} name="" id="">
                        <option value={0}>--Seleccione -- </option>
                        {
                            listado.map(p => <option key={p._id} value={p._id}>{p.nombre}</option>)
                        }
                    </select>
                    <label htmlFor="">Total</label>
                    <input ref={totalRef} type="text" />
                    <button type="button" onClick={guardar}>Guardar</button>
                </form>
                :
                <Link to="/">No autorizado. Vaya al login</Link>
                // <Navigate to="/" />
            }
        </>
    )
}