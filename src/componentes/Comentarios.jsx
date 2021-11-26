import React, { useEffect, useState } from "react";
import { consumir } from "../api/apiComentarios";

export function Comentarios() {
    let [refresh, setRefresh] = useState(true);
    const [listComments, setListComments] = useState([]);
    useEffect(() => {
        const solicitarComments = async () => {
            const data = await consumir();
            setListComments(data);
        };
        solicitarComments();
    }, [refresh])
    return (
        <div>
            <button type="button" onClick={() => setRefresh(!refresh)}>Refrescar</button>
            {
                listComments.map(comment => <p>{comment.body}</p>)
            }
        </div>
    )
}