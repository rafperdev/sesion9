import React from 'react';

export function ProductList() {
    const listado = JSON.parse(localStorage.getItem("listaProductos")) || [];
    return(
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {
                      listado.map(prod => <tr>
                          <td>{prod.nom}</td>
                          <td>{prod.prec}</td>
                          <td>{prod.stock}</td>
                          </tr>
                        )  
                    }
                </tbody>
            </table>
        </>
    )
}