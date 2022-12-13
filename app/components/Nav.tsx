import { Link, useMatches } from "@remix-run/react";
import { useOptionalUser } from "~/utils";
import LogoutButton from "~/components/LogoutButton";
import Logo from "./Logo";

const menuItemClasses = `px-4 py-2 sm:ml-2 flex rounded hover:text-white
  transition-colors duration-500 hover:bg-primary
`;

const currentClasses = `text-white bg-secondary dark:bg-transparent
  bg-gradient-to-bl from-secondary to-primary dark:to-transparent
`;

export default function Nav() {
  const user = useOptionalUser();
  const matches = useMatches();
  const last = matches[matches.length - 1];
  const current = last.pathname;
  
  return (
    <nav className="px-3 py-4 flex items-center justify-between flex-wrap gap-y-2">
      <ul className="flex items-center flex-wrap">
        <li key="home_0">
          <Link className="flex mr-4 transition-transform hover:scale-110 active:rotate-[360deg]"
            to="/"
          >
            <Logo />
          </Link>
        </li>
        {
          [
            { to: '/javascript', content: 'Javascript' },
            { to: '/agilidad', content: 'Agilidad' },
            { to: '/componentes-web', content: 'Componentes web' },
            { to: '/contacto', content: 'Contacto' },
          ].map(({ to, content }, index) => {
            return (
              <li key={`${to}_${index}`}>
                <Link className={`${menuItemClasses} ${current === to ? currentClasses : ''}`}
                  to={to}
                >
                  {content}
                </Link>
              </li>
            );
          })
        }
      </ul>

      <ul className="flex">
        {user && <LogoutButton />}

        {!user && (
          <>
            <li>
              <Link
                to="/join"
                className="block mr-4 rounded-md border bg-white px-4 py-2 text-base font-medium text-blue-700 shadow-sm hover:bg-blue-50"
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
