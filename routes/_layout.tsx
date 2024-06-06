import { FreshContext } from "$fresh/server.ts";
import Header from "../components/Header.tsx";

export default async function Layout (_req: Request, ctx: FreshContext) {
    return(
        <div className="page-container">
            <Header username={`${ctx.state.name || "unknown"}`} />
        <ctx.Component />
    </div>
    )
}

