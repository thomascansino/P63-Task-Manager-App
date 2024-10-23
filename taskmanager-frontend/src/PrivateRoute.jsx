import { Navigate, Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

function PrivateRoute() {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [userData, setUserData] = useState(null);
    const token = localStorage.getItem('token');

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/users/current', config);
                if ( response ) {
                    setIsAuthenticated(true);
                    setUserData(response.data);
                };
            } catch (err) {
                setIsAuthenticated(false);
                alert(err.response.data.message);
            };
        };

        verifyToken();
    }, [token]);

    if ( isAuthenticated ) {
        console.log(`Login successful. Welcome, ${userData.username}!`);
        return <Outlet />
    } else if ( isAuthenticated === null ) {
        return <div>Loading...Please wait.</div>
    } else {
        return <Navigate to='/login' />
    };
    
};

export default PrivateRoute;