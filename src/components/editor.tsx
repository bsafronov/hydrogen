"use client";

import { Highlight } from "@tiptap/extension-highlight";
import { Link as LinkTipTap } from "@tiptap/extension-link";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import {
  Bold,
  Code,
  Code2,
  Divide,
  Heading1,
  Heading2,
  Highlighter,
  Italic,
  Link,
  List,
  ListOrdered,
  type LucideIcon,
  Redo2,
  Strikethrough,
  TextQuote,
  Undo2,
} from "lucide-react";
import { useCallback } from "react";
import { Toggle } from "./ui/toggle";

type Props = {
  value: string;
  onChange: (content: string) => void;
};

export const Editor = ({ onChange, value }: Props) => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: "p-4 border",
      },
    },
    extensions: [
      StarterKit,
      Highlight.configure({
        HTMLAttributes: {
          class: "px-1 rounded-md bg-amber-200",
        },
      }),
      LinkTipTap,
    ],
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    content: value,
  });

  const setLink = useCallback(() => {
    if (!editor) return;

    const previousUrl = editor.getAttributes("link");

    const url = window.prompt("URL", previousUrl.href as string);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="rounded-md border">
      <div className="flex flex-wrap items-center divide-x border-b">
        <div>
          <EditorToggler
            onPressedChange={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            pressed={editor.isActive("bold")}
            icon={Bold}
          />
          <EditorToggler
            onPressedChange={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            pressed={editor.isActive("italic")}
            icon={Italic}
          />
          <EditorToggler
            onPressedChange={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            pressed={editor.isActive("strike")}
            icon={Strikethrough}
          />
          <EditorToggler
            onPressedChange={() =>
              editor.chain().focus().toggleHighlight().run()
            }
            disabled={!editor.can().chain().focus().toggleHighlight().run()}
            pressed={editor.isActive("highlight")}
            icon={Highlighter}
          />
          <EditorToggler
            onPressedChange={() => setLink()}
            pressed={editor.isActive("link")}
            icon={Link}
          />
        </div>
        <div>
          <EditorToggler
            onPressedChange={() => editor.chain().focus().toggleCode().run()}
            disabled={!editor.can().chain().focus().toggleCode().run()}
            pressed={editor.isActive("code")}
            icon={Code}
          />
          <EditorToggler
            onPressedChange={() =>
              editor.chain().focus().toggleCodeBlock().run()
            }
            pressed={editor.isActive("codeBlock")}
            icon={Code2}
          />
        </div>
        <div>
          <EditorToggler
            onPressedChange={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            pressed={editor.isActive("heading", { level: 1 })}
            icon={Heading1}
          />
          <EditorToggler
            onPressedChange={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            pressed={editor.isActive("heading", { level: 2 })}
            icon={Heading2}
          />
        </div>
        <div>
          <EditorToggler
            onPressedChange={() =>
              editor.chain().focus().toggleBulletList().run()
            }
            pressed={editor.isActive("bulletList")}
            icon={List}
          />
          <EditorToggler
            onPressedChange={() =>
              editor.chain().focus().toggleOrderedList().run()
            }
            pressed={editor.isActive("orderedList")}
            icon={ListOrdered}
          />
        </div>
        <EditorToggler
          onPressedChange={() =>
            editor.chain().focus().toggleBlockquote().run()
          }
          pressed={editor.isActive("blockquote")}
          icon={TextQuote}
        />
        <EditorToggler
          onPressedChange={() =>
            editor.chain().focus().setHorizontalRule().run()
          }
          pressed={editor.isActive("horizontalRule")}
          icon={Divide}
        />

        <div className="ml-auto">
          <EditorToggler
            onPressedChange={() => editor.chain().focus().undo().run()}
            pressed={!editor.can().chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
            icon={Undo2}
          />
          <EditorToggler
            onPressedChange={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
            icon={Redo2}
            pressed={!editor.can().chain().focus().redo().run()}
          />
        </div>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

type TogglerProps = {
  onPressedChange: () => void;
  pressed: boolean;
  icon: LucideIcon;
  disabled?: boolean;
};
const EditorToggler = ({
  onPressedChange,
  pressed,
  disabled,
  icon: Icon,
}: TogglerProps) => {
  return (
    <Toggle
      type="button"
      onPressedChange={onPressedChange}
      pressed={pressed}
      disabled={disabled}
      className="rounded-none"
    >
      <Icon className="h-4 w-4" />
    </Toggle>
  );
};
