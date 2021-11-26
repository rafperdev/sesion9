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
                <button className="btn btn-primary" type="button" onClick={guardar}>Guardar</button>
                <Link to="/producto/lista">Listar</Link>
                <Link to="/comentarios">Comentarios</Link>
            </form>
        </>
    )
}