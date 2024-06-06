import { FreshContext, Handlers, RouteConfig } from "$fresh/server.ts";
import jwt from "npm:jsonwebtoken@^9.0.2"
import { User } from "../types.ts";
import { setCookie } from "$std/http/cookie.ts";
import Register from "../components/Register.tsx";

export const config: RouteConfig = {
    skipInheritedLayouts: true
}

export const handler: Handlers = {
    POST: async(req:Request, ctx: FreshContext) => {
        const url = new URL(req.url)
        const form = await req.formData();
        const email = form.get("email")?.toString() || "";
        const password = form.get("password")?.toString() || "";
        const name = form.get("name")?.toString() || "";
        const URL_LOGIN = Deno.env.get("URL_LOGIN")
        if (!URL_LOGIN) {
            throw new Error("API no esta en el entorno")
        }
        const response = await fetch(`${URL_LOGIN}/register`, {
            method: "POST",
            headers: { "Content-Type" : "application/json"},
            body: JSON.stringify({name, email, password})
        })
        if (response.status == 400) {
            return ctx.render({
                message: "User already exists or invalid data provided",
            });
        }
        const JWT_SECRET = Deno.env.get("JWT_SECRET");
        if (!JWT_SECRET){ throw new Error("Credenciales incorrectas") }        
        if(response.status == 200){
            const Data: Omit<User, "password" | "favs"> = await response.json();
            const token = jwt.sign({
                email,
                id: Data.id,
                name: Data.name
            },
            Deno.env.get("JWT_SECRET"),
            {
                expiresIn: "24h",
            },)
            const headers = new Headers()
            setCookie(headers, {
                name: "auth",
                value: token,
                sameSite: "Lax",
                domain: url.hostname,
                path: "/",
                secure: true }
            );            
            headers.set("location", "/videos");
            return new Response(null,{
                status: 303, //see others
                headers
            });
        }   
        else {
            return ctx.render()
        }

    }
}

const Page = () => {
    return( <Register /> )
}
export default Page