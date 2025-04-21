import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession();

  return (<>
    <h1>HP Companion</h1>
    {session?.user?.name ? (
      <h3>Weclome {session?.user?.name}!</h3>
    ) : <h3>Please Sign In</h3>}
  </>)
}
