import { Elysia, t } from "elysia";
import { setup } from "~libs/prisma";
import { isAuthenticated } from "~middlewares/auth";

export const orderCheckouts = (app: Elysia) =>
  app
    .use(setup)
    .use(isAuthenticated)
    .group("/orderCheckouts", (app) =>
      app
        .post(
          "/",
          async ({ body, db, set, user }) => {
            const { orderId, buyerId, producerId } = body;

            await db.orderCheckout.create({
              data: {
                orderId,
                buyerId,
                producerId,
              },
            });

            const order = await db.order.findFirst({
              where: {
                id: orderId,
              },
            });

            if (!order) {
              set.status = 404;
              return {
                success: false,
                message: "Not found",
              };
            }

            await db.user.update({
              where: {
                id: buyerId,
              },
              data: {
                balance:
                  Number(user.balance) - order.quantity * Number(order.price),
              },
            });

            await db.user.update({
              where: {
                id: producerId,
              },
              data: {
                balance:
                  Number(user.balance) + order.quantity * Number(order.price),
              },
            });

            set.status = 201;
            return { message: "Registro criado com sucesso." };
          },
          {
            body: t.Object({
              orderId: t.String(),
              buyerId: t.String(),
              producerId: t.String(),
            }),
          }
        )
        .get("/", async ({ db, user }) => {
          const depositsList = await db.orderCheckout.findMany({
            where: {
              userId: user.id,
            },
          });
          return { depositsList };
        })
    );
