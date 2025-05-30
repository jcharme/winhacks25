"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@lib/firebase"

export default function Login() {
    const [user, setUser] = useState<User | null>(null);
    const [action, setAction] = useState<"login" | "signup">('signup');
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    })

    const [username, setUsername] = useState("");
    const [name, setName] = useState("");

    const handleCredentialsChange = (e: ChangeEvent<HTMLInputElement>) => {
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
                    const user = userCredential.user;
                    setUser(user);

                    return setDoc(doc(db, "users", user.uid), {
                        email: user.email, name, username                 
                    });
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
        e.preventDefault();
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
                    {
                        action == "signup" ? <>
                            <label className="block">
                                Username:
                                <input
                                    type="text"
                                    name="username"
                                    value={username}
                                    onChange={(change) => {setUsername(change.target.value)}}
                                />
                            </label>
                            <label className="block">
                                Name:
                                <input
                                    type="text"
                                    name="name"
                                    value={name}
                                    onChange={(change) => {setName(change.target.value)}}
                                />
                            </label>
                        </> : null
                    }
                    <label className="block">
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={credentials.email}
                            onChange={handleCredentialsChange}
                        />
                    </label>
                    <label className="block">
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleCredentialsChange}
                        />
                    </label>
                    <button type="submit">Click to {action}</button>
                </form> :
                <button onClick={handleSignOut}>Log out</button>

            }
            
        </div>
    );
  }