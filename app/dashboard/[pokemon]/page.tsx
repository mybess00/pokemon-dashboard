'use client'
//components
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"
//hooks
import { useFetch } from "@/hooks/useFetch"
import { useEffect } from "react"
import { toast } from "sonner"
//types 
import type { PokemonApi } from "@/interfaces/PokemonApi"

export default function Pokemon ({ params }:  { params: { pokemon: string } }) {
    const url= `https://pokeapi.co/api/v2/pokemon/${params.pokemon}`
    const { data, error, isLoading, update }  = useFetch<PokemonApi>(url, { method: "GET" })
    useEffect(() => {
        update()
    }, [params.pokemon])
    if (isLoading) {
        return <Skeleton className="w-full h-[400px]:"/>
    }
    if (error || !data) {
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
        return <Skeleton className="w-full h-[400px]:"/>
    }
    return (
        <div className="flex flex-col tablet:grid desktop:grid grid-cols-[40%_1fr] gap-5 border-2 rounded-lg p-4">
            <div className="flex flex-col space-y-1.5 relative aspect-square overflow-hidden w-full">
                <Image
                    src={data.sprites.front_default}
                    alt={data.name}
                    layout="fill"
                />
            </div>
            <div>
                <h1 className="text-4xl font-bold my-4">
                    {(data.name).toUpperCase()}
                </h1>
                <p>
                    <strong>Type: </strong>
                    {data.types.map(el => el.type.name).join(", ")}
                    <br/>
                    <strong>Height: </strong>
                    {data.height}
                    <br/>
                    <strong>Weight: </strong>
                    {data.weight}
                    <br/>
                    <strong>Abilities: </strong>
                    {   
                        data?.abilities.map((ability, index) => (
                            <li className="ml-4" key={index}>{ability.ability.name}</li>
                        ))
                    }
                </p>
                <p>
                    <strong>Moves: </strong>
                    {data.moves.map((move) => move.move.name).join(", ")}
                </p>
            </div>
        </div>
    )
}