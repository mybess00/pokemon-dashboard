'use client'
//components
import { Skeleton } from "@/components/ui/skeleton"
import PokemonCard from "@/components/PokemonCard"
//hooks
import { useSearchParams } from 'next/navigation'
import { useEffect } from "react"
import { useFetch } from "@/hooks/useFetch"
import { toast } from "sonner"
//types
import type { PokeApi } from "@/interfaces/PokeApi"

export default function Search () {
    const searchParams = useSearchParams()
    const name = searchParams.get('name');
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=200&offset=0'
    const { data, error, isLoading, update }  = useFetch<PokeApi>(url, { method: "GET" })
    useEffect(() => {
        update()
    }, [name])
    if (isLoading) {
        return (
            <div className="grid grid-cols-2 desktop:grid-cols-5 tablet:grid-cols-4 gap-3">
                <Skeleton className="w-full h-64"/>
                <Skeleton className="w-full h-64"/>
                <Skeleton className="w-full h-64"/>
                <Skeleton className="w-full h-64"/>
                <Skeleton className="w-full h-64"/>
            </div>
        )
    }
    if (error || !data || !name) {
        toast(
            "An error has occurred", {
                description: error,
                action: {
                  label: "Undo",
                  onClick: () => console.log("Undo"),
                },
            },
        )
        console.error(error)
        return (
            <div className="grid grid-cols-2 desktop:grid-cols-5 tablet:grid-cols-4 gap-3">
                <Skeleton className="w-full h-64"/>
                <Skeleton className="w-full h-64"/>
                <Skeleton className="w-full h-64"/>
                <Skeleton className="w-full h-64"/>
                <Skeleton className="w-full h-64"/>
            </div>
        )
    }
    return (
        <>
        <div className="grid grid-cols-2 desktop:grid-cols-5 tablet:grid-cols-4 gap-3">
            {
                data.results.filter(el => el.name.includes(name.toLowerCase())).map((el, index) => (
                    <PokemonCard url={el.url} key={index}/>
                ))
            }
        </div>
        </>
    )
}