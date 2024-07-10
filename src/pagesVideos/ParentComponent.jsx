import React, { useState, useEffect } from 'react';
import CreateVideos from './CreateVideos';
import axios from 'axios';

const ParentComponent = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const response = await axios.get('http://localhost:3000/users', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, []);

    if (!user) {
        return <p>Loading...</p>;
    }

    return <CreateVideos user={user} />;
};

export default ParentComponent;
