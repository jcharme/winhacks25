"use client";

import { useEffect, useState } from "react"
import Link from "next/link"
import { auth } from "@lib/firebase"
import { User } from "firebase/auth";

export default function Page() {
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        const unsub = auth.onAuthStateChanged(setUser);
        return () => unsub();
    }, []); // user may be null initially then update after page load

    return (
        <>
        {
            user === null ? 
            <Link href="/login">Please login here.</Link>
            :
            <div>
                <div>creating groups goes here</div>
                <div>group list here</div>
            </div>
        }
        </>
    )
}