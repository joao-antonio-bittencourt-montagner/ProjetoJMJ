import React, { useState, useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { FiEdit, FiTrash2, FiLogOut } from "react-icons/fi";

import './styles.css';
import JMJ_logo from '../../assets/JMJ_logo.jpg';

import api from '../../services/api';


export default function Book(){

    const navigate = useNavigate();
    
    const [books, setBook] = useState([]);
    const [page, setPage] = useState(0);
        
    const username = localStorage.getItem('username');
    const accessToken = localStorage.getItem('accessToken');



        async function logOut(){
            localStorage.clear();
            navigate('/');
        }

         async function editBook(id){
            try {
                navigate(`/book/Adicionar/${id}`);
            } catch (err) {
                alert("Edit failed! Try again");
            }
        }

        async function deleteBook(id){
            try {
                await api.delete(`api/book/v1/${id}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }

                });
                
                setBook(books.filter(book => book.id !== id))
            } catch (err) {
                alert("Delete failed!");
            }
        }

        async function fetchMoreBooks(){
            const resposta = await api.get('api/book/v1', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                    },
                    params: {
                        page: page,
                        size: 4
                    }
                });

                setBook([...books, ...resposta.data._embedded.books])
                setPage(page + 1);
        }

        useEffect(()=>{ fetchMoreBooks(); }, [])

    return(
        <div className="container">
            <header>
                <img src={JMJ_logo} alt="Imagem_principal"/>
                
                <span><strong>{username.toUpperCase()}</strong>, seja bem-vindo!</span>

                <Link className="button" to="/book/Adicionar/0">Adicionar</Link>    

                <button type="button" onClick={logOut}>
                    <FiLogOut size={18} color="#251FC5"/>
                </button>  
            </header>

            <h1>Lista de itens</h1>
                <ul>
                    {books.map(book => (
                        <li key = {book.id}>
                            <strong>Identificador:</strong>
                            <p>{book.id}</p>
                            <strong>Título:</strong>
                            <p>{book.title}</p>
                            <strong>Autor:</strong>
                            <p>{book.author}</p>
                            <strong>Preço:</strong>
                            <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(book.price)}</p>
                            <strong>Data:</strong>
                            <p>{Intl.DateTimeFormat('pt-BR').format(new Date(book.launchDate))}</p>

                            <button onClick={() => editBook(book.id)} type="button">
                                <FiEdit size={18} color="#1114cfff"/>
                            </button>

                            <button onClick={() => deleteBook(book.id)} type="button">
                                <FiTrash2 size={18} color="#9d0808ff"/>
                            </button>
                        </li>
                    ))}
                </ul>
                <button className="button" onClick={fetchMoreBooks} type="buton">Carregar mais</button>
        </div>
    );
}