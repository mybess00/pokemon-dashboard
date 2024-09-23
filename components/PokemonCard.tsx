'use client'
//components
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "./ui/skeleton"
import Image from "next/image"
import Link from "next/link"
//hooks
import { useFetch } from "@/hooks/useFetch"
import { toast } from "sonner"
//types
import type { PokemonApi } from "@/interfaces/PokemonApi"

interface Props {
    url: string
}

export default function PokemonCard (props : Props) {
    const { url } = props
    const { data, error, isLoading } = useFetch<PokemonApi>(url, { method: "GET" })
    if (isLoading) {
        return <Skeleton className="w-full h-64"/>
    }
    if (error  || !data) {
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
        return <Skeleton className="w-full h-64"/>
    }
    return (
        <Card className="w-full group hover:bg-slate-200 hover:border-cyan-500 cursor-pointer transition-all duration-200" key={data.id}>
            <Link href={`/dashboard/${data.id}`}>
            <CardHeader>
                <div className="flex flex-col space-y-1.5 relative aspect-square overflow-hidden">
                    <Image
                        src={data.sprites.front_default}
                        alt={data.name}
                        layout="fill"
                        className="group-hover:scale-125 transition-all duration-200"
                    />
                </div>
                <CardTitle>{data.name.toUpperCase()}</CardTitle>
                <CardDescription>
                    Type:
                    {data.types.map(el => el.type.name).join(", ")}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                        <p className="text-sm text-muted-foreground">
                            Height: 
                            {data.height}
                            <br/>
                            Weight: 
                            {data.weight}
                        </p>
                    </div>
                </div>
            </CardContent>
            </Link>
        </Card>
    )
}