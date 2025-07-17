import { httpRouter } from "convex/server";
import { internal } from "./_generated/api";
import { GenericActionCtx } from "convex/server";
import { DataModel } from "./_generated/dataModel";
import { PublicHttpAction } from "convex/server";

const http = httpRouter();

const stripeHandler: PublicHttpAction = Object.assign(
    async (ctx: GenericActionCtx<DataModel>, request: Request) => {
        const signature = request.headers.get("stripe-signature") as string;
        
        // Currently inactive
        return new Response("Stripe handling is disabled.", { status: 200 });
    },
    { isHttp: true as const }
);

http.route({
    path: "/stripe",
    method: "POST",
    handler: stripeHandler
});

export default http;
