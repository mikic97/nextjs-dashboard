import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Divider, Button, TextField, Grid, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// User type definition
type User = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
};

// Props type definition
type UserListProps = {
    onSelectUser: (user: User) => void;
    onDeleteUser: (userId: number) => void;
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
    users: User[];
};

// MUI theme configuration
const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2',
        },
        background: {
            default: '#f4f5f7',
        },
    },
    typography: {
        fontFamily: 'Arial, sans-serif',
    },
});

const UserList: React.FC<UserListProps> = ({ users, onSelectUser, onDeleteUser, setUsers }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [newUser, setNewUser] = useState({ id: 0, first_name: '', last_name: '', email: '' });

    // Fetch users from the API
    useEffect(() => {
        fetch('https://reqres.in/api/users')
            .then(response => response.json())
            .then(data => {
                if (data && data.data) {
                    const fetchedUsers = data.data.map((item: any) => ({
                        id: item.id,
                        first_name: item.first_name,
                        last_name: item.last_name,
                        email: item.email
                    }));
                    setUsers(fetchedUsers);
                } else {
                    setUsers([]); // Set to empty array if no data is received
                }
            })
            .catch(error => {
                console.error('Error fetching users:', error);
                setUsers([]); // Set to empty array in case of an error
            });
    }, [setUsers]);

    // Handle adding a new user
    const handleAddUser = () => {
        const newUserWithId = { ...newUser, id: Date.now() };
        setUsers([...users, newUserWithId]);
        setNewUser({ id: 0, first_name: '', last_name: '', email: '' });
    };

    // Filter users based on search term
    const filteredUsers = searchTerm
        ? users.filter(user =>
            user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()))
        : users;

    return (
        <ThemeProvider theme={theme}>
            <Paper style={{ margin: '1em', padding: '1em' }}>
                <Grid container spacing={2} style={{ marginBottom: '1em' }}>
                    {/* Input fields for adding a new user */}
                    <Grid item xs={12} md={3}>
                        <TextField
                            label="Ime"
                            value={newUser.first_name}
                            onChange={(e) => setNewUser({ ...newUser, first_name: e.target.value })}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField
                            label="Prezime"
                            value={newUser.last_name}
                            onChange={(e) => setNewUser({ ...newUser, last_name: e.target.value })}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField
                            label="Email"
                            value={newUser.email}
                            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Button variant="contained" color="primary" onClick={handleAddUser}>Dodaj Korisnika</Button>
                    </Grid>

                    {/* Search field */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Pretraga korisnika"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </Grid>
                </Grid>

                {/* List of users */}
                <List style={{ marginTop: '1em', backgroundColor: theme.palette.background.default }}>
                    {filteredUsers.map(user => (
                        <React.Fragment key={user.id}>
                            <ListItem button onClick={() => onSelectUser(user)}>
                                <ListItemText primary={`${user.first_name} ${user.last_name}`} secondary={user.email} />
                                <Button onClick={() => onDeleteUser(user.id)}>Izbriši</Button>
                            </ListItem>
                            <Divider />
                        </React.Fragment>
                    ))}
                </List>
            </Paper>
        </ThemeProvider>
    );
};

export default UserList;
