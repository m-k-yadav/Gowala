import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext'

const Login = () => {
    const { login } = useAuth();
    const navigate =useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    
    const handleChange = (e)=>{
        console.log(e.target.value)
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const res = await axios.post('http://localhost:5000/api/auth/login', form);
            console.log(res.data);
            login(res.data.user, res.data.token);

            if(res.data.user.role ==='admin') {
                navigate('/admin');
            }else {
                navigate('/dashboard');
            }

        }catch(err){
            alert(err?.response?.data?.message || "Something went wrong");
            console.error(err);
        }
    }

  return (
    <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <input name='email' type="email" placeholder='Email' onChange={handleChange} required/>
            <input name='password' type="password" placeholder='Password' onChange={handleChange} required/>
            <button type='submit'>Login</button>
        </form>
    </div>
  )
}

export default Login