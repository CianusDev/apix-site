"use client";
import { User } from "@/models/user.model";
import { useEffect, useState } from "react";
import { getUsers } from "./users.service";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchUsers() {
    setIsLoading(true);
    setError(null);
    try {
      const { success, data, message } = await getUsers();
      if (success && data) {
        setUsers(data as User[]);
      } else {
        setError(message || "Une erreur s'est produite");
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, isLoading, error, refetch: fetchUsers };
}
