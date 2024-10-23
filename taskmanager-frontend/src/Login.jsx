import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import background from './assets/bg.jpg'
import styles from './App.module.css'


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('token');
    }, []);

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5001/api/users/login', { email, password });
            if ( response ) {
                localStorage.setItem('token', response.data.accessToken);
                navigate('/dashboard');
            };
        } catch (err) {
            console.error('Login failed:', err.response.data.message);
            alert(err.response.data.message);
        };

    };

    return (
        <>
            <img className={styles['login-bg']} src={background} alt='cool backdrop' />
            
            <form onSubmit={handleLogin}>
                <div className={styles['main-container']}>

                    <div className={styles['title-container']}>
                        <span className={styles.bold}>Login</span>
                    </div>
                    
                    <div className={styles['input-container']}>
                        <input type='email' placeholder='Email ID' value={email} onChange={handleEmail} className={styles['login-input']} />
                        <i className="ri-mail-line"></i>
                    </div>

                    <div className={styles['input-container']}>
                        <input type='password' placeholder='Password' value={password} onChange={handlePassword} className={styles['login-input']} />
                        <i className="ri-lock-2-line"></i>
                    </div>

                    <div className={styles['forgot-pass-container']}>
                        <span className={`${styles['lighter-bold']} ${styles['hover-pointer']}`}><Link to='/forgot-password'>Forgot Password?</Link></span>
                    </div>

                    <div>
                        <button type='submit' className={styles['login-button']}>Login</button>
                    </div>

                    <div className={styles['register-container']}>
                        <span>Don't have an account? <Link to='/register'><span className={styles['lighter-bold']}>Register</span></Link></span>
                    </div>

                </div>
            </form>
        </>
    )
};

export default Login