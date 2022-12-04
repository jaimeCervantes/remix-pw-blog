import type { ActionArgs, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
import * as React from "react";
import { XcircleSolidIcon } from "~/components/Icons";

import { getUserId, createUserSession } from "~/session.server";

import { createUser, getUserByEmail } from "~/models/user.server";
import { safeRedirect, validateEmail } from "~/utils";

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const redirectTo = safeRedirect(formData.get("redirectTo"), "/admin");

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

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return json(
      {
        errors: {
          email: "Un usuario ya existe con este correo.",
          password: null,
        },
      },
      { status: 400 }
    );
  }

  const user = await createUser(email, password);

  return createUserSession({
    request,
    userId: user.id,
    remember: false,
    redirectTo,
  });
}

export const meta: MetaFunction = () => {
  return {
    title: "Sign Up",
  };
};

const inputClassName = 'w-full rounded border border-gray-500 px-2 py-1 text-lg dark:text-black';
const errorClassName = 'pt-1 flex items-center gap-1 text-red-700 dark:text-red-400';

export default function Join() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? undefined;
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
        <h1 className="mb-3 text-xl">Registro</h1>
        <Form method="post" className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium"
            >
              Correo electrónico
            </label>
            <div className="mt-1">
              <input
                ref={emailRef}
                id="email"
                required
                autoFocus={true}
                name="email"
                type="email"
                autoComplete="email"
                aria-invalid={actionData?.errors?.email ? true : undefined}
                aria-describedby="email-error"
                className={inputClassName}
              />
              {actionData?.errors?.email && (
                <div className={errorClassName} id="email-error">
                  <XcircleSolidIcon />{actionData.errors.email}
                </div>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium"
            >
              Contraseña
            </label>
            <div className="mt-1">
              <input
                id="password"
                ref={passwordRef}
                name="password"
                type="password"
                autoComplete="new-password"
                aria-invalid={actionData?.errors?.password ? true : undefined}
                aria-describedby="password-error"
                className={inputClassName}
              />
              {actionData?.errors?.password && (
                <div className={errorClassName} id="password-error">
                  <XcircleSolidIcon />{actionData.errors.password}
                </div>
              )}
            </div>
          </div>

          <input type="hidden" name="redirectTo" value={redirectTo} />
          <button
            type="submit"
            className="w-full rounded bg-blue-400  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
          >
            Crear cuenta
          </button>
          <div className="flex items-center justify-center">
            <div className="text-center text-sm">
              Ya tienes una cuenta?{" "}
              <Link
                className="text-blue-400 underline"
                to={{
                  pathname: "/login",
                  search: searchParams.toString(),
                }}
              >
                Iniciar sesion
              </Link>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
