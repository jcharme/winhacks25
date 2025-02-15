import { Main } from "next/document";
import React from "react";

export default function Layout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="grid grid-cols-10">
            <div className="col-span-7 h-screen bg-red-100">
                <nav className="w-full h-16 bg-blue-300">

                </nav>
                <main className="w-full">
                    {children}
                </main>
                
            </div>
            
            <div id="sidebar" className="col-span-3 col-start-8 h-screen bg-green-800">
a
            </div>
        </div>
    )
}