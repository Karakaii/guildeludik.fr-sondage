import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';

export default function LoginForm({ setUser }) {
    //Preparing hooks for entries of the form
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const login = e => {
        e.preventDefault()

        //Loging in the user using Meteor and inputs from the form
        Meteor.loginWithPassword(username, password)

        //Updating the user
        setUser(Meteor.user())
    }

    return (
        <div className="flex-center">
            <form onSubmit={login} className="login-form">
                <label htmlFor="username">Pseudo</label>
                <input
                    type="text"
                    placeholder="Pseudo..."
                    name="username"
                    required
                    onChange={e => setUsername(e.target.value)}
                />
                <br />

                <label htmlFor="password">Mot de Passe</label>
                <input
                    type="password"
                    placeholder="Mot de passe..."
                    name="password"
                    required
                    onChange={e => setPassword(e.target.value)}
                />
                <br />
                <br />

                <div className="flex-center"><button type="submit">Connexion</button></div>

            </form>
        </div>
    )
}
