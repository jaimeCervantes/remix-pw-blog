import { Link, Outlet } from "@remix-run/react";
import { redirect, json } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/server-runtime";
import { requireUserId } from "~/session.server";

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);

  if (!userId) {
    return redirect("/login");
  }

  return json({});
}

export default function PostAdmin() {
  return (
    <div className="grid grid-cols-12 gap-3">
      <aside className="max-sm:col-span-12 sm:col-span-3 md:col-span-3">
        <Link to="/admin/posts/new" className="text-blue-600 underline">
          Crear nueva publicación
        </Link>
      </aside>
      <section className="max-sm:col-span-12 sm:col-span-9 md:col-span-9">
        <h1>Admin panel</h1>
        <Outlet></Outlet>
      </section>
    </div>
  );
}
