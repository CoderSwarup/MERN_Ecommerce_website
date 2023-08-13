import React, { useState } from "react";
import { CKEditor } from "ckeditor4-react";

function CreateProduct() {
  const [editorContent, setEditorContent] = useState(
    "<p>This is an example CKEditor 4 WYSIWYG editor instance.</p>"
  );

  const handleEditorChange = (event) => {
    const content = event.editor.getData();
    setEditorContent(content);
  };

  const insertVideo = () => {
    const videoPlaceholder =
      '<iframe width="560" height="315" src="https://www.youtube.com/embed/N0oBlYAp3tI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';

    setEditorContent(editorContent + videoPlaceholder);
  };

  const saveContent = () => {
    // Replace video placeholders with actual video embed code
    const contentWithVideos = editorContent.replace(
      '<p style="background-color: #f5f5f5; padding: 20px;">[VIDEO_PLACEHOLDER]</p>',
      '<iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID" frameborder="0" allowfullscreen></iframe>'
    );

    console.log(contentWithVideos);
  };

  return (
    <div style={{ padding: "10px" }}>
      {/* <button onClick={insertVideo}>Insert Video Placeholder</button> */}
      <CKEditor initData={editorContent} onChange={handleEditorChange} />
      {/* <div>
        <h2>Editor Content:</h2>
        <div dangerouslySetInnerHTML={{ __html: editorContent }} />
      </div> */}
      {/* <button onClick={saveContent}>Save Content</button> */}
    </div>
  );
}

export default CreateProduct;
