"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@lib/firebase";

interface LoginData {
  email: string;
  password: string;
}

const Login = (
    setUser: {setUser: React.Dispatch<React.SetStateAction<User | null>>;}
) => {
  const [data, setData] = useState<LoginData>();

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!data?.email || !data?.password) return null;
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        setUser(userCredential.user);
      })
      .catch((error) => {
        const errCode = error.code;
        const errMsg = error.message;
        console.log(errCode, errMsg);
      });
  };

  const handleCredentialsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleLogin} className="m-4 space-y-2">
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
    </form>
  );
};

interface SignupData extends LoginData {
  name: {
    first: string;
    last: string;
  };
  username: string;
}

const Signup = () => {
  const [data, setData] = useState<SignupData>();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUserWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password
    )
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);

        return setDoc(doc(db, "users", user.uid), {
          email: user.email,
          name,
          username,
        });
      })
      .catch((error) => {
        const errCode = error.code;
        const errMsg = error.message;
        console.log(errCode, errMsg);
      });
  };

  return (
    <form>
      {/* <label className="block">
            Username:
            <input
              type="text"
              name="username"
              value={username}
              onChange={(change) => {
                setUsername(change.target.value);
              }}
            />
          </label>
          <label className="block">
            Name:
            <input
              type="text"
              name="name"
              value={name}
              onChange={(change) => {
                setName(change.target.value);
              }}
            />
          </label>
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
      <button type="submit">Click to {action}</button> */}
    </form>
  );
};

export default function Account() {
  const [user, setUser] = useState<User | null>(null);
  //   const [action, setAction] = useState<"login" | "signup">("signup");
  //   const [credentials, setCredentials] = useState({
  //     email: "",
  //     password: "",
  //   });

  //   const [username, setUsername] = useState("");
  //   const [name, setName] = useState("");

  const handleSignOut = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {user ? (
        <div className="flex">
          <div className="w-[50vw] h-screen">
            <Login setUser={setUser} />
          </div>
          <div className="text-background bg-secondary w-[50vw] h-screen">
            <Signup />
          </div>
        </div>
      ) : (
        <p>logout - todo</p>
      )}
    </>
  );
}
