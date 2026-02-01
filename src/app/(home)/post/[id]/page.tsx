import { createLoader } from "@/lib/loader";

const loadPostData = createLoader("/post/[id]", async ({ params }) => {
  return {
    paramId: params.id,
  };
});

export default async function Page(props: typeof loadPostData.Props) {
  const data = await loadPostData(props);
  return (
    <div>
      <h1>Post ID: {data.paramId}</h1>
    </div>
  );
}
