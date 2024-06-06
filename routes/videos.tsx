import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import VideoList from "../components/VideoList.tsx";
import { Video } from "../types.ts";

type State = {
    id: string,
    email: string,
    name: string
}

type Data = {
    videos: Video[]
    userid: string
}

export const handler: Handlers<Data,State> = {
    GET: async (_req: Request, ctx: FreshContext<State, Data>) => {
        const userid = ctx.state.id;
        const API_URL = Deno.env.get("API_URL");
        if (!API_URL) { throw new Error("No se ha encontrado api en el entorno")}
        const response = await fetch(`${API_URL}/videos/${userid}`)

        if (response.status !== 200) {
            return ctx.render({videos: [], userid: ""})
        }
        const videos: Video[] = await response.json()
        return ctx.render ({videos: videos, userid: userid})
    }
}

const Page = (props: PageProps<Data>) =>{
    return(<VideoList videos={props.data?.videos} userid={props.data?.userid}/>)
}
export default Page
