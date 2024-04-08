import { Elysia, t } from "elysia";
import { comparePassword, hashPassword } from "../../utils/bcrypt";
import { isAuthenticated } from "../../middlewares/auth";
import { setup } from "~libs/prisma";
import { getUserKeypair } from "~utils/keypair";

export const auth = (app: Elysia) =>
  app.use(setup).group("/auth", (app) =>
    app
      .post(
        "/signup",
        async ({ body, db, set }) => {
          const { email, name, password } = body;

          const emailExists = await db.user.findUnique({
            where: {
              email,
            },
            select: {
              id: true,
            },
          });

          if (emailExists) {
            set.status = 400;
            return {
              success: false,
              message: "Email address already in use.",
            };
          }

          const { hash, salt } = await hashPassword(password);

          let user = await db.user.create({
            data: {
              email,
              name,
              password,
              hash,
              salt,
              balance: 0,
            },
          });

          if (!user.walletAddress) {
            const keypair = getUserKeypair(user.indexKey);

            user = await db.user.update({
              where: { id: user.id },
              data: {
                walletAddress: keypair.publicKey.toString(),
              },
            });
          }

          set.status = 201;
          return { message: "Registro criado com sucesso." };
        },
        {
          body: t.Object({
            email: t.String(),
            name: t.String(),
            password: t.String(),
          }),
        }
      )
      .post(
        "/signin",
        async ({ body, set, jwt, db }) => {
          const { email, password } = body;
          // verify email/username
          const user = await db.user.findFirst({
            where: {
              email,
            },
            select: {
              id: true,
              hash: true,
              salt: true,
            },
          });

          if (!user) {
            set.status = 400;
            return {
              success: false,
              message: "Invalid credentials",
            };
          }

          const match = await comparePassword(password, user.salt, user.hash);
          if (!match) {
            set.status = 400;
            return {
              success: false,
              message: "Invalid credentials",
            };
          }

          const accessToken = await jwt.sign({
            userId: user.id,
          });

          return {
            success: true,
            message: "Account login successfully",
            jwt: accessToken,
          };
        },
        {
          body: t.Object({
            email: t.String(),
            password: t.String(),
          }),
        }
      )
      .use(isAuthenticated)
      // protected route
      .get("/me", ({ user }) => {
        return {
          success: true,
          message: "Fetch authenticated user details",
          data: {
            user,
          },
        };
      })
  );
