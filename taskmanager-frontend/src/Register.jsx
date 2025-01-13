import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import ClipLoader from 'react-spinners/ClipLoader'
import background from './assets/bg.jpg';
import styles from './App.module.css'

function Register() {
    const [ username, setUsername ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('token');
    }, []);

    const handleUsername = (e) => {
        setUsername(e.target.value);
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    };
    
    const handleRegister = async (e) => {
        e.preventDefault();

        if ( !username || !email || !password || !confirmPassword ) {
            alert('All fields are mandatory');
            return;
        };

        if ( password !== confirmPassword ) {
            alert('Passwords do not match');
            return;
        };

        try {
            setIsLoading(true);
            const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/users/register`, { username, email, password, confirmPassword });
            alert('Register successful');
            setIsLoading(false);
            navigate('/login');
        } catch (err) {
            console.error('Error registering:', err.response.data.message);
            setIsLoading(false);
            alert(err.response.data.message);
        };

    };

    return (
        <>
            <img className={styles['login-bg']} src={background} alt='cool backdrop' />
            
            <form onSubmit={handleRegister} className={styles['container']}>
                <div className={styles['main-container']}>
                
                <div className={styles['title-container']}><span className={styles['bold']}>Register</span></div>
                
                <div className={styles['input-container']}>
                    <input type='text' placeholder='Username' value={username} onChange={handleUsername} className={styles['login-input']} />
                    <i className='ri-user-line'></i>
                </div>

                <div className={styles['input-container']}>
                    <input type='email' placeholder='Email ID' value={email} onChange={handleEmail} className={styles['login-input']} />
                    <i className="ri-mail-line"></i>
                </div>

                <div className={styles['input-container']}>
                    <input type='password' placeholder='Password' value={password} onChange={handlePassword} className={styles['login-input']} />
                    <i className="ri-lock-2-line"></i>
                </div>

                <div className={styles['input-container']}>
                    <input type='password' placeholder='Confirm Password' value={confirmPassword} onChange={handleConfirmPassword} className={styles['login-input']} />
                    <i className="ri-lock-2-line"></i>
                </div>

                <div>
                    { isLoading ? 
                    <ClipLoader 
                    color='#d1d5db'
                    loading={isLoading}
                    size={25}
                    /> :
                    <button type='submit' className={styles['login-button']}>Register</button>}
                </div>

                <div>
                    <Link to='/login'>
                    <span className={styles['lighter-bold']} style={{fontSize: '9.888px'}}>Go back to login page</span>
                    </Link>
                </div>

                </div>
            </form>
        </>
    );
};

export default Register