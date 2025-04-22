import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession();

  return (<>
    <h1 className="text-3xl font-semibold text-center">HP Companion</h1>
    {session?.user?.name ? (
      <h1 className="text-xl font-semibold text-center">Welcome, {session?.user?.name}!</h1>
    ) : <h3>Please Sign In</h3>}
  </>)
}
