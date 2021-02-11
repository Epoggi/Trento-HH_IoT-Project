import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import './Login.css';
import PropTypes from 'prop-types';

function Login({ setToken, setType }) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const loginUser = async (credentials) => {
        return fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        .then(data => data.json())
    }
        
        const handleSubmit = async e => {
            e.preventDefault();
            const answer = await loginUser({
              email,
              password
            });
            setToken(answer.token);
            setType(answer.type);
        }

    return (
        <div>
            <Grid container spacing={3} alignItems="center" justify="center">
                <Grid item xs={4}>
                    <div className="login-wrapper">
                        <h2>Login</h2>
                            <form onSubmit={handleSubmit}>
                            <label>
                                <p>Email</p>
                                <input type="text" onChange={e => setEmail(e.target.value)}/>
                            </label>
                            <label>
                                <p>Password</p>
                                <input type="password" onChange={e => setPassword(e.target.value)}/>
                            </label>
                            <div style={{paddingTop:5}}>
                                <button type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired,
    setType: PropTypes.func.isRequired
}

export default Login