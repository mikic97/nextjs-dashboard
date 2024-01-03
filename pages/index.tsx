// pages/index.tsx
import React, { useState } from 'react';
import UserList from './components/UserList';
import UserDetails from './components/UserDetails';
import Grid from '@mui/material/Grid';


type User = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
};

const Home: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const handleSelectUser = (user: User) => {
        setSelectedUser(user);
    };

    const handleDeleteUser = (userId: number) => {
        setUsers(users.filter(user => user.id !== userId));
    };

    const handleUpdateUser = (updatedUser: User) => {
        setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
        setSelectedUser(null);
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <UserList
                    users={users}
                    setUsers={setUsers}
                    onSelectUser={handleSelectUser}
                    onDeleteUser={handleDeleteUser}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                {selectedUser && (
                    <UserDetails
                        user={selectedUser}
                        onUpdateUser={handleUpdateUser}
                    />
                )}
            </Grid>
        </Grid>
    );
};

export default Home;


