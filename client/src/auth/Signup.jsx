import { useState } from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { useAuth } from "./AuthContext";
import React from 'react'

const Signup = () => {
    const {login} = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
    });

    const handleChange = (e)=>{
        setForm({...form, [e.target.name]: e.target.value });
    } //here we are simply updateing the form [name]:"value"

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const res = await axios.post('http://localhost:5000/api/auth/signup', form);
            login(res.data.user, res.data.token);
            navigate('/dashboard');
        }catch(error){
            alert(error.response?.data?.message || 'Signup failed');
        }
    };

  return (
    <div>
        <h1>Signup</h1>
        <form onSubmit={handleSubmit}>
            <input name="text" placeholder="Name" onChange={handleChange} required/>
            <input name="phone" placeholder="Phone" onChange={handleChange} required/>
            <input name="email" type="email" placeholder="Email" onChange={handleChange} required/>
            <input name="password" type="password" placeholder="Password" onChange={handleChange} required/>
            <button type="submit">Create Account</button>
        </form>
    </div>
  )
}

export default Signup