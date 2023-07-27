import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/plugins.pkgd.min.js"; //
import FroalaEditorComponent from "react-froala-wysiwyg";
import FroalaEditor from "froala-editor";
import "./FroalaEditor.css";

FroalaEditor.DefineIcon("insert", { NAME: "plus", SVG_KEY: "add" });
FroalaEditor.RegisterCommand("insert", {
  title: "Insert HTML",
  focus: true,
  undo: true,
  refreshAfterCallback: true,
  callback: function () {
    this.html.insert("My New HTML");
  },
});

const Editor = () => {
  const editorRef = useRef(null);
  const [content, setContent] = useState(""); //Editor content state

  useEffect(() => {
    const initializeEditor = async () => {
      // Import FroalaEditor dynamically
      const FroalaEditor = await import("froala-editor");
      FroalaEditor.DefineIcon("insert", { NAME: "plus", SVG_KEY: "add" });
      FroalaEditor.RegisterCommand("insert", {
        title: "Insert HTML",
        focus: true,
        undo: true,
        refreshAfterCallback: true,
        callback: function () {
          this.html.insert("My New HTML");
        },
      });

      if (editorRef.current) {
        editorRef.current?.events?.on("initialized", function () {
          editorRef.current.html.insert("Initial HTML content"); // Example: Inserting initial HTML content
        });
      }
    };

    initializeEditor();
  }, []);

  //handle submit button
  const handleSubmit = () => {
    if (editorRef.current) {
      const editorContent = editorRef.current.editor.html.get();
      setContent(editorContent);
    }
  };

  return (
    <div className="editor-box">
      <FroalaEditorComponent
        tag="textarea"
        // ref={(ref) => (this.ref = ref)}
        ref={editorRef}
        config={{
          placeholderText: "Edit Your Content Here!",
          //   toolbarButtons: ["bold", "insert"],
        }}
        onModelChange={(content) => {
          console.log("Editor Content:", content);
        }}
      />
      <div>
        <button onClick={handleSubmit}>submit</button>
      </div>
      <div>
        <h2>Content Below:</h2>
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
      </div>
    </div>
  );
};

// const root = ReactDOM.createRoot(document.getElementById("editor"));
// root.render(<FroalaEditorComponent tag="textarea" />);

export default Editor;
