import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner"
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
    title: "Pokemon Database",
    description: "Explore and manage your Pokémon collection. View Pokémon details and navigate through the list using pagination.",
    keywords: "pokemon, pokeapi",
};

export default function LayoutDashboard ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <main className="px-4 tablet:px-10 desktop:px-20 py-24 bg-gradient-to-tr from-slate-100 to-indigo-50">
            <Navbar/>
            {children}
            <Toaster/>
        </main>
    )
}