import { Elysia, t } from "elysia";
import { setup } from "~libs/prisma";
import { isAuthenticated } from "~middlewares/auth";

export const orders = (app: Elysia) =>
  app
    .use(setup)
    .use(isAuthenticated)
    .group("/orders", (app) =>
      app
        .post(
          "/",
          async ({ body, db, set, user }) => {
            const { quantity, price, type } = body;

            await db.order.create({
              data: {
                userId: user.id,
                quantity,
                price,
                type,
              },
            });

            set.status = 201;
            return { message: "Registro criado com sucesso." };
          },
          {
            body: t.Object({
              quantity: t.Number(),
              price: t.Number(),
              type: t.String(),
            }),
          }
        )
        .post(
          "/swap",
          async ({ body, db, set, user }) => {
            const { balance } = body;

            await db.user.update({
              where: {
                id: user.id,
              },
              data: {
                balance: Number(user.balance) + balance,
              },
            });

            set.status = 201;
            return { message: "Registro criado com sucesso." };
          },
          {
            body: t.Object({
              balance: t.Number(),
            }),
          }
        )
        .get("/", async ({ db, user }) => {
          const ordersList = await db.order.findMany({
            where: {
              ...(user.role === "producer"
                ? {
                    OR: [
                      { type: "buy" },
                      {
                        type: "sell",
                        userId: user.id,
                      },
                    ],
                  }
                : {
                    OR: [
                      { type: "sell" },
                      {
                        type: "buy",
                        userId: user.id,
                      },
                    ],
                  }),
            },
            select: {
              price: true,
              quantity: true,
              type: true,
              user: {
                select: {
                  name: true,
                  email: true,
                },
              },
            },
          });
          return { ordersList };
        })
    );
