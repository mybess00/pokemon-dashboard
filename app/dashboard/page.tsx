'use client'
//components
import { Skeleton } from "@/components/ui/skeleton"
import Pagination from "@/components/Pagination"
import PokemonCard from "@/components/PokemonCard"
//hooks
import { useFetch } from "@/hooks/useFetch"
import { useEffect, useState } from "react"
import { toast } from "sonner"
//types
import type { PokeApi } from "@/interfaces/PokeApi"

export default function Dashboard () {
    const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0')
    const { data, error, isLoading, update }  = useFetch<PokeApi>(url, { method: "GET" })
    useEffect(() => {
        update()
    }, [url])
    const handleNewUrl = (newUrl: string) => {
        setUrl(newUrl)
    }
    const nextPage = () => {
        if (!data?.next) {
            return null
        }
        setUrl(data.next)
    }
    const prevPage = () => {
        if (!data?.previous) {
            return null
        }
        setUrl(data.previous)
    }
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
        return (
            <div className="grid grid-cols-2 desktop:grid-cols-5 tablet:grid-cols-4 gap-3">
                <Skeleton className="w-full h-11"/>
                <Skeleton className="w-full h-11"/>
                <Skeleton className="w-full h-11"/>
                <Skeleton className="w-full h-11"/>
                <Skeleton className="w-full h-11"/>
            </div>
        )
    }
    const pagination = {
        count: data.count,
        next: data.next,
        prev: data.previous,
        url: url
    }
    return (
        <>
        <div className="grid grid-cols-2 desktop:grid-cols-5 tablet:grid-cols-4 gap-3">
            {
                data.results.map((el, index) => (
                    <PokemonCard url={el.url} key={index}/>
                ))
            }
        </div>
        <Pagination
            pagination={pagination}
            next={nextPage}
            prev={prevPage}
            change={handleNewUrl}
        />
        </>
    )
}