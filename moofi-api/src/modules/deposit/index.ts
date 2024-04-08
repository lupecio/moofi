import { Elysia, t } from "elysia";
import { setup } from "~libs/prisma";
import { isAuthenticated } from "~middlewares/auth";

export const deposits = (app: Elysia) =>
  app
    .use(setup)
    .use(isAuthenticated)
    .group("/deposits", (app) =>
      app
        .post(
          "/",
          async ({ body, db, set, user }) => {
            const { amount } = body;

            await db.deposit.create({
              data: {
                userId: user.id,
                amount,
              },
            });

            await db.user.update({
              where: {
                id: user.id,
              },
              data: {
                balance: Number(user.balance) + amount,
              },
            });

            set.status = 201;
            return { message: "Registro criado com sucesso." };
          },
          {
            body: t.Object({
              amount: t.Number(),
            }),
          }
        )
        .get("/", async ({ db, user }) => {
          const depositsList = await db.deposit.findMany({
            where: {
              userId: user.id,
            },
          });
          return { depositsList };
        })
    );
