"use client";

import { ChangeEvent, FormEvent, use, useEffect, useState } from "react";
import { auth } from "src/lib/firebase";
import { User } from "firebase/auth";
import BarChart from "@components/BarChart"

interface Expense {
  who: string;
  amount: number;
}

const Expense = ({ email, amount }: {email:string, amount:number}) => {
  return (
    <li className="rounded-lg bg-blue-100 w-full p-2 mb-2">
      {email}: {amount}$
    </li>
  )
}

export default function Page({ params }: { params: Promise<{ partner: string }>}) {
  const {partner} = use(params);
    const [user, setUser] = useState<User | null>(null)
    const [transaction, setTransaction] = useState({
      email: '',
      amount: 0,
  })

  const [expenses, setExpenses] = useState([{
    who: "julia@julia.com",
    amount: 22.20
  },
  {
    who: "josh@josh.com",
    amount: 30.20
  },
  {
    who: "julia@julia.com",
    amount: 12.20
  }])

    const [owe, setOwe] = useState(0);
    // Listen for authentication state changes
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(setUser);
      return () => unsubscribe() // Cleanup on component unmount
    }, [])
    useEffect(() => {
      let amount:number = 0;
      expenses.filter((e) => {return e.who == user?.email}).forEach((e) => {amount += e.amount});
      expenses.filter((e) => {return e.who != user?.email}).forEach((e) => {amount -= e.amount});
      setOwe(amount);
    }, [expenses, user])


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setTransaction((prev) => ({
                ...prev, [name]: name === "amount" ? Number(value) || 0 : value,
            }));
        }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setExpenses([...expenses, {who:transaction.email, amount:transaction.amount}])
        }
  
    return (
      <div className="grid grid-cols-10">
            <div id="user" className="col-span-3 h-screen bg-blue-100 p-2">
              <h2 className="text-xl">{user != null ? `signed in as ${user?.email}` : 'not signed in'} </h2>
              <h2>viewing history with {partner}@{partner}.com</h2>
              {/* { ?? 'no user'} */}
              <p className="text-xl text-center mt-4">{owe.toFixed(2)}$</p>
              <p className="block text-center">{owe < 0 ? 'Your turn!' : "Their treat!"}</p>
              <BarChart balance={owe} />
            </div>
            <div id="expenses" className="col-start-4 col-span-7 h-screen bg-[#a2ccec]">
              <form onSubmit={handleSubmit} className="m-4 space-y-2">
                    <label className="block">
                        who?:
                        <input
                            type="email"
                            name="email"
                            value={transaction.email}
                            onChange={handleChange}
                            className="rounded-lg ml-2 p-1"
                        />
                    </label>
                    <label className="block">
                        amount:
                        <input
                            // type="amount"
                            name="amount"
                            value={transaction.amount}
                            onChange={handleChange}
                            className="rounded-lg ml-2 p-1"
                        />
                    </label>
                    <button type="submit">add</button>
                </form>
              <ul className="list-none m-2">
                {expenses.map((e, i) => {return <Expense email={e.who} amount={e.amount} key={i} />})}
              </ul>
            </div>
        </div>
    );
  }