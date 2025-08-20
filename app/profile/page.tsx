import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Logout from "../logout";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Props {}

const Profile: React.FC<Props> = async () => {
  const session = await getServerSession(authOptions);

  return (
    <>
      <div className="mx-auto">
        <div className="mb-6">
          {session?.user?.name ? (
            <h1 className="text-2xl font-semibold">
              Добро пожаловать, {session.user.name}!
            </h1>
          ) : (
            <h1 className="text-2xl font-semibold">Войдите в аккаунт</h1>
          )}
        </div>

        <div className="flex gap-5">
          {!!session && <Logout />}
          {!session && (
            <Link href="/login">
              <Button className="hover:cursor-pointer">Login</Button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
