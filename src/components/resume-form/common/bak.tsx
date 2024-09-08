"use client";

import { useCallback, useMemo } from "react";
import {
  BaseEditor,
  createEditor,
  Transforms,
  Editor,
  Element as SlateElement,
} from "slate";
import {
  Slate,
  Editable,
  withReact,
  ReactEditor,
  RenderLeafProps,
  RenderElementProps,
} from "slate-react";
import { withHistory } from "slate-history";
import { Bold, Italic, List, ListOrdered, Underline } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Tooltip } from "@/components/ui/tooltip";

enum ElementTypes {
  Paragraph = "paragraph",
  Blockquote = "blockquote",
  BulletedList = "bulleted-list",
  NumberedList = "numbered-list",
  ListItem = "list-item",
}

enum TextAlignTypes {
  Left = "left",
  Center = "center",
  Right = "right",
  Justify = "justify",
}

type CustomElement = {
  type: ElementTypes;
  children: CustomText[];
  align?: TextAlignTypes;
};

interface CustomTextBase {
  bold?: boolean;
  code?: boolean;
  italic?: boolean;
  underline?: boolean;
}

interface CustomText extends CustomTextBase {
  text: string;
}

interface CustomRenderElementProps extends RenderElementProps {
  element: CustomElement;
}

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
    RenderElementProps: CustomRenderElementProps;
  }
}

const initialValue: CustomElement[] = [
  {
    type: ElementTypes.Paragraph,
    children: [{ text: "A line of text in a paragraph." }],
  },
];

const RichText = () => {
  const renderElement = useCallback(
    (props: RenderElementProps) => <Element {...props} />,
    []
  );
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <Leaf {...props} />,
    []
  );
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const toolbarOptions = useMemo(() => {
    if (!editor) return [];
    return [
      {
        title: "加粗",
        name: "bold",
        action: () => toggleMark(editor, "bold"),
        type: "button",
        icon: <Bold className="size-3.5" />,
        isActive: () => isMarkActive(editor, "bold"),
      },
      {
        title: "斜体",
        name: "italic",
        action: () => toggleMark(editor, "italic"),
        type: "button",
        icon: <Italic className="size-3.5" />,
        isActive: () => isMarkActive(editor, "italic"),
      },
      {
        title: "下划线",
        name: "underline",
        action: () => toggleMark(editor, "underline"),
        type: "button",
        icon: <Underline className="size-3.5" />,
        isActive: () => isMarkActive(editor, "underline"),
      },
      {
        title: "无序列表",
        name: "bulleted-list",
        action: () => toggleBlock(editor, ElementTypes.BulletedList),
        type: "button",
        icon: <List className="size-3.5" />,
        isActive: () => isBlockActive(editor, ElementTypes.BulletedList),
      },
      {
        title: "有序列表",
        name: "numbered-list",
        action: () => toggleBlock(editor, ElementTypes.NumberedList),
        type: "button",
        icon: <ListOrdered className="size-3.5" />,
        isActive: () => isBlockActive(editor, ElementTypes.NumberedList),
      },
    ];
  }, [editor]);

  return (
    <div className="group border border-gray-400 rounded min-h-[150px] hover:border-gray-800">
      <Slate editor={editor} initialValue={initialValue}>
        <div className="flex items-center justify-start border-b border-gray-400 group-hover:border-gray-800 py-1 px-2">
          {toolbarOptions.map((option) => (
            <Tooltip key={option.title} content={option.title}>
              <Button
                className={cn("mr-1", { "bg-accent": option.isActive() })}
                onClick={option.action}
                variant="ghost"
                size="sm"
                asChild
              >
                <div> {option.icon}</div>
              </Button>
            </Tooltip>
          ))}
        </div>

        <Editable
          className="focus-within:outline-none p-3 min-h-[150px]"
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          spellCheck
          placeholder="Enter some rich text…"
        />
      </Slate>
    </div>
  );
};

const Element = ({ attributes, children, element }: RenderElementProps) => {
  const style = { textAlign: element?.align };
  switch (element.type) {
    case ElementTypes.BulletedList:
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      );
    case ElementTypes.ListItem:
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case ElementTypes.NumberedList:
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      );
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};

