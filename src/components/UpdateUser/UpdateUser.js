import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UpdateUser = () => {
    const { id } = useParams();
    const [user, setUser] = useState({});

    useEffect(() => {
        fetch(`http://localhost:5000/user/${id}`)
            .then((res) => res.json())
            .then((data) => setUser(data));
    }, []);

    const handleUpdateUser = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;

        const user = { name, email };

        fetch(`http://localhost:5000/user/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('success', data);
                alert('user updated successfully!!!');
                event.target.reset();
            });
    };

    return (
        <div>
            <h2>Updating user {user.name}</h2>
            <form onSubmit={handleUpdateUser}>
                <input type="text" name="name" placeholder="Name" required />
                <br />
                <input type="email" name="email" placeholder="Email" required />
                <br />
                <input type="submit" value="Update User" />
            </form>
        </div>
    );
};

export default UpdateUser;
