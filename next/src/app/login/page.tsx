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
import ArrowButton from "@/components/ArrowButton";

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
      className="bg-background w-96 px-12 py-8 space-y-2 border rounded shadow"
    >
      <h1 className="text-xl font-semibold">Login to your account</h1>
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
      <div className="flex justify-between items-center">
        <ArrowButton type="submit">Login</ArrowButton>
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

const Signup = ({
  setUser,
}: {
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}) => {
  const [data, setData] = useState<SignupData>({
    name: {
      first: "",
      last: "",
    },
    username: "",
    email: "",
    password: "",
  });
  const [persist, setPersist] = useState(true);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !data?.email ||
      !data?.username ||
      !data?.password ||
      !data?.name?.first ||
      !data?.name?.last
    )
      return;

    setPersistence(
      auth,
      persist ? browserLocalPersistence : browserSessionPersistence
    )
      .then(() => {
        return createUserWithEmailAndPassword(auth, data.email, data.password);
      })
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);

        return setDoc(doc(db, "users", user.uid), {
          email: user.email,
          name: {
            first: data.name.first,
            last: data.name.last,
          },
          username: data.username,
        });
      })
      .catch((error) => {
        const errCode = error.code;
        const errMsg = error.message;
        console.log(errCode, errMsg);
      });
  };

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => {
      if (name === "first" || name === "last") {
        return {
          ...prev,
          name: {
            ...prev.name,
            [name]: value,
          },
        };
      }
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-background w-96 px-12 py-8 space-y-2 border rounded shadow"
    >
      <h1 className="text-xl font-semibold">Sign up</h1>
      <label className="block">
        <span className="block font-medium">Name</span>
        <div className="flex gap-2">
          <input
            className="bg-transparent w-full px-2 rounded border border-text placeholder-text-600"
            type="text"
            name="first"
            placeholder="First"
            value={data.name.first}
            onChange={handleFieldChange}
          />
          <input
            className="bg-transparent w-full px-2 rounded border border-text placeholder-text-600"
            type="text"
            name="last"
            placeholder="Last"
            value={data.name.last}
            onChange={handleFieldChange}
          />
        </div>
      </label>

      <label className="block">
        <span className="block font-medium">Username</span>
        <input
          className="bg-transparent w-full px-2 rounded border border-text placeholder-text-600"
          type="text"
          name="username"
          placeholder="Username"
          value={data.username}
          onChange={handleFieldChange}
        />
      </label>
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

      <div className="flex justify-between items-center">
        <ArrowButton type="submit">Sign up</ArrowButton>
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
      </div>
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
            <Signup setUser={setUser} />
          </div>
        </div>
      ) : (
        <button onClick={handleSignOut}>logout</button>
      )}
    </>
  );
}
