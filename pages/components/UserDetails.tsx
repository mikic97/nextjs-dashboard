import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, TextField, Button } from '@mui/material';

type User = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
};

type UserDetailsProps = {
    user: User | null; // Allow 'user' to be null
    onUpdateUser: (user: User) => void;
};

const UserDetails: React.FC<UserDetailsProps> = ({ user, onUpdateUser }) => {
    // Initialize with an empty user if 'user' is null
    const [editableUser, setEditableUser] = useState<User>(user || { id: 0, first_name: '', last_name: '', email: '' });

    useEffect(() => {
        if (user) {
            setEditableUser(user);
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditableUser({ ...editableUser, [e.target.name]: e.target.value });
    };

    if (!user) {
        return <div>No user selected.</div>; // Return a message or null if no user is selected
    }

    return (
        <Card style={{ margin: '1em', padding: '1em' }}>
            <CardContent>
                <Typography variant="h5">Uredi uporabnika</Typography>
                <TextField
                    label="Ime"
                    name="first_name"
                    value={editableUser.first_name}
                    onChange={handleChange}
                    margin="normal"
                    fullWidth
                />
                <TextField
                    label="Priimek"
                    name="last_name"
                    value={editableUser.last_name}
                    onChange={handleChange}
                    margin="normal"
                    fullWidth
                />
                <TextField
                    label="Email"
                    name="email"
                    value={editableUser.email}
                    onChange={handleChange}
                    margin="normal"
                    fullWidth
                />
                <Button onClick={() => onUpdateUser(editableUser)}>Posodobi</Button>
            </CardContent>
        </Card>
    );
};

export default UserDetails;
