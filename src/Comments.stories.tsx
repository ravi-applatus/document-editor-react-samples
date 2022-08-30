import { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Comments from "./components/Comments/Comments";
import { DocumentEditor } from "@onlyoffice/document-editor-react";

export default {
    title: "Sample/Comments",
    component: Comments,
    parameters: {},
    decorators: [
        (Story) => (
            <div style={{ height: "400px" }}>
                <Story />
            </div>
        ),
    ]
} as ComponentMeta<typeof Comments>;

const Template: ComponentStory<any> = (args) => {
  const[comments, setComments] = useState<any[]>([]);
  const[connector, setConnector] = useState(null);

  const onDocumentReady = () => {
    var editor = window.DocEditor.instances["docxForComments"];
    var connector = editor.createConnector();

    connector.executeMethod("GetAllComments", null, function(comments: any) {
      let commentsRevers = [];
      for (var i = 0; i < comments.length; i++){
        commentsRevers[i] = comments[(comments.length - 1) - i];
      }
      setComments(commentsRevers);
    });

    setConnector(connector);
  };

  return(
      <div>
        <Comments {...args.comment} userName={args.comment.userName} comments={comments} setComments={setComments} connector={connector} />
        <DocumentEditor {...args.editor}
          id="docxForComments"
          documentserverUrl="http://192.168.1.102:8095/"
          config={{
            document: {
                fileType: "docx",
                title: "demo.docx",
                url: "https://d2nlctn12v279m.cloudfront.net/assets/docs/samples/demo.docx",
            },
            documentType: "word",
            editorConfig: {
                mode: "edit",
                user: {
                    id: "uid-1",
                    name: "John Smith",
                },
            },
        }}
        height="600px"
        width="70%"
        events_onDocumentReady={onDocumentReady}
        />
      </div>
  )}

export const CommentsTemplate = Template.bind({});
CommentsTemplate.storyName = "Comments";
CommentsTemplate.args = {
    comment: {
      editorId: "docxForComments",
      userName: "John Smith"
    },
    editor: {
      documentserverUrl: "http://192.168.1.102:8095/"
    }
};