import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { cache } from "react";
import { SessionPayload } from "./types";
import { TOKEN_VALIDITY_PERIOD } from "@/lib/constants";
import { serverEnv } from "./env";
const secretKey = serverEnv.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

/**
 * Chiffre un payload de session en un JWT signé.
 *
 * @param payload - Les données de la session à chiffrer.
 * @returns Une promesse qui résout en un JWT signé (string).
 */
export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(payload.expiresAt || "7d")
    .sign(encodedKey);
}

/**
 * Déchiffre et vérifie un JWT de session.
 *
 * @param session - Le token de session JWT à vérifier.
 * @returns Le payload décodé si la vérification réussit, sinon undefined.
 */
export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch {
    console.log("Aucun session trouvé");
  }
}

/**
 * Crée une nouvelle session utilisateur et la stocke dans un cookie sécurisé.
 *
 * @param payload - Les données de la session à stocker.
 * @returns Un objet indiquant le succès de la création de la session.
 */
export async function createSession(payload: SessionPayload) {
  const expiresAt = new Date(Date.now() + TOKEN_VALIDITY_PERIOD);
  const session = await encrypt({
    ...payload,
    expiresAt,
  });
  const cookieStore = await cookies();

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
    // domain: process.env.NODE_ENV === "production" ? "titan.ai" : "localhost",
  });

  return {
    success: true,
    message: "Session créée !",
  };
}

/**
 * Met à jour la session utilisateur existante avec de nouvelles données et prolonge sa date d'expiration.
 *
 * @param newPayload - Les nouvelles données à fusionner dans la session existante.
 * @returns true si la session a été mise à jour avec succès, sinon null si la session n'existe pas ou n'est pas valide.
 */
export async function updateSession(newPayload: Partial<SessionPayload>) {
  // Récupérer la valeur du cookie de session
  const session = (await cookies()).get("session")?.value;
  // Déchiffrer le payload de la session
  const payload = (await decrypt(session)) as SessionPayload;

  // Si la session ou le payload n'existe pas, retourner null
  if (!session || !payload) {
    return null;
  }
  const payloadData = payload.data || {};
  const newPayloadData = newPayload.data || {};
  const data = { ...payloadData, ...newPayloadData };

  const expires = new Date(Date.now() + TOKEN_VALIDITY_PERIOD);

  const newSession = await encrypt({
    token: payload.token,
    data: { ...data },
    expiresAt: expires,
  });

  // Mettre à jour le cookie de session avec la nouvelle date d'expiration
  const cookieStore = await cookies();
  cookieStore.set("session", newSession, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: "lax",
    path: "/",
    // domain:
    //   process.env.NODE_ENV === "production" ? ".synkrone.space" : "localhost",
  });

  return true;
}

/**
 * Supprime la session utilisateur en supprimant le cookie correspondant.
 */
export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

/**
 * Vérifie la validité de la session courante.
 *
 * @returns Un objet d'authentification si la session est valide, sinon null.
 */
export const verifySession = cache(async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = (await decrypt(cookie)) as SessionPayload;

  if (!session?.token) {
    return null;
  }

  return {
    token: session.token,
    data: session.data,
  };
});
