import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import ClipLoader from 'react-spinners/ClipLoader'
import background from './assets/bg.jpg'
import styles from './App.module.css'


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
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

        if ( !email || !password ) {
            alert('All fields are mandatory');
            return;
        };

        try {
            setIsLoading(true);
            const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/users/login`, { email, password });
            localStorage.setItem('token', response.data.accessToken);
            setIsLoading(false);
            navigate('/dashboard');
        } catch (err) {
            console.error('Login failed:', err.response.data.message);
            setIsLoading(false);
            alert(err.response.data.message);
        };

    };

    return (
        <div className={styles['parent-container']}>
            
            <div className={styles['document-container']}>

                <div className={styles['slogan-container']}>
                    <div>
                        <div className={styles['first-line']}>Manage Tasks,</div>
                        <div>Plan Ahead,</div>
                        <div className={styles['third-line']}>Stay on Schedule.</div>
                    </div>
                </div>

                <form onSubmit={handleLogin} className={styles['container']}>
                    <div className={styles['login-bg-container']}>
                        <img className={styles['login-bg']} src={background} alt='cool backdrop' />
                    </div>
                    
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
                            { isLoading ? 
                            <ClipLoader 
                            color='#d1d5db'
                            loading={isLoading}
                            size={25}
                            /> :
                            <button type='submit' className={styles['login-button']}>Login</button>}
                        </div>

                        <div className={styles['register-container']}>
                            <span>Don't have an account? <Link to='/register'><span className={styles['lighter-bold']}>Register</span></Link></span>
                        </div>

                    </div>
                </form>

            </div>

        </div>
    )
};

export default Login