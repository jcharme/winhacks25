"use client";

import { useEffect, useState } from "react";
import { auth } from "src/lib/firebase";
import { User } from "firebase/auth";

export default function Page() {
    const [user, setUser] = useState<User | null>(null)

    // Listen for authentication state changes
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(setUser)
      return () => unsubscribe() // Cleanup on component unmount
    }, [])

    return (
      <div className="grid grid-cols-10">
            <div id="user" className="col-span-3 h-screen bg-green-800">
              {user?.email ?? 'no user'}
            </div>
            <div id="expenses" className="col-start-4 col-span-7 h-screen bg-red-100">
              
            </div>
        </div>
    );
  }