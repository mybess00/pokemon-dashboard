import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
    title: "Login | Pokemon Database",
    description: "Explore and manage your Pokémon collection. View Pokémon details and navigate through the list using pagination.",
    generator: "pokemon, pokeapi"
};

export default function LayoutAuth ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-row justify-center items-center w-full h-screen bg-gradient-to-tr from-indigo-900 to-stone-900 px-4">
            {children}
            <Toaster/>
        </div>
    )
}