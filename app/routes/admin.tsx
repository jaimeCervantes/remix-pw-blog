import { Link, Outlet } from "@remix-run/react";
import { redirect, json } from '@remix-run/node';
import type { LoaderArgs } from "@remix-run/server-runtime";
import { requireUserId } from "~/session.server";
import LogoutButton from "~/components/LogoutButton";

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);

  if(!userId) {
    return redirect('/login');
  }

  return json({});
}

export default function PostAdmin() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="grid grid-cols-4 gap-6">
        <nav className="col-span-4 md:col-span-1">
        <Link
            to={`/admin/posts/new`}
            className="text-blue-600 underline"
          >
            Crear nueva publicación
          </Link>
          <LogoutButton />
        </nav>
        <main className="col-span-4 md:col-span-3">
          <h1>Admin panel</h1>
          <Outlet></Outlet>
        </main>
      </div>
    </div>
  );
}