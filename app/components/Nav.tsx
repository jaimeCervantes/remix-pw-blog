import { Link, useMatches } from "@remix-run/react";
import { useOptionalUser } from "~/utils";
import LogoutButton from "~/components/LogoutButton";
import Logo from "./Logo";

const menuItemClasses = `px-4 py-2 sm:ml-2 block hover:gradient-border-primary hover:gradient-border-primary-b`;

const currentClasses = `dark:text-white gradient-border-primary gradient-border-primary-b gradient-border-primary-b:activated`;

export default function Nav() {
  const user = useOptionalUser();
  const matches = useMatches();
  const last = matches[matches.length - 1];
  const current = last.pathname;

  return (
    <nav className="flex flex-wrap items-center justify-between gap-y-2 px-3 py-4">
      <ul className="flex flex-wrap items-center">
        <li key="home_0">
          <Link
            className="mr-4 flex transition-transform hover:scale-110 active:rotate-[360deg]"
            to="/"
          >
            <Logo />
          </Link>
        </li>
        {[
          { to: "/javascript", content: "Javascript" },
          { to: "/agilidad", content: "Agilidad" },
          { to: "/componentes-web", content: "Componentes web" },
          { to: "/contacto", content: "Contacto" },
        ].map(({ to, content }, index) => {
          return (
            <li key={`${to}_${index}`}>
              <Link
                className={`${menuItemClasses} ${
                  current === to ? currentClasses : ""
                }`}
                to={to}
              >
                {content}
              </Link>
            </li>
          );
        })}
      </ul>

      <ul className="flex">
        {user && <LogoutButton />}

        {!user && (
          <>
            <li>
              <Link
                to="/join"
                className="mr-4 block rounded-md border bg-white px-4 py-2 text-base font-medium text-blue-700 shadow-sm hover:bg-blue-50"
              >
                Registrate
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="block rounded-md bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600"
              >
                Iniciar sesión
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
