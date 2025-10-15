import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { FiArrowLeft } from "react-icons/fi";

import api from '../../services/api';

import './styles.css'

import JMJ_logo from '../../assets/JMJ_logo.jpg';

export default function NovoLivro(){
        const [id        , setId        ] = useState('');
        const [title     , setTitle     ] = useState('');
        const [author    , setAuthor    ] = useState('');
        const [price     , setPrice     ] = useState('');           
        const [launchDate, setLaunchDate] = useState(''); 

        const {bookId} = useParams();

        const navigate = useNavigate();
        
        const accessToken = localStorage.getItem('accessToken');

        
        async function loadBook(){
            try {
                const resposta = await api.get(`api/book/v1/${bookId}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })

                let dataAjustada = resposta.data.launchDate.split("T", 10)[0];

                setId(resposta.data.id)
                setTitle(resposta.data.title)
                setAuthor(resposta.data.author)
                setLaunchDate(dataAjustada)
                setPrice(resposta.data.price)

            } catch (err) {
                alert('Error recovering Book! Try again!');
                navigate('/book');
            }

        }

        useEffect(() => {
            if (bookId === '0') return;
            else loadBook();
        }, [bookId])
    
async function saveOrUpdate(e) {
    e.preventDefault();

    const data = {
        title,        
        author,      
        launchDate,      
        price      
    }

    //const accessToken = localStorage.getItem('accessToken');
    
    try {
        if(bookId==='0'){
            await api.post('api/book/v1', data, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        } else {
            data.id = id;
            await api.put('api/book/v1', data, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        }
        
        navigate('/Book');
    } catch (err) {
        alert('Error while recording Book! Try again!');

    }
}
    return(
        <div className="novo-livro-container">
            <div className="conteudo">
                <section className="form">
                    <img src={JMJ_logo} alt="Imagem_principal"/>
                    <h1>{bookId === '0' ? 'Cadastre aqui um novo livro!!!' : 'Edite o seu livro!!!'}</h1>
                    <p>{bookId === '0' ? 'Coloque as informações ao lado:' : 'Altere as informações ao lado:'} </p>
                    <Link className="back-link" to="/book">
                        <FiArrowLeft size={16} color="251FC5"/>
                        Retono
                    </Link>
                </section>
                <form onSubmit={saveOrUpdate}>
                    <input
                        placeholder="Título"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <input
                        placeholder="Autor"
                        value={author}
                        onChange={e => setAuthor(e.target.value)}
                    />
                    <input
                        placeholder="Preço"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    />
                    <input
                        type="date"
                        value={launchDate}
                        onChange={e => setLaunchDate(e.target.value)}
                    />
                    <button className="button" type="submit">{bookId === '0' ? 'Adicionar' : 'Salvar'}</button>
                </form>
            </div>
        </div>
    );
}