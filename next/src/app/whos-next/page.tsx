"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { auth, db } from "@lib/firebase";
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
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setGroups(data);
    }

    fetchGroups();
  }, [user]);

  const [groupName, setGroupName] = useState("");
  async function createGroup(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!user?.uid) {
      console.error("User must be logged in.");
      return;
    }

    const groupData: Omit<Group, "id"> = {
      name: groupName,
      users: [user.uid],
    };

    const groupsRef = collection(db, "whos-next");
    await addDoc(groupsRef, groupData).then((doc) => {
      setGroups((prev) =>
        prev
          ? [...prev, { id: doc.id, ...groupData }]
          : [{ id: doc.id, ...groupData }],
      );
    }); // add new group to our list
  }

  return (
    <>
      {user === null ? (
        <Link href="/login">Please login here.</Link>
      ) : (
        <div>
          <form onSubmit={createGroup}>
            <button type="submit">Create group</button>
            <input
              type="text"
              placeholder="Group name..."
              onChange={(e) => {
                setGroupName(e.target.value);
              }}
            />
          </form>
          <div>
            {groups?.length !== 0 ? (
              <ul>
                {groups?.map((group) => <li key={group.id}>{group.name}</li>)}
              </ul>
            ) : (
              <p>No groups loaded.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
