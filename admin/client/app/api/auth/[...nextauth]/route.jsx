import { createHmac } from "crypto";
import NextAuth from "next-auth";


const {
  NEXT_PUBLIC_NEXTAUTH_URL,
  NEXT_PUBLIC_COGNITO_REGION,
  NEXT_PUBLIC_COGNITO_DOMAIN,
  NEXT_PUBLIC_COGNITO_CLIENT_ID,
  NEXT_PUBLIC_COGNITO_USER_POOL_ID,
  NEXT_PUBLIC_COGNITO_CLIENT_SECRET,
} = process.env;

const hasher = createHmac(
  "sha256",
  process.env.NEXT_PUBLIC_COGNITO_CLIENT_SECRET
);

hasher.update(`${'uqrqk00um1kb0qs9j97nt2mmbuteh4fp5cqiv9b6ped8bbk1hcb'}${process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID}`);
const secretHash = hasher.digest("base64");
const providers = ["Facebook", "Google"];

function getProvider(provider) {
  return {
    id: `cognito_${provider.toLowerCase()}`,
    name: `Cognito${provider}`,
    type: "oauth",
    clientId: NEXT_PUBLIC_COGNITO_CLIENT_ID,
    scope: "openid email profile,public_profile", // OpenID Connect scopes
    clientSecret: NEXT_PUBLIC_COGNITO_CLIENT_SECRET,
    wellKnown: `https://cognito-idp.${NEXT_PUBLIC_COGNITO_REGION}.amazonaws.com/${NEXT_PUBLIC_COGNITO_USER_POOL_ID}/.well-known/openid-configuration`,
    authorization: {
      url: `${NEXT_PUBLIC_COGNITO_DOMAIN}/oauth2/authorize`,
      params: {
        response_type: "code",
        client_id: NEXT_PUBLIC_COGNITO_CLIENT_ID,
        identity_provider: provider,
        redirect_uri: `${NEXT_PUBLIC_NEXTAUTH_URL}/api/auth/callback/cognito_${provider.toLowerCase()}`,
      },
    },
    checks: "nonce",
    token: {
      url: `${NEXT_PUBLIC_COGNITO_DOMAIN}/oauth2/token`,
      params: {
        grant_type: "authorization_code",
        client_id: NEXT_PUBLIC_COGNITO_CLIENT_ID,
        client_secret: NEXT_PUBLIC_COGNITO_CLIENT_SECRET,
        redirect_uri: `${NEXT_PUBLIC_NEXTAUTH_URL}/api/auth/callback/cognito_${provider.toLowerCase()}`,
      },
    },
    userinfo: {
      url: `${NEXT_PUBLIC_COGNITO_DOMAIN}/oauth2/userInfo`,
    },
    profile: function (profile) {
      return {
        id: profile.sub,
        ...profile,
      };
    },
  };
}
const authOptions = {
  providers: [
    ...providers.map((provider) => getProvider(provider)),

  ],
  secret:secretHash,
  callbacks: {
    async signIn({ user, account, profile }) {
      return true;
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },

    async jwt({ token, account, profile, user }) {
      if (account) {
        return {
          ...token,
          accessToken: account.access_token,
          idToken: account.id_token,
          refreshToken: account.refresh_token,
          expiresAt: account.expires_at,
          tokenType: "Bearer",
        };
      }
      if (Date.now() < token.expiresAt) {
        return token;
      }
      try {
        const response = await fetch(`${NEXT_PUBLIC_COGNITO_DOMAIN}/oauth2/token`, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            client_id: NEXT_PUBLIC_COGNITO_CLIENT_ID,
            client_secret: NEXT_PUBLIC_COGNITO_CLIENT_SECRET,
            grant_type: "refresh_token",
            refresh_token: token.refreshToken,
          }),
          method: "POST",
        });

        const tokens = await response.json();

        if (!response.ok) throw tokens;

        return {
          ...token,
          accessToken: tokens.access_token,
          idToken: tokens.id_token,
          expiresAt: Date.now() + Number(tokens.expires_in) * 1000,
        };
      } catch (error) {
        console.error("Error refreshing access and id tokens: ", error);
        return { ...token, error: "RefreshTokensError" };
      }
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.idToken = token.idToken;
      session.error = token.error;
      return session;
    },
  },
  pages: {
    SignIn: "/auth/login/page.jsx",
    SignUp: "/auth/register/user/page.jsx",
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
