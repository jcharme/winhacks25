"use client";

import { FormEvent, use, useEffect, useState } from "react"
import Link from "next/link"
import { auth, db } from "@lib/firebase"
import { User } from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

interface Group {
    id: string;
    name?: string;
    users?: string[];
}

export default function Page() {
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        const unsub = auth.onAuthStateChanged(setUser);
        return () => unsub();
    }, []); // user may be null initially then update after page load

    async function fetchGroups() {
        const groupsRef = collection(db, "whos-next");
        const q = query(groupsRef, where("users", "array-contains", user?.uid));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({
            id: doc.id, ...doc.data()
        }));
        setGroups(data);
    }

    const [groups, setGroups] = useState<Group[] | null>([]);
    useEffect(() => {
        if (user === null) {
            setGroups([]);
            return;
        }

        fetchGroups();
    }, [user?.uid]);

    const [groupName, setGroupName] = useState("");
    async function createGroup(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const groupsRef = collection(db, "whos-next");
        const docRef = await addDoc(groupsRef, {
            name: groupName,
            users: [user?.uid]
        });

        fetchGroups(); // reload the groups
    }

    return (
        <>
        {
            user === null ? 
            <Link href="/login">Please login here.</Link>
            :
            <div>
                <form onSubmit={createGroup}>
                    <button type="submit">Create group</button>
                    <input 
                        type="text" placeholder="Group name..."
                        onChange={(e) => {setGroupName(e.target.value)}}
                    />
                </form>
                <div>
                    {
                        groups?.length !== 0 ?
                        <ul>
                            {groups?.map(group => (
                                <li key={group.id}>
                                    {group.name}
                                </li>
                            ))}
                        </ul> : <p>No groups loaded.</p>
                    }
                </div>
            </div>
        }
        </>
    )
}