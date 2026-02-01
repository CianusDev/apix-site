import { cache } from "react";
import type { ParamMap } from "@/routes";

type SearchParams = Record<string, string | string[] | undefined>;

type InferParams<Route> = Route extends keyof ParamMap
  ? ParamMap[Route]
  : never;

/**
 * Crée un loader de données typé automatiquement selon la route
 *
 * @example
 * ```ts
 * const loadUser = createLoader("/users/[id]", async ({ params, searchParams }) => {
 *   // params.id est typé automatiquement !
 *   const user = await db.user.findUnique({ where: { id: params.id } });
 *   if (!user) notFound();
 *   return user;
 * });
 *
 * // Dans une page - utiliser loadUser.Props pour typer
 * export default async function Page(props: typeof loadUser.Props) {
 *   const data = await loadUser(props);
 *   return <UserProfile user={data} />;
 * }
 * ```
 */
export function createLoader<Route extends keyof ParamMap, TData>(
  _route: Route,
  fn: (ctx: {
    params: InferParams<Route>;
    searchParams: SearchParams;
  }) => Promise<TData>,
) {
  type Props = {
    params: Promise<InferParams<Route>>;
    searchParams: Promise<SearchParams>;
  };

  const cachedFn = cache(fn);

  const loader = async (props: Props): Promise<TData> => {
    const [params, searchParams] = await Promise.all([
      props.params,
      props.searchParams,
    ]);
    return cachedFn({ params, searchParams });
  };

  loader.Props = {} as Props;

  return loader;
}
