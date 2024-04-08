import { Elysia } from "elysia";

export const isAuthenticated = (app: Elysia) =>
  app
    .onBeforeHandle(async ({ jwt, set, db, headers }) => {
      const token = headers.authorization?.split(" ")[1];

      if (!token) {
        set.status = 401;
        return {
          success: false,
          message: "Unauthorized",
        };
      }

      const { userId } = await jwt.verify(token);
      if (!userId) {
        set.status = 401;
        return {
          success: false,
          message: "Unauthorized",
        };
      }
    })
    .derive(async ({ jwt, set, db, headers }) => {
      const token = headers.authorization?.split(" ")[1];

      if (!token) {
        set.status = 401;
        return {
          success: false,
          message: "Unauthorized",
        };
      }

      const { userId } = await jwt.verify(token);

      const user = await db.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        set.status = 401;
        return {
          success: false,
          message: "Unauthorized",
        };
      }
      return { user };
    });
