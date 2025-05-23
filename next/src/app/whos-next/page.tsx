"use client";

import { use, useEffect, useState } from "react"
import Link from "next/link"
import { auth, db } from "@lib/firebase"
import { User } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { setgroups } from "process";

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

    const [groups, setGroups] = useState<Group[] | null>([]);
    useEffect(() => {
        if (user === null) {
            setGroups([]);
            return;
        }

        async function fetchGroups() {
            const groupsRef = collection(db, "whos-next");
            const q = query(groupsRef, where("users", "array-contains", user?.uid));
            const snapshot = await getDocs(q);
            const data = snapshot.docs.map(doc => ({
                id: doc.id, ...doc.data()
            }));
            setGroups(data);
        }

        fetchGroups();
    }, [user?.uid]);

    return (
        <>
        {
            user === null ? 
            <Link href="/login">Please login here.</Link>
            :
            <div>
                <div>creating groups goes here</div>
                <div>
                    {
                        groups?.length !== 0 ?
                        <ul>
                            
                        </ul> : <p>No groups loaded.</p>
                    }
                </div>
            </div>
        }
        </>
    )
}