const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const isMarkActive = (editor: Editor, format: keyof CustomTextBase) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const isBlockActive = (
  editor: Editor,
  format: ElementTypes,
  blockType = "type"
) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) => {
        return (
          !Editor.isEditor(n) &&
          SlateElement.isElement(n) &&
          // @ts-ignore
          n[blockType] === format
        );
      },
    })
  );

  return !!match;
};

const toggleMark = (editor: Editor, format: keyof CustomTextBase) => {
  const isActive = isMarkActive(editor, format);
  isActive
    ? Editor.removeMark(editor, format)
    : Editor.addMark(editor, format, true);
};

const toggleBlock = (
  editor: Editor,
  format: ElementTypes,
  blockType = "type"
) => {
  const isActive = isBlockActive(editor, format);
  const isList =
    format === ElementTypes.BulletedList ||
    format === ElementTypes.NumberedList;
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      // @ts-ignore
      n[blockType] === format,
    split: true,
  });
  if (!isActive) {
    Transforms.setNodes(
      editor,
      { type: format, children: [] },
      {
        at: [],
        match: (n) =>
          !Editor.isEditor(n) &&
          SlateElement.isElement(n) &&
          n.type === ElementTypes.ListItem,
      }
    );
    if (isList) {
      const block = { type: ElementTypes.ListItem, children: [] };
      Transforms.wrapNodes(editor, block);
    }
  }
};

export default RichText;

// "use client";

// import { createEditor } from "@editablejs/models";
// import {
//   EditableProvider,
//   ContentEditable,
//   withEditable,
//   Editable,
// } from "@editablejs/editor";
// import { MarkEditor, MarkFormat, withPlugins } from "@editablejs/plugins";
// import {
//   ToolbarComponent,
//   useToolbarEffect,
//   withToolbar,
//   Toolbar,
//   ToolbarItem,
//   ToolbarButtonItem,
// } from "@editablejs/plugin-toolbar";
// import { useMemo } from "react";
// import { HistoryEditor } from "@editablejs/plugin-history";
// import { Undo } from "lucide-react";

// const marks: { title: string; name: MarkFormat }[] = [
//   {
//     title: "加粗",
//     name: "bold",
//   },
//   {
//     title: "斜体",
//     name: "italic",
//   },
//   {
//     title: "下划线",
//     name: "underline",
//   },
// ];

// export const createToolbarItems = (editor: Editable) => {
//   const items: ToolbarItem[] = [
//     {
//       type: "button",
//       title: "撤销",
//       disabled: !HistoryEditor.canUndo(editor),
//       icon: <Undo size={14} />,
//       onToggle: () => {
//         HistoryEditor.undo(editor);
//       },
//     },
//     {
//       type: "button",
//       title: "重做",
//       disabled: !HistoryEditor.canRedo(editor),
//       icon: <Undo size={14} />,
//       onToggle: () => {
//         HistoryEditor.redo(editor);
//       },
//     },
//   ];

//   const markItems = marks.map((mark) => ({
//     type: "button",
//     children: <span className={`icon-${mark.name}`}>{mark.title}</span>,
//     disabled: !MarkEditor.isActive(editor, mark.name),
//     onToggle: () => {
//       MarkEditor.toggle(editor, mark.name);
//     },
//   })) as ToolbarButtonItem[];

//   items.push(...markItems);

//   return items;
// };

// const RichText = () => {
//   const editor = useMemo(() => {
//     let editor = withEditable(createEditor());
//     editor = withPlugins(editor);
//     return withToolbar(editor);
//   }, []);

//   //   useToolbarEffect(() => {
//   //     Toolbar.setItems(
//   //       editor,
//   //       marks.map((mark) => ({
//   //         type: "button",
//   //         children: <span className={`icon-${mark}`}>11</span>,
//   //         active: MarkEditor.isActive(editor, mark),
//   //         onToggle: () => {
//   //           MarkEditor.toggle(editor, mark);
//   //         },
//   //       }))
//   //     );
//   //   }, editor);

//   return (
//     <EditableProvider editor={editor}>
//       <ToolbarComponent editor={editor} items={createToolbarItems(editor)} />
//       <ContentEditable />
//     </EditableProvider>
//   );
// };

// export default RichText;
