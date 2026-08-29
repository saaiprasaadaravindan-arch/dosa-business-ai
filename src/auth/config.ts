import type { NextAuthConfig } from "next-auth";

/**
 * Provider-free authentication foundation. Add an OAuth or credentials provider
 * here after identity requirements are finalized; roles are persisted in Prisma.
 */
export const authConfig = {
  pages: { signIn: "/sign-in" },
  callbacks: {
    authorized: ({ auth, request: { nextUrl } }) => {
      const isAppRoute = nextUrl.pathname.startsWith("/dashboard");
      return isAppRoute ? Boolean(auth) : true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
