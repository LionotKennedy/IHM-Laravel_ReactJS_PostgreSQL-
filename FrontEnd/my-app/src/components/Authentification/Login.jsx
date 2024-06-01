// Login.jsx
import './login.css'
import React, { useState } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {

    const history = useNavigate();
    const [loginInput, setLogin] = useState({
        email:'',
        password:'',
        error_list: [],
    })

    const handleInput = (e) => {
        e.persist();
        setLogin({...loginInput, [e.target.name]: e.target.value});

    }
    
    const loginSubmit = (e) => {
        e.preventDefault();
        
        // Vérifier si les champs email et password ne sont pas vides
        if (!loginInput.email.trim() || !loginInput.password.trim()) {
            // Afficher un message d'erreur si un champ est vide
            toast.error('Veuillez remplir tous les champs');
            return; // Arrêter l'exécution de la fonction
        }
        const data = {
            email: loginInput.email,
            password: loginInput.password,
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            // Récupérer le jeton CSRF
            const csrfToken = response.data.csrfToken;

            // Inclure le jeton CSRF dans les en-têtes de la requête POST
            axios.post(`/api/login`, data, {
                headers: {
                    'X-CSRF-TOKEN': csrfToken
                }
            }).then(res => {
                if(res.data.status === 200)
                {
                    // Faire quelque chose en cas de succès
                    console.log("bonjour toi");
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    console.log( res.data.token);
                    console.log(res.data.username);
                    history('/admin/home');
                }
                else if(res.data.status === 401){
                    // Gérer l'erreur d'authentification
                    console.log("tsy bonjour toi");
                    toast.error('Email ou mot de passe incorrect');
                }
                else
                {
                    setLogin({...loginInput, error_list: res.data.validator_error});
                }
            }).catch(error => {
                // Gérer les erreurs de la requête POST
                console.error(error);
            });
        }).catch(error => {
            // Gérer les erreurs de la récupération du jeton CSRF
            console.error(error);
        });
    }

    return (
        <motion.div className="containerLogin"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        >
            <form onSubmit={loginSubmit} className="form_main">
                <p className="heading">Connexion</p>
                <div className="inputContainer">
                    <svg className="inputIcon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#2e2e2e" viewBox="0 0 16 16">
                        <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
                    </svg>
                    <input type="email" name='email' onChange={handleInput} value={loginInput.email} className="inputField" id="username" placeholder="Email"></input><br />
                    <span className='erreur'>{loginInput.error_list.email}</span>
                </div>
                <div className="inputContainer">
                    <svg className="inputIcon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#2e2e2e" viewBox="0 0 16 16">
                        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
                    </svg>
                    <input type="password" name='password' onChange={handleInput} value={loginInput.password} className="inputField" id="password" placeholder="Mot de passe"></input><br />
                    <span className='erreur'>{loginInput.error_list.password}</span>
                </div>
                <button type='submit' id="button">Se connect</button>
                <a className="forgotLink" href="#">Oublier le mot de passe?</a>
            </form>
            <ToastContainer />
        </motion.div>
    )
}

export default Login;
