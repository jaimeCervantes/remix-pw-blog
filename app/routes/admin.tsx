import { Link, Outlet } from "@remix-run/react";

export default function PostAdmin() {

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="my-6 mb-2 border-b-2 text-center text-3xl">
        Blog Admin
      </h1>
      <div className="grid grid-cols-4 gap-6">
        <nav className="col-span-4 md:col-span-1">
        <Link
            to={`/admin/posts/new`}
            className="text-blue-600 underline"
          >
            Crear nueva publicación
          </Link>
        </nav>
        <main className="col-span-4 md:col-span-3">
          <Outlet></Outlet>
        </main>
      </div>
    </div>
  );
}