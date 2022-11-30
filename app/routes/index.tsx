import { Link } from "@remix-run/react";
import { useOptionalUser } from "~/utils";
import LogoutButton from "~/components/LogoutButton";

export default function Index() {
 const user = useOptionalUser();

  return (
    <>
      <nav className="flex items-center py-4">
        <div>
          <Link
            to="/category/javascript"
            className="text-xl text-blue-600 underline px-4"
          >
           Javascript
          </Link> 
        </div>

        <div className="flex">
          {user && (
            <LogoutButton />
            )
          }

          {!user && (<>
            <Link
              to="/login"
              className="flex items-center justify-center rounded-md bg-blue-500 px-2 py-2 font-medium text-white hover:bg-blue-600"
            >
              Iniciar sesión
            </Link>
            <Link
              to="/join"
              className="flex items-center justify-center rounded-md border border-transparent bg-white px-2 py-2 text-base font-medium text-blue-700 shadow-sm hover:bg-blue-50 sm:px-8"
            >
              Registrate
            </Link>
          </>)
          }
        </div>
      </nav>


      <main className="relative min-h-screen bg-white">

      </main>
    </>
  );
}
