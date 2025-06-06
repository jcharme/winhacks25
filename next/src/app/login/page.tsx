"use client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
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

const Login = ({
  setUser,
}: {
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}) => {
  const [data, setData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [persist, setPersist] = useState(true);

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!data?.email || !data?.password) return;
    setPersistence(
      auth,
      persist ? browserLocalPersistence : browserSessionPersistence
    )
      .then(() => {
        return signInWithEmailAndPassword(auth, data.email, data.password);
      })
      .then((userCredential) => {
        setUser(userCredential.user);
      })
      .catch((error) => {
        const errCode = error.code;
        const errMsg = error.message;
        console.log(errCode, errMsg);
      });
  };

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form
      onSubmit={handleLogin}
      className="bg-background px-12 py-8 space-y-2 border rounded w-fit shadow"
    >
      <h1 className="text-xl px-8 font-semibold">Login to your account</h1>
      <label className="block">
        <span className="block font-medium">Email</span>
        <input
          className="bg-transparent w-full px-2 rounded border border-text placeholder-text-600"
          type="email"
          name="email"
          placeholder="example@example.com"
          value={data.email}
          onChange={handleFieldChange}
        />
      </label>
      <label className="block font-medium">
        <span className="block">Password</span>
        <input
          className="bg-transparent w-full px-2 rounded border border-text placeholder-text-500"
          type="password"
          name="password"
          placeholder="••••••••"
          value={data.password}
          onChange={handleFieldChange}
        />
      </label>
      <span>
        <hr className="border-t border-text opacity-50 -mx-4 mt-4" />
      </span>
      <div>
        <label className="block">
          <input
            type="checkbox"
            name="remember me"
            checked={persist}
            onChange={() => {
              setPersist(!persist);
            }}
          />
          <span className="ml-1">Remember me?</span>
        </label>
        <button type="submit">Login</button>
      </div>
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
  useEffect(() => {
    const unsub = auth.onAuthStateChanged(setUser);
    return () => unsub();
  }, []); // user may be null initially then update after page load

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
      {!user ? (
        <div className="flex">
          <div className="bg-secondary w-[50vw] h-screen">
            <div className="bg-background w-[50vw] h-screen rounded-tr-xl flex place-items-center justify-center">
              <Login setUser={setUser} />
            </div>
          </div>
          <div className="bg-secondary rounded-bl-xl w-[50vw] h-screen flex place-items-center justify-center">
            <Login setUser={setUser} />
          </div>
        </div>
      ) : (
        <button onClick={handleSignOut}>logout</button>
      )}
    </>
  );
}
