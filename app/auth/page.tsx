'use client'
import { Button } from "@/components/ui/button"
//components
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
//hooks
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
//utils
import { mockAuthenticate } from "@/utils/auth"
//types
import type { AuthForm } from "../../interfaces/Auth"

export default function Auth () {
    const [progress, setProgress] = useState(0)
    const [loading, setLoading] = useState(false)
    const { control, handleSubmit } = useForm<AuthForm>()
    const router = useRouter()

    const login: SubmitHandler<AuthForm> = async (data) => {
        setLoading(true)
        try {
            const response = await mockAuthenticate({...data})
            if (!response) {
                toast(
                    "An error has occurred", {
                        description: "Username and password are invalid",
                        action: {
                          label: "Undo",
                          onClick: () => console.log("Undo"),
                        },
                    },
                )
                return 
            }
            router.push('/dashboard')
        } catch (err) {
            toast(
                "An error has occurred", {
                  description: "Fatal error. Notify administration",
                  action: {
                    label: "Undo",
                    onClick: () => console.log("Undo"),
                  },
                },
            )              
            console.error(err)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        if (loading) {
            if (progress >= 100) {
                setTimeout(() => setProgress(10), 400)
                return
            }
            setTimeout(() => setProgress(progress+30), 200)
            return
        }
        setProgress(0)
    }, [loading, progress])
    return (
        <form onSubmit={handleSubmit(login)} className="min-w-full relative tablet:min-w-[500px] desktop:min-w-[500px]">
            <Card className="w-full transition-all duration-200">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>
                        
                    </CardDescription>
                </CardHeader>
                <CardContent>
                <p className="mt-4 ml-3 text-sm">Username</p>
                <Controller
                        control={control}
                        name="username"
                        rules={{
                            required: {
                                value: true,
                                message: "The username is mandatory"
                            }
                        }}
                        render={({ field, fieldState: { error } }) => (
                            <>
                            <Input
                                placeholder="Enter your user name"
                                {...field}
                            />
                            <p className="mt-1 ml-4 text-xs text-red-600">{error?.message}</p>
                            </>
                        )}
                />
                <p className="mt-4 ml-3 text-sm">Password</p>
                <Controller
                        control={control}
                        name="password"
                        rules={{
                            required: {
                                value: true,
                                message: "The password is mandatory"
                            }
                        }}
                        render={({ field, fieldState: { error } }) => (
                            <>
                            <Input
                                placeholder="Enter your password"
                                type="password"
                                {...field}
                            />
                            <p className="mt-1 ml-4 text-xs text-red-600">{error?.message}</p>
                            </>
                        )}
                />
                </CardContent>
                <CardFooter className="px-10">
                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                </CardFooter>
                <Progress value={progress} className="w-full absolute bottom-0 left-0"/>
            </Card>
        </form>
    )
}