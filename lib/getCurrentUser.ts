import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/options";

export default async function getCurrentUser() {
  const session = await getServerSession(authOptions);

  return {
    email: session?.user?.email,
    name: session?.user?.name,
    userId: session?.user?.id,
  };
}
