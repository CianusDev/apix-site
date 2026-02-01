"use client";

import { useOptimistic, useState, useTransition } from "react";

type Message = {
  id: number;
  text: string;
  likes: number;
  liked: boolean;
};

// Simule un appel API avec un délai
async function likeMessageOnServer(messageId: number): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  // Simule parfois une erreur (10% de chance)
  if (Math.random() < 0.1) {
    throw new Error("Erreur serveur");
  }
  return true;
}

async function addMessageOnServer(text: string): Promise<Message> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    id: Date.now(),
    text,
    likes: 0,
    liked: false,
  };
}

export default function Page() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Bienvenue sur cette démo d'UI optimiste ! 🎉",
      likes: 5,
      liked: false,
    },
    {
      id: 2,
      text: "useOptimistic permet des interactions instantanées",
      likes: 12,
      liked: false,
    },
    {
      id: 3,
      text: "L'état se met à jour immédiatement, avant la réponse serveur",
      likes: 8,
      liked: true,
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  // État optimiste pour les messages
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (
      state: Message[],
      update: { type: "like" | "add"; payload: number | Message },
    ) => {
      if (update.type === "like") {
        const messageId = update.payload as number;
        return state.map((msg) =>
          msg.id === messageId
            ? {
                ...msg,
                likes: msg.liked ? msg.likes - 1 : msg.likes + 1,
                liked: !msg.liked,
              }
            : msg,
        );
      } else if (update.type === "add") {
        const newMsg = update.payload as Message;
        return [...state, { ...newMsg, sending: true }];
      }
      return state;
    },
  );

  const handleLike = (messageId: number) => {
    setError(null);

    startTransition(async () => {
      // Mise à jour optimiste immédiate
      addOptimisticMessage({ type: "like", payload: messageId });

      try {
        // Appel serveur simulé
        await likeMessageOnServer(messageId);

        // Si succès, on met à jour l'état réel
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === messageId
              ? {
                  ...msg,
                  likes: msg.liked ? msg.likes - 1 : msg.likes + 1,
                  liked: !msg.liked,
                }
              : msg,
          ),
        );
      } catch {
        // En cas d'erreur, l'état optimiste est automatiquement annulé
        // car on ne met pas à jour l'état réel
        setError(`Erreur lors du like du message #${messageId}. Réessayez.`);
      }
    });
  };

  const handleAddMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setError(null);
    const tempMessage: Message = {
      id: Date.now(),
      text: newMessage,
      likes: 0,
      liked: false,
    };

    setNewMessage("");

    startTransition(async () => {
      // Ajout optimiste
      addOptimisticMessage({ type: "add", payload: tempMessage });

      try {
        const savedMessage = await addMessageOnServer(newMessage);
        setMessages((prev) => [...prev, savedMessage]);
      } catch {
        setError("Erreur lors de l'envoi du message. Réessayez.");
      }
    });
  };

  return (
    <section className="w-full min-h-screen flex flex-col justify-center items-center p-8 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-lg w-full">
        <h1 className="text-3xl font-bold text-center mb-2">
          Optimistic UI avec useOptimistic
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
          Les likes s&apos;affichent instantanément, avant la confirmation
          serveur (1.5s de délai simulé)
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Formulaire d'ajout de message */}
        <form onSubmit={handleAddMessage} className="mb-6 flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Écrire un nouveau message..."
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={isPending || !newMessage.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Envoyer
          </button>
        </form>

        {/* Liste des messages */}
        <div className="space-y-4">
          {optimisticMessages.map((message) => (
            <div
              key={message.id}
              className={`p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-all ${
                isPending ? "opacity-80" : ""
              }`}
            >
              <p className="text-gray-800 dark:text-gray-200 mb-3">
                {message.text}
              </p>
              <div className="flex items-center justify-between">
                <button
                  onClick={() => handleLike(message.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all ${
                    message.liked
                      ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  <span className="text-lg">{message.liked ? "❤️" : "🤍"}</span>
                  <span className="font-medium">{message.likes}</span>
                </button>
                <span className="text-xs text-gray-400">#{message.id}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Indicateur de chargement */}
        {isPending && (
          <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Synchronisation avec le serveur...
          </div>
        )}

        {/* Info */}
        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm text-blue-800 dark:text-blue-300">
          <strong>💡 Comment ça marche :</strong>
          <ul className="mt-2 space-y-1 list-disc list-inside">
            <li>
              <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
                useOptimistic
              </code>{" "}
              affiche immédiatement le changement
            </li>
            <li>
              <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
                startTransition
              </code>{" "}
              gère l&apos;état de chargement
            </li>
            <li>
              En cas d&apos;erreur (10% de chance), l&apos;état revient
              automatiquement
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
