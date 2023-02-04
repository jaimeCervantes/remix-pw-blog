import { redirect, json } from "@remix-run/node";
import type { ActionArgs } from "@remix-run/node";
import { createPost } from "~/models/post.server";
import { Form, useActionData, useTransition } from "@remix-run/react";
import { requireUserId } from "~/session.server";
import { marked } from "marked";
import { useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { XcircleSolidIcon } from "~/components/Icons";
import TextField from "~/components/TextField/TextField";

type ActionData = {
  title: null | string;
  slug: null | string;
  content: null | string;
};

export async function action({ request }: ActionArgs) {
  const userId = await requireUserId(request);
  const formData = await request.formData();

  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const content = formData.get("content") as string;

  const errors: ActionData = {
    title: title ? null : "Title is required",
    slug: slug ? null : "Slug is required",
    content: content ? null : "Content is required",
  };

  const hasErrors = Object.values(errors).some((errMsg) => errMsg);

  if (hasErrors) {
    return json<ActionData>(errors);
  }

  await createPost({ title, slug, content, userId });

  return redirect("/admin/posts");
}

const inputClassName =
  "w-full rounded border border-gray-500 px-2 py-1 text-lg dark:text-black";
const errorClassName =
  "pt-1 flex items-center gap-1 text-red-700 dark:text-red-400";

export default function NewPost() {
  const errors = useActionData();
  const transition = useTransition();
  const isCreating = Boolean(transition.submission);
  const [title, setTitle] = useState("");
  const [preview, setPreview] = useState("");
  const titleRef = useRef<HTMLInputElement>(null);
  const slugRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (errors?.title) {
      titleRef.current?.focus();
      return;
    }

    if (errors?.slug) {
      slugRef?.current?.focus();
      return;
    }

    if (errors?.content) {
      contentRef.current?.focus();
    }
  }, [errors]);

  function onChangeContent(e: ChangeEvent<HTMLTextAreaElement>) {
    const content = e.target.value;
    setPreview(content);
  }

  return (
    <main className="py-3 px-3">
      <div className="grid grid-cols-12 gap-3">
        <Form method="post" className="max-md:col-span-12 md:col-span-6">
          <h1 className="mb-4">Creating:</h1>

          <TextField
            label="Post Title: "
            ref={titleRef}
            required={true}
            autoFocus={true}
            name="title"
            value={title}
            type="text"
            autoComplete="title"
            error={errors?.title}
            isInvalid={errors?.title ? true : undefined}
            aria-describedby="title-error"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />

          <TextField
            label="Post Slug: "
            required={true}
            autoFocus={true}
            name="slug"
            type="text"
            autoComplete="slug"
            error={errors?.slug}
            isInvalid={errors?.slug ? true : undefined}
            aria-describedby="slug-error"
          />

          <div className="mb-4">
            <label htmlFor="content">
              Content in "markdown" format:
              {errors?.content ? (
                <div className={errorClassName} id="slug-content">
                  <XcircleSolidIcon />
                  {errors.content}
                </div>
              ) : null}
            </label>
            <br />
            <textarea
              id="content"
              rows={20}
              name="content"
              className={`${inputClassName} font-mono`}
              onChange={onChangeContent}
              ref={contentRef}
              aria-invalid={errors?.slug ? true : undefined}
              aria-describedby="content-error"
            />
          </div>
          <div className="text-right">
            <button
              type="submit"
              className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
              disabled={isCreating}
            >
              {isCreating ? "Creating..." : "Create Post"}
            </button>
          </div>
        </Form>
        <section className="max-md:col-span-12 md:col-span-6">
          <h1 className="mb-4">{title}</h1>
          <div
            data-testid="preview"
            dangerouslySetInnerHTML={{ __html: marked(preview) }}
          ></div>
        </section>
      </div>
    </main>
  );
}
