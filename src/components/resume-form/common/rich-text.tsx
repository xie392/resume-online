"use client";

import "@wangeditor/editor/dist/css/style.css";

import React, { useState, useEffect } from "react";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import { IDomEditor, IEditorConfig, IToolbarConfig } from "@wangeditor/editor";

interface RichTextProps extends Partial<IEditorConfig> {
  defaultValue?: string;
  updateValue?: (html: string) => void;
}

const toolbarKeys = [
  "redo",
  "undo",
  "|",
  "bold",
  "underline",
  "italic",
  "|",
  "indent",
  "delIndent",
  "justifyLeft",
  "justifyRight",
  "justifyCenter",
  "|",
  "bulletedList",
  "numberedList",
];

const RichText: React.FC<RichTextProps> = ({
  defaultValue = "",
  updateValue,
  ...props
}) => {
  const [editor, setEditor] = useState<IDomEditor | null>(null);
  const [value, setValue] = useState<string>(defaultValue);

  const toolbarConfig: Partial<IToolbarConfig> = {
    toolbarKeys,
  };

  const editorConfig: Partial<IEditorConfig> = {
    ...props,
  };

  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  const onChange = (editor: IDomEditor) => {
    const html = editor.getHtml();
    setValue(html);
    console.log("html: ", html);

    if (updateValue) updateValue(html);
  };

  return (
    <div className="group border border-gray-400 hover:border-gray-800">
      <Toolbar
        className="border-b border-gray-400 group-hover:border-gray-800"
        editor={editor}
        defaultConfig={toolbarConfig}
        mode="simple"
      />
      <Editor
        className="min-h-[200px]"
        defaultConfig={editorConfig}
        value={value}
        onCreated={setEditor}
        onChange={onChange}
        mode="simple"
      />
    </div>
  );
};

export default RichText;
