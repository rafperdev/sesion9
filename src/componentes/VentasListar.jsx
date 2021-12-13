import React, { useEffect, useRef, useState } from "react";

export function VentasListar() {
    const [listado, setListado] = useState([]);
    useEffect(() => {
        fetch("http://localhost:8081/ventas/listar", {
            method: "POST"
        }).then(res => res.json())
            .then(res => {

                setListado(res);

            })
    }, [])

    return (
        <table>
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {
                    listado.map(v => <tr><td>{v.producto.nombre}</td><td>{v.total}</td></tr>)
                }
            </tbody>
        </table>
    )
}