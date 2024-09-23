import { Toaster } from "@/components/ui/sonner"

export default function LayoutPokemon ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <section>
            {children}
            <Toaster/>
        </section>
    )
}