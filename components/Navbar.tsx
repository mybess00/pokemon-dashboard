'use client'
//components
import { Input } from "@/components/ui/input"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
//hooks
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
//utils
import { logout } from "@/utils/auth"
//icons
import { IoSearch } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";

export default function Navbar () {
    const [name, setName] = useState("")
    const router = useRouter()
    const goSearch = () => {
        if (name.length >= 2) {
            router.push(`/dashboard/search?name=${name}`)
            return
        }
        toast(
            "An error has occurred", {
                description: "Search name must be greater than 1 character",
                action: {
                  label: "Undo",
                  onClick: () => console.log("Undo"),
                },
            },
        )
    }
    const handleLogout = () => {
        logout()
        router.push("/auth")
    }
    return (
        <nav className="fixed top-0 left-0 w-full z-50 h-20 flex flex-row justify-between bg-white px-2 tablet:px-4 desktop:px-4">
            <div className="flex flex-row items-center w-full mr-8">
                <Input
                    className="mr-2"
                    onChange={(e) => {
                        setName(e.target.value)
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            goSearch()
                        }
                    }}
                    placeholder="Enter a pokemon name to search"

                />
                <IoSearch className="cursor-pointer" onClick={goSearch}/>
            </div>
            <div className="flex flex-row gap-2 items-center">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <CiLogout className="cursor-pointer text-2xl" onClick={handleLogout}/>
            </div>
        </nav>
    )
}