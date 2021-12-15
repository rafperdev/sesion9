import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export function Productos() {
    const [success, setSucces] = useState(false);
    //Array de Lista de productos
    let listadoProductos;
    //Crea los hook de referencia hacia las cajas de texto
    const nomRef = useRef();
    const precRef = useRef();
    const stockRef = useRef();
    const categoriaRef = useRef();

    const [listado, setListado] = useState([]);
    useEffect(() => {
        const token = localStorage.getItem("token");
        fetch("http://localhost:8081/categoria/listar", {
            headers: {
                "content-type": "application/json",
                "authorization": `Bearer ${token}`
            },
            method: "GET"
        }).then(res => res.json())
            .then(res => {
                if (res.estado === "ok") { // 1 == "1"(true)  1 === "1" (false)
                    setListado(res.data);
                }
            }).catch(error => console.log(error));
    }, [])

    const guardar = () => {
        //Captura los datos de las cajas de texto
        const nombre = nomRef.current.value;
        const precio = precRef.current.value;
        const stock = stockRef.current.value;
        const categoria = categoriaRef.current.value;
        const token = localStorage.getItem("token");
        fetch("http://localhost:8081/producto/guardar", {
            headers: {
                "content-type": "application/json",
                "authorization": `Bearer ${token}`
            },
            method: "POST",
            body: JSON.stringify({ nombre, precio, stock, categoria })
        }).then(res => res.json())
            .then(res => {
                alert(res.msg);
            })
    };


    function consultar() {
        const nombre = nomRef.current.value;
        fetch(`http://localhost:8081/producto/consultar/${nombre}`)
            .then(res => res.json())
            .then(res => {
                precRef.current.value = res.price;
                stockRef.current.value = res.height;
            })
    }
    const apiProductoList = () => new Promise(
        async function (resolve, reject) {
            const nombre = "Basil";
            try {
                const result = await fetch(`http://localhost:8081/producto/consultar/${nombre}`);
                let data = await result.json();
                resolve(data);
            } catch (error) {
                reject(error);
            }
        });
    const guardarEnDisco = (data) => new Promise(
        function (resolve, reject) {
            try {
                localStorage.setItem("productos", JSON.stringify(data))
            } catch (error) {

            }
        }
    )

    function guardarCache() {
        apiProductoList()
            .then(res => guardarEnDisco(res))
            .catch(error => console.log(error));
    }
    return (
        <>
            {success && <div className="alert alert-primary" role="alert">Producto guardado :)!</div>}
            <form>
                <label htmlFor="">Categorias</label>
                <select ref={categoriaRef} name="" id="">
                    <option value={0}>--Seleccione -- </option>
                    {
                        listado.map(p => <option key={p._id} value={p._id}>{p.nombre}</option>)
                    }
                </select>
                <label htmlFor="">Nombre</label>
                <input ref={nomRef} className="form-control" type="text" />
                <label htmlFor="">Precio</label>
                <input ref={precRef} className="form-control" type="text" />
                <label htmlFor="">Stock</label>
                <input ref={stockRef} className="form-control" type="text" />
                <button className="btn btn-primary" type="button" onClick={guardar}>Guardar</button>
                <button className="btn btn-primary" type="button" onClick={consultar}>Consultar</button>
                <Link to="/producto/lista">Listar</Link>
                <Link to="/comentarios">Comentarios</Link>
            </form>
        </>
    )
}