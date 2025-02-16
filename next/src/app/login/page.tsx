"use client";
import { ChangeEvent, FormEvent, FormEventHandler, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { auth } from "@lib/firebase";

export default function Login() {
    const [user, setUser] = useState<User | null>(null);
    const [action, setAction] = useState<"login" | "signup">('signup');
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({
            ...prev, [name]: value,
        }));
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (action == 'signup') {
            createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
                .then((userCredential) => {
                    setUser(userCredential.user);
                })
                .catch((error) => {
                    const errCode = error.code;
                    const errMsg = error.message;
                    console.log(errCode, errMsg);
                });
        } else if (action == 'login') {
            signInWithEmailAndPassword(auth, credentials.email, credentials.password)
                .then((userCredential) => {
                    setUser(userCredential.user);
                })
                .catch((error) => {
                    const errCode = error.code;
                    const errMsg = error.message;
                    console.log(errCode, errMsg);
                });
        }
    }

    const handleSignOut = (e: FormEvent<HTMLButtonElement>) => {
        signOut(auth)
            .then(() => {
                setUser(null);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <div>
            {
                user == null ?
                <form onSubmit={handleSubmit} className="m-4 space-y-2">
                    <select className="block" id="dropdown" value={action} onChange={(e) => {setAction(e.target.value as "login" | "signup")}}>
                        <option value="login">Login</option>
                        <option value="signup">Sign up</option>
                    </select>
                    <label className="block">
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={credentials.email}
                            onChange={handleChange}
                        />
                    </label>
                    <label className="block">
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                        />
                    </label>
                    <button type="submit">Click to {action}</button>
                </form> :
                <button onClick={handleSignOut}>Log out</button>

            }
            
        </div>
    );
  }