import { redirect, json } from "@remix-run/node";
import type { ActionArgs } from "@remix-run/node";
import { createPost } from "~/models/post.server";
import { Form, useActionData, useTransition } from "@remix-run/react";
import { requireUserId } from "~/session.server";
import { marked } from 'marked';
import { useState } from 'react';
import type { ChangeEvent } from 'react';

const inputClassName = `w-full rounded border border-gray-500 px-2 py-1 text-lg`;

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

export default function NewPost() {
  const errors = useActionData();
  const transition = useTransition();
  const isCreating = Boolean(transition.submission);
  const [title, setTitle] = useState('');
  const [preview, setPreview] = useState('');

  function onChangeContent(e: ChangeEvent<HTMLTextAreaElement>) {
    const content = e.target.value;
    setPreview(content);
  }

  return (
    <main className="py-3 px-3">
      <div className="grid grid-cols-2 gap-4">
        <Form method="post">
          <h1 className="text-3xl mb-4"><strong>Creating:</strong> {title}</h1>
          <div className="mb-4">
            <label>
              Post Title:{" "}
              {errors?.title ? (
                <em className="text-red-600">{errors.title}</em>
              ) : null}
              <input type="text" name="title" className={inputClassName} onChange={(e) => setTitle(e.target.value)} />
            </label>
          </div>
          <div className="mb-4">
            <label>
              Post Slug:{" "}
              {errors?.slug ? (
                <em className="text-red-600">{errors.slug}</em>
              ) : null}
              <input type="text" name="slug" className={inputClassName} />
            </label>
          </div>
          <div className="mb-4">
            <label htmlFor="content">
              Markdown:
              {errors?.content ? (
                <em className="text-red-600">{errors.content}</em>
              ) : null}
            </label>
            <br />
            <textarea
              id="content"
              rows={20}
              name="content"
              className={`${inputClassName} font-mono`}
              onChange={onChangeContent}
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
        <section >
          <h1 className="text-3xl mb-4">{title}</h1>
          <div data-testid="preview" dangerouslySetInnerHTML={{ __html: marked(preview) }}></div>
        </section>
      </div>
    </main>
  );
}
