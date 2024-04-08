import { Elysia, t } from "elysia";
import { PrismaClient } from "@prisma/client";
import cors from "@elysiajs/cors";
import jwt from "@elysiajs/jwt";
import { auth } from "./modules/auth";
import { milkings } from "~modules/milking";
import { orders } from "~modules/order";

const app = new Elysia()
  .use(cors())
  .group("/api/v1", (app) =>
    app
      .use(
        jwt({
          secret: Bun.env.JWT_SECRET!,
        })
      )
      .use(auth)
      .use(milkings)
      .use(orders)
  )
  .listen(Bun.env.PORT);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
