import { PublicKey } from "@solana/web3.js";
import { Elysia, t } from "elysia";
import { setup } from "~libs/prisma";
import { isAuthenticated } from "~middlewares/auth";
import { mintToken } from "~utils/solana";
import { startOfDay } from "date-fns";

export const milkings = (app: Elysia) =>
  app
    .use(setup)
    .use(isAuthenticated)
    .group("/milkings", (app) =>
      app
        .post(
          "/",
          async ({ body, db, set, user }) => {
            const { liters, milkMachineUid } = body;

            const milkMachine = await db.milkMachine.findFirstOrThrow({
              where: {
                uuid: milkMachineUid,
              },
            });

            const order = await db.milking.count({
              where: {
                userId: user.id,
                createdAt: {
                  gte: new Date(new Date().toISOString().split("T")[0]),
                },
              },
            });

            const milking = await db.milking.create({
              data: {
                userId: user.id,
                liters,
                status: "completed",
                order: order + 1,
                milkMachineId: milkMachine.id,
              },
            });
            const txId = await mintToken(
              liters,
              user.indexKey,
              new PublicKey(process.env.MILK_PUBLIC_KEY)
            );

            await db.milking.update({
              data: { txId },
              where: {
                id: milking.id,
              },
            });

            set.status = 201;
            return { message: "Registro criado com sucesso." };
          },
          {
            body: t.Object({
              liters: t.Number(),
              milkMachineUid: t.String(),
            }),
          }
        )
        .get("/list", async ({ db, user }) => {
          const milkingList = await db.user.findMany({
            where: {
              milking: {
                every: {
                  createdAt: {
                    gte: startOfDay(new Date()),
                  },
                },
              },
            },
            select: {
              name: true,
              milking: true,
            },
          });
          return { milkingList };
        })
        .get("/reports/resume", async ({ db, user }) => {
          const cowsCount = await db.user.count();

          const productionTotal = await db.milking.aggregate({
            _sum: {
              liters: true,
            },
            where: {
              milkMachine: {
                user: {
                  id: user.id,
                },
              },
            },
          });

          const todayProductionTotal = await db.milking.aggregate({
            _sum: {
              liters: true,
            },
            where: {
              createdAt: {
                gte: startOfDay(new Date()),
              },
              milkMachine: {
                user: {
                  id: user.id,
                },
              },
            },
          });

          const avgPerAnimal =
            todayProductionTotal._sum.liters !== null
              ? todayProductionTotal._sum.liters / cowsCount
              : 0;

          return {
            cowsCount,
            productionTotal,
            todayProductionTotal,
            avgPerAnimal: avgPerAnimal.toFixed(2),
          };
        })
    );
