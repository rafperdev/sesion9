import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export function Productos() {
    const [success, setSucces] = useState(false);
    //Array de Lista de productos
    let listadoProductos;
    //Crea los hook de referencia hacia las cajas de texto
    const nomRef = useRef();
    const precRef = useRef();
    const stockRef = useRef();
    const guardar = () => {
        //Captura los datos de las cajas de texto
        const nom = nomRef.current.value;
        const prec = precRef.current.value;
        const stock = stockRef.current.value;
        //Crea un objeto JSON, con los datos capturados
        const prod = { nom, prec, stock };
        //Obtiene los productos guardados en Local Storage
        listadoProductos = JSON.parse(localStorage.getItem("listaProductos")) || [];
        //Se adiciona el nuevo producto al array
        listadoProductos.push(prod);
        //Se guarda en local storage
        localStorage.setItem("listaProductos", JSON.stringify(listadoProductos));
        //Borra las cajas de texto
        nomRef.current.value = "";
        precRef.current.value = "";
        stockRef.current.value = "";
        //Muestra mensaje de Guardado
        setSucces(true);
        //Oculta mensaje de Guardado
        setTimeout(() => setSucces(false), 3000)
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
                <label htmlFor="">Nombre</label>
                <input ref={nomRef} className="form-control" type="text" />
                <label htmlFor="">Precio</label>
                <input ref={precRef} className="form-control" type="text" />
                <label htmlFor="">Stock</label>
                <input ref={stockRef} className="form-control" type="text" />
                <button className="btn btn-primary" type="button" onClick={guardarCache}>Guardar</button>
                <button className="btn btn-primary" type="button" onClick={consultar}>Consultar</button>
                <Link to="/producto/lista">Listar</Link>
                <Link to="/comentarios">Comentarios</Link>
            </form>
        </>
    )
}