import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Vide from "../../components/Vide.tsx";
import { Video } from "../../types.ts";


type State = {
    id: string,
    email: string,
    name: string
}

type Data = {
    videos: Video
    userid: string
}

export const handler: Handlers<Data,State> = {
    GET: async(_req:Request, ctx: FreshContext<State,Data>) => {
        const idvideo = ctx.params.id
        const userid = ctx.state.id


        const API_URL = Deno.env.get("API_URL")
        if (!API_URL) {
            throw new Error("No se ha encontrado la api")
        }

        const response = await fetch (`${API_URL}/video/${userid}/${idvideo}`)

        if (response.status !== 200) {
            return new Response("No se ha encontrado el video",{
                status: 303,
                headers: {location: "/videos"}
            })
        }

        const video:Video = await response.json()

        return ctx.render({userid: userid, videos: video})
    }
}


const Page = (props: PageProps<Data>) => {

    return (<Vide userid={props.data?.userid} video={props.data?.videos}/>);
}

export default Page