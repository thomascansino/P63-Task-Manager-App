import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import background from './assets/bg.jpg'
import styles from './App.module.css'

function ForgotPass() {
    
    useEffect(() => {
        localStorage.removeItem('token');
    }, []);

    return (
        <>
            <img className={styles['login-bg']} src={background} alt='cool backdrop' />
            
            <form>
                <div className={styles['main-container']}>

                    <div className={styles['title-container']}>
                        <span className={styles.bold}>Forgot Password?</span>
                    </div>
                    
                    <div className={styles['input-container']}>
                        <input type='email' placeholder='Email ID' className={styles['login-input']} />
                        <i className="ri-mail-line"></i>
                    </div>

                    <div>
                        <button type='submit' className={styles['login-button']}>Next</button>
                    </div>

                    <div className={styles['register-container']}>
                        <span>Don't have an account? <Link to='/register'><span className={styles['lighter-bold']}>Register</span></Link></span>
                    </div>

                    <div>
                        <Link to='/login'>
                            <span className={styles['lighter-bold']} style={{fontSize: '9.888px'}}>Go back to login page</span>
                        </Link>
                    </div>

                </div>
            </form>
        </>
    )
};

export default ForgotPass