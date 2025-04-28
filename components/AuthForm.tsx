"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"

import {Button} from "@/components/ui/button"
import {Form,} from "@/components/ui/form"
import Image from "next/image";
import Link from "next/link";
import {toast} from "sonner";
import FormField from "@/components/FormField";
import {useRouter} from "next/navigation";

const authFormSchema = (type: FormType) => {
    return z.object({
        name: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
        email: z.string().email(),
        password: z.string().min(8),
    })
}

const AuthForm = ({type}: { type: FormType }) => {
    const formSchema = authFormSchema(type)
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if(type === "sign-up") {
                toast.success("Account created successfully, please sign in");
                router.push("/sign-in")
            } else {
                toast.success("Successfully signed in");
                router.push("/")            }

        } catch (e) {
            console.log(e);
            toast.error(`There was an error: ${e}`);
        }
    }

    const isSignIn = type === "sign-in";

    return (
        <div className={"card-border lg:min-w-[566px]"}>
            <div className={"flex flex-col gap-6 card py-14 px-10"}>
                <div className={"flex flex-row gap-2 justify-center"}>
                    <Image src={'/logo.svg'} alt={"logo"} height={32} width={38}/>
                    <h2 className={"text-primary-100"}>PrepWise</h2>
                </div>
                <h3>Practise Job Interviews with AI</h3>
                <Form {...form}>
                    <form className={"w-full space-y-6 mt-4 form"} onSubmit={form.handleSubmit(onSubmit)}>
                        {
                            !isSignIn && <FormField name={"name"} label={"Name"} control={form.control} type={"text"} placeholder={"Enter your name"}/>
                        }
                        <FormField name={"email"} control={form.control} label={"Email Address"} type={"email"} placeholder={"Enter your email"} />
                        <FormField name={"password"} control={form.control} label={"Password"} type={"password"} placeholder={"Enter your password"} />
                        <Button className={"btn"}>
                            {isSignIn ? "Sign In" : "Create an Account"}
                        </Button>
                    </form>
                    <p className={"text-center"}>
                        {isSignIn ? "Don't have an account?" : "Already have an account?"}
                        <Link href={!isSignIn ? "/sign-in" : "/sign-up"} className={"font-bold text-user-primary ml-1"}>
                            {!isSignIn ? "Sign In" : "Create an Account"}
                        </Link>
                    </p>
                </Form>
            </div>
        </div>
    );
};

export default AuthForm;