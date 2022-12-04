import { Form } from "@remix-run/react";

export default function LogoutButton() {
  return (
    <Form action="/logout" method="post">
      <button
        type="submit"
        className="rounded bg-gradient-to-tr from-slate-900 to-transparent py-2 px-4 text-white hover:bg-blue-800 active:bg-blue-900"
      >
        Cerrar sesión
      </button>
    </Form>
  );
}
