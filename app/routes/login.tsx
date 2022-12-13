import type { ActionArgs, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
import * as React from "react";

import { createUserSession, getUserId } from "~/session.server";
import { verifyLogin } from "~/models/user.server";
import { safeRedirect, validateEmail } from "~/utils";
import TextField from "~/components/TextField/TextField";

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);
  if (userId) return redirect("/admin");
  return json({});
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const redirectTo = safeRedirect(formData.get("redirectTo"), "/admin");
  const remember = formData.get("remember");

  if (!validateEmail(email)) {
    return json(
      {
        errors: {
          email: "El correo electrónico no es valido.",
          password: null,
        },
      },
      { status: 400 }
    );
  }

  if (typeof password !== "string" || password.length === 0) {
    return json(
      { errors: { email: null, password: "La contraseña es obligatoria." } },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return json(
      { errors: { email: null, password: "La contraseña es muy corta." } },
      { status: 400 }
    );
  }

  const user = await verifyLogin(email, password);

  if (!user) {
    return json(
      {
        errors: {
          email: "Correo electrónico o contraseña no valida.",
          password: null,
        },
      },
      { status: 400 }
    );
  }

  return createUserSession({
    request,
    userId: user.id,
    remember: remember === "on" ? true : false,
    redirectTo,
  });
}

export const meta: MetaFunction = () => {
  return {
    title: "Login",
  };
};

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/admin";
  const actionData = useActionData<typeof action>();
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (actionData?.errors?.email) {
      emailRef.current?.focus();
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus();
    }
  }, [actionData]);

  return (
    <div className="flex min-h-full flex-col justify-center">
      <div className="mx-auto w-full max-w-md px-8">
        <h1 className="mb-3 text-xl">Iniciar sesión</h1>
        <Form method="post" className="space-y-6">
          <TextField
            label="Correo electrónico"
            ref={emailRef}
            required={true}
            autoFocus={true}
            name="email"
            type="email"
            autoComplete="email"
            error={actionData?.errors?.email}
            isInvalid={actionData?.errors?.email ? true : undefined}
            aria-describedby="email-error"
          />

          <TextField
            label="Password"
            ref={passwordRef}
            autoFocus={true}
            name="password"
            type="password"
            autoComplete="current-password"
            error={actionData?.errors?.password}
            isInvalid={actionData?.errors?.password ? true : undefined}
          />

          <input type="hidden" name="redirectTo" value={redirectTo} />
          <button
            type="submit"
            className="w-full rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
          >
            Iniciar sesión
          </button>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-300"
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-sm"
              >
                Recuerdame
              </label>
            </div>
            <div className="text-center text-sm">
              No tienes cuenta?{" "}
              <Link
                className="text-blue-400 underline"
                to={{
                  pathname: "/join",
                  search: searchParams.toString(),
                }}
              >
                Registrate
              </Link>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
