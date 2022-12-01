import { Link } from "@remix-run/react";
import { useOptionalUser } from "~/utils";
import LogoutButton from "~/components/LogoutButton";

export default function Nav() {
  const user = useOptionalUser();

  return (
    <nav className="flex items-center justify-between border-b border-b-slate-300 px-3 py-4">
      <div>
        <Link
          to="/javascript"
          className="pl-0 pr-4 text-xl text-blue-600 underline"
        >
          Javascript
        </Link>
      </div>

      <div className="flex">
        {user && <LogoutButton />}

        {!user && (
          <>
            <Link
              to="/join"
              className="mr-4 rounded-md border bg-white px-4 py-2 text-base font-medium text-blue-700 shadow-sm hover:bg-blue-50"
            >
              Registrate
            </Link>
            <Link
              to="/login"
              className="rounded-md bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600"
            >
              Iniciar sesión
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
