import { PrismaClient } from "@prisma/client";
import { Elysia } from "elysia";

export const setup = (app: Elysia) =>
  app.decorate(
    "db",
    new PrismaClient({
      log: ["query"],
    })
  );
