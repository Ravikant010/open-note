"use client";
import { useState, useCallback } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Underline from "@tiptap/extension-underline";
import Code from "@tiptap/extension-code";
import CodeBlock from "@tiptap/extension-code-block";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Blockquote from "@tiptap/extension-blockquote";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import FontFamily from "@tiptap/extension-font-family";
import Dropcursor from "@tiptap/extension-dropcursor";
import Gapcursor from "@tiptap/extension-gapcursor";
import History from "@tiptap/extension-history";
import HardBreak from "@tiptap/extension-hard-break";
import CharacterCount from "@tiptap/extension-character-count";
import Placeholder from "@tiptap/extension-placeholder";
import Typography from "@tiptap/extension-typography";
import Youtube from "@tiptap/extension-youtube";
import Mention from "@tiptap/extension-mention";
import { FontSize } from "tiptap-extension-font-size";
import { common, createLowlight } from "lowlight";
import "highlight.js/styles/github.css";


// <Card className="w-full max-w-4xl mx-auto">
// <CardHeader>
//   <CardTitle>Create New Post</CardTitle>
// </CardHeader>
// <CardContent className="space-y-4">
//   {/* Title Input */}
//   <div>
//     <input
//       type="text"
//       placeholder="Post Title"
//       value={title}
//       onChange={(e) => setTitle(e.target.value)}
//       className="w-full p-2 border rounded-md"
//     />
//   </div>

//   {/* Category Selection */}
//   <div>
//     <Select value={category} onValueChange={setCategory}>
//       <SelectTrigger className="w-full">
//         <SelectValue placeholder="Select a category" />
//       </SelectTrigger>
//       <SelectContent>
//         {categories.map((cat) => (
//           <SelectItem key={cat} value={cat}>
//             {cat}
//           </SelectItem>
//         ))}
//       </SelectContent>
//     </Select>
//   </div>




import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  StrikethroughIcon,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Edit2,
  Eye,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Code2,
  CodepenIcon,
  Table as TableIcon,
  Link2,
  Image as ImageIcon,
  YoutubeIcon,
  Subscript as SubscriptIcon,
  Superscript as SuperscriptIcon,
  HighlighterIcon,
  Type,
  RotateCcw,
  RotateCw,
  Minus,
  CheckSquare,
  Edit,
  ChevronDown,

} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { getSession } from "@/lib/session";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Category } from "@/db/schema";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { createNote } from "@/actions/noteActions";
const lowlight = createLowlight(common);
interface ButtonGroupProps {
  children: React.ReactNode;
  className?: string;
}
interface FormatButtonProps {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  title: string;
  className?: string;
  disabled?: boolean;
}
const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  className = "",
}) => <div className={`flex space-x-1 ${className}`}>{children}</div>;
const FormatButton: React.FC<FormatButtonProps> = ({
  active,
  onClick,
  children,
  title,
  className = "",
}) => (
  <button
    type="button"
    onClick={onClick}
    title={title}
    className={`px-2 py-1 rounded ${
      active ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"
    } ${className}`}
  >
    {children}
  </button>
);
const Separator = () => <div className="w-px h-6 bg-gray-200 mx-2" />;
const TextEditor = () => {
  const [isPreview, setIsPreview] = useState(false);
  const [textColor, setTextColor] = useState("#000000");
  const [highlightColor, setHighlightColor] = useState("#ffff00");
  const [documentTitle, setDocumentTitle] = useState("Write Title Here");
  const categories = [
    "Technology",
    "Artificial Intelligence",
    "Business",
    "Health & Wellness",
    "Education",
    "Lifestyle",
    "Travel",
    "Food & Cooking",
    "Sports",
    "Other",
  ];

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)


  const router =  useRouter()
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Bold,
      Italic,
      Strike,
      Underline,
      Code,
      Color,
      TextStyle,
      FontSize,
      CodeBlock,
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
      BulletList.configure({
        HTMLAttributes: { class: "list-disc pl-6" },
      }),
      OrderedList.configure({
        HTMLAttributes: { class: "list-decimal pl-6" },
      }),
      ListItem,
      TaskList,
      TaskList.configure({
        HTMLAttributes: { class: "pl-6" },
      }),
      TaskItem.configure({
        nested: true,
        HTMLAttributes: { class: "flex items-start" },
      }),
      Blockquote,
      HorizontalRule,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Link,
      Image,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Subscript,
      Superscript,
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      FontFamily,
      Dropcursor,
      Gapcursor,
      History,
      HardBreak,
      CharacterCount.configure({
        limit: 10000,
      }),
      Placeholder.configure({
        placeholder: "Start writing...",
      }),
      Typography,
      Youtube.configure({
        width: 840,
        height: 472.5,
        HTMLAttributes: {
          class: "rounded-lg overflow-hidden",
        },
      }),
      Mention.configure({
        suggestion: {
          items: () => [
            { id: "john", name: "John Doe" },
            { id: "jane", name: "Jane Smith" },
          ],
        },
      }),
    ],
    content: `<p>Start typing...</p>`,
    editorProps: {
      attributes: {
        class: "prose dark:prose-invert max-w-none focus:outline-none p-4",
      },
    },
    onUpdate: ({ editor }) => {
      setTextColor(editor.getAttributes("textStyle").color || "#000000");
      setHighlightColor(editor.getAttributes("highlight").color || "#ffff00");
    },
  });
  const setFontSize = (size: string) => {
    if (editor) {
      editor.chain().focus().setMark("textStyle", { fontSize: size }).run();
    }
  };
  const addYoutubeVideo = useCallback(() => {
    const url = prompt("Enter YouTube URL");
    if (editor && url) {
      editor.chain().focus().setYoutubeVideo({ src: url }).run();
    }
  }, [editor]);
  const addImage = useCallback(() => {
    const url = prompt("Enter Image URL");
    if (!url) return; 
    if (editor) {
      editor
        .chain()
        .focus()
        .setImage({ src: url, alt: "User Uploaded Image" })
        .run();
    }
  }, [editor]);
  const addLink = useCallback(() => {
    const url = prompt("Enter URL");
    if (editor && url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  }, [editor]);
  const addTable = useCallback(() => {
    if (editor) {
      editor
        .chain()
        .focus()
        .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
        .run();
    }
  }, [editor]);

  const [posting, setPosting] = useState<boolean>(false);
  const handleTitleChange = (e:any) => {
    setDocumentTitle(e.target.value);
  };
  const handleTitleBlur = () => {
    if (!documentTitle.trim()) setDocumentTitle("Untitled Document");
  };
  if (!editor) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPosting(true);
    try {
    await createNote({
        title: documentTitle,
        body: editor.getHTML(),
        type: 'post',
        categoryName:selectedCategory || "Other"
      }
      );
  
      router.push('/');
    } catch (error) {
      console.error("Failed to create note:", error);
    } finally {
      setPosting(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Card className=" mx-auto shadow-sm">
        <CardHeader className="space-y-1  border-b  p-0">
        <div className="px-4 pt-4 flex flex-col ">
        
          {!isPreview && (
            <div className="flex flex-wrap items-center gap-2 p-2 bg-white border-b">
              {/* Text Formatting */}
              <ButtonGroup>
                <FormatButton
                  active={editor.isActive("bold")}
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  title="Bold"
                >
                  <BoldIcon className="h-4 w-4" />
                </FormatButton>
                <FormatButton
                  active={editor.isActive("italic")}
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  title="Italic"
                >
                  <ItalicIcon className="h-4 w-4" />
                </FormatButton>
                <FormatButton
                  active={editor.isActive("underline")}
                  onClick={() => editor.chain().focus().toggleUnderline().run()}
                  title="Underline"
                >
                  <UnderlineIcon className="h-4 w-4" />
                </FormatButton>
                <FormatButton
                  active={editor.isActive("strike")}
                  onClick={() => editor.chain().focus().toggleStrike().run()}
                  title="Strikethrough"
                >
                  <StrikethroughIcon className="h-4 w-4" />
                </FormatButton>
                <Select onValueChange={setFontSize}>
                  <SelectTrigger className="w-32 flex justify-center items-center">
                    <span className="text-sm">Font Size</span>
                  </SelectTrigger>
                  <SelectContent className="w-32">
                    <SelectItem value="12px">12px</SelectItem>
                    <SelectItem value="14px">14px</SelectItem>
                    <SelectItem value="16px">16px</SelectItem>
                    <SelectItem value="18px">18px</SelectItem>
                    <SelectItem value="20px">20px</SelectItem>
                    <SelectItem value="22px">22px</SelectItem>
                    <SelectItem value="24px">24px</SelectItem>
                    <SelectItem value="26px">26px</SelectItem>
                    <SelectItem value="28px">28px</SelectItem>
                    <SelectItem value="30px">30px</SelectItem>
                    <SelectItem value="32px">32px</SelectItem>
                    <SelectItem value="34px">34px</SelectItem>
                    <SelectItem value="36px">36px</SelectItem>
                    <SelectItem value="38px">38px</SelectItem>
                    <SelectItem value="40px">40px</SelectItem>
                    <SelectItem value="42px">42px</SelectItem>
                    <SelectItem value="44px">44px</SelectItem>
                    <SelectItem value="46px">46px</SelectItem>
                    <SelectItem value="48px">48px</SelectItem>
                    <SelectItem value="50px">50px</SelectItem>
                  </SelectContent>
                </Select>
              </ButtonGroup>
              <Separator />
              {/* Headings */}
              <ButtonGroup>
                <FormatButton
                  active={editor.isActive("heading", { level: 1 })}
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                  }
                  title="Heading 1"
                >
                  <Heading1 className="h-4 w-4" />
                </FormatButton>
                <FormatButton
                  active={editor.isActive("heading", { level: 2 })}
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                  }
                  title="Heading 2"
                >
                  <Heading2 className="h-4 w-4" />
                </FormatButton>
                <FormatButton
                  active={editor.isActive("heading", { level: 3 })}
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 3 }).run()
                  }
                  title="Heading 3"
                >
                  <Heading3 className="h-4 w-4" />
                </FormatButton>
              </ButtonGroup>
              <Separator />
              {/* Lists */}
              <ButtonGroup>
                <FormatButton
                  active={editor.isActive("bulletList")}
                  onClick={() =>
                    editor.chain().focus().toggleBulletList().run()
                  }
                  title="Bullet List"
                >
                  <List className="h-4 w-4" />
                </FormatButton>
                <FormatButton
                  active={editor.isActive("orderedList")}
                  onClick={() =>
                    editor.chain().focus().toggleOrderedList().run()
                  }
                  title="Numbered List"
                >
                  <ListOrdered className="h-4 w-4" />
                </FormatButton>
                <FormatButton
                  active={editor.isActive("taskList")}
                  onClick={() => editor.chain().focus().toggleTaskList().run()}
                  title="Task List"
                >
                  <CheckSquare className="h-4 w-4" />
                </FormatButton>
              </ButtonGroup>
              <Separator />
              <ButtonGroup>
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => {
                    editor.chain().focus().setColor(e.target.value).run();
                    setTextColor(e.target.value);
                  }}
                  className="w-8 h-8 p-1 rounded border border-gray-200 cursor-pointer"
                  title="Text Color"
                />
                <input
                  type="color"
                  value={highlightColor}
                  onChange={(e) => {
                    editor
                      .chain()
                      .focus()
                      .toggleHighlight({ color: e.target.value })
                      .run();
                    setHighlightColor(e.target.value);
                  }}
                  className="w-8 h-8 p-1 rounded border border-gray-200 cursor-pointer"
                  title="Highlight Color"
                />
              </ButtonGroup>
              {/* Text Alignment */}
              <ButtonGroup>
                <FormatButton
                  active={editor.isActive({ textAlign: "left" })}
                  onClick={() =>
                    editor.chain().focus().setTextAlign("left").run()
                  }
                  title="Align Left"
                >
                  <AlignLeft className="h-4 w-4" />
                </FormatButton>
                <FormatButton
                  active={editor.isActive({ textAlign: "center" })}
                  onClick={() =>
                    editor.chain().focus().setTextAlign("center").run()
                  }
                  title="Align Center"
                >
                  <AlignCenter className="h-4 w-4" />
                </FormatButton>
                <FormatButton
                  active={editor.isActive({ textAlign: "right" })}
                  onClick={() =>
                    editor.chain().focus().setTextAlign("right").run()
                  }
                  title="Align Right"
                >
                  <AlignRight className="h-4 w-4" />
                </FormatButton>
                <FormatButton
                  active={editor.isActive({ textAlign: "justify" })}
                  onClick={() =>
                    editor.chain().focus().setTextAlign("justify").run()
                  }
                  title="Justify"
                >
                  <AlignJustify className="h-4 w-4" />
                </FormatButton>
              </ButtonGroup>
              <Separator />
              {/* Special Text */}
              <ButtonGroup>
                <FormatButton
                  active={editor.isActive("subscript")}
                  onClick={() => editor.chain().focus().toggleSubscript().run()}
                  title="Subscript"
                >
                  <SubscriptIcon className="h-4 w-4" />
                </FormatButton>
                <FormatButton
                  active={editor.isActive("superscript")}
                  onClick={() =>
                    editor.chain().focus().toggleSuperscript().run()
                  }
                  title="Superscript"
                >
                  <SuperscriptIcon className="h-4 w-4" />
                </FormatButton>
              </ButtonGroup>
              <Separator />
              {/* Code */}
              <ButtonGroup>
                <FormatButton
                  active={editor.isActive("code")}
                  onClick={() => editor.chain().focus().toggleCode().run()}
                  title="Inline Code"
                >
                  <Code2 className="h-4 w-4" />
                </FormatButton>
                <FormatButton
                  active={editor.isActive("codeBlock")}
                  onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                  title="Code Block"
                >
                  <CodepenIcon className="h-4 w-4" />
                </FormatButton>
              </ButtonGroup>
              <Separator />
              {/* Insert */}
              <ButtonGroup>
                <FormatButton
                  active={editor.isActive("link")}
                  onClick={addLink}
                  title="Add Link"
                >
                  <Link2 className="h-4 w-4" />
                </FormatButton>
                <FormatButton onClick={addImage} title="Add Image">
                  <ImageIcon className="h-4 w-4" />
                </FormatButton>
                <FormatButton
                  onClick={addYoutubeVideo}
                  title="Add YouTube Video"
                >
                  <YoutubeIcon className="h-4 w-4" />
                </FormatButton>
                <FormatButton onClick={addTable} title="Insert Table">
                  <TableIcon className="h-4 w-4" />
                </FormatButton>
                <FormatButton
                  onClick={() =>
                    editor.chain().focus().setHorizontalRule().run()
                  }
                  title="Horizontal Rule"
                >
                  <Minus className="h-4 w-4" />
                </FormatButton>
              </ButtonGroup>
              <Separator />
              {/* Formatting */}
              <ButtonGroup>
                <FormatButton
                  active={editor.isActive("blockquote")}
                  onClick={() =>
                    editor.chain().focus().toggleBlockquote().run()
                  }
                  title="Blockquote"
                >
                  <Quote className="h-4 w-4" />
                </FormatButton>
                <FormatButton
                  onClick={() => editor.chain().focus().toggleHighlight().run()}
                  title="Highlight"
                  active={editor.isActive("highlight")}
                >
                  <HighlighterIcon className="h-4 w-4" />
                </FormatButton>
              </ButtonGroup>
              <Separator />
              {/* Font Controls */}
              <ButtonGroup>
                <ButtonGroup>
                  <Select
                    value={editor.getAttributes("textStyle").fontFamily}
                    onValueChange={(value) =>
                      editor.chain().focus().setFontFamily(value).run()
                    }
                  >
                    <SelectTrigger className="w-32">
                      <Type className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Font..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Arial">Arial</SelectItem>
                        <SelectItem value="Times New Roman">
                          Times New Roman
                        </SelectItem>
                        <SelectItem value="Courier New">Courier New</SelectItem>
                        <SelectItem value="Georgia">Georgia</SelectItem>
                        <SelectItem value="Comic Sans MS">
                          Comic Sans MS
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </ButtonGroup>
              </ButtonGroup>
              <Separator />
              {/* History */}
              <ButtonGroup>
                <FormatButton
                  onClick={() => editor.chain().focus().undo().run()}
                  disabled={!editor.can().undo()}
                  title="Undo"
                >
                  <RotateCcw className="h-4 w-4" />
                </FormatButton>
                <FormatButton
                  onClick={() => editor.chain().focus().redo().run()}
                  disabled={!editor.can().redo()}
                  title="Redo"
                >
                  <RotateCw className="h-4 w-4" />
                </FormatButton>
              </ButtonGroup>
              <div className="flex items-center justify-between">
            <div className="space-y-1 flex-1">
            </div>
           <Button      variant="default"
              size="sm" className="w-20 mx-4 px-10" onClick={async(e)=>{
                console.log(editor.getHTML())
             await   handleSubmit(e)
              }}>
                {posting ? 'Posting...' : 'Post'}
            </Button>
            <Button
             variant={"outline"}
              size="sm"
              className="gap-2 bg-white hover:bg-gray-50 border-gray-200 w-20 px-10"
              onClick={() => setIsPreview(!isPreview)}
            >
              {isPreview ? (
                <>
                  <Edit2 className="h-4 w-4 text-gray-600" />
                  <span className="text-gray-700">Edit</span>
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4 text-gray-600" />
                  <span className="text-gray-700">Preview</span>
                </>
              )}
            </Button> 
          </div>

          
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline">
        {selectedCategory || "All Categories"}
        <ChevronDown className="ml-2 h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem onClick={() => setSelectedCategory(null)}>All Categories</DropdownMenuItem>
      {Object.values(categories).map((category:string) => (
        <DropdownMenuItem key={category} onClick={() => setSelectedCategory(category)}>
          {category}
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>

            </div>
          )}
            <Input
            value={documentTitle}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
            style={{fontSize: "1.2rem"}}
            onKeyDown={(e) => e.key === "Enter" && (e.target as HTMLInputElement)?.blur() }
            className="text-[2rem] font-semibold border-none shadow-none focus-visible:ring-0 px-0 self-center relative bottom-0 h-auto py-5"
            placeholder="Document Title"
          />
          </div>
        </CardHeader>
        {/* Basic Formatting */}
        <CardContent className="p-0">
          <div className="bg-white">
            <EditorContent
              editor={editor}
              className=" mx-auto px-12 py-8 h-[calc(100vh-250px)] focus:outline-none overflow-scroll"
            />
          </div>
        </CardContent>
        {/* <CardContent className="p-0">
          <div className="bg-white">
            <EditorContent
              editor={editor}
              className="max-w-[850px] mx-auto px-12 py-8 min-h-[calc(100vh-200px)] h-80 focus:outline-none"
            />
          </div>
        </CardContent> */}
      </Card>
      <style jsx global>{`
        .tiptap {
          min-height: 500px;
          font-family: system-ui, -apple-system, sans-serif;
          line-height: 1.6;
        }
        .tiptap p {
          margin: 0.8em 0;
        }
        .tiptap h1 {
          font-size: 1.75rem;
          font-weight: 600;
          margin: 1em 0 0.5em;
        }
        .tiptap h2 {
          font-size: 1.4rem;
          font-weight: 600;
          margin: 1em 0 0.5em;
        }
        .tiptap ul {
          max-width: 100%;
        }
        .tiptap ul,
        .tiptap ol {
          padding-left: 1.2em;
          margin: 0.8em 0;
        }
        .tiptap ul li {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
          width: 100%;
          margin-top: 10px;
          word-wrap: break-word;
          overflow-wrap: anywhere;
          white-space: normal;
        }
        .tiptap p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #9ca3af;
          pointer-events: none;
          height: 0;
        }
        .tiptap img {
          max-width: 100%;
          height: auto;
          margin: 1rem 0;
          border-radius: 0.5rem;
        }
        .tiptap img.ProseMirror-selectednode {
          outline: 2px solid #3b82f6;
        }
        .tiptap pre {
          background: #1e293b;
          color: #f8fafc;
          padding: 1.5rem;
          border-radius: 0.5rem;
          margin: 1.5rem 0;
          overflow-x: auto;
        }
        .tiptap pre code {
          font-family: "Fira Code", monospace;
          font-size: 0.9em;
          color: inherit;
          padding: 0;
          background: none;
          border-radius: 0;
        }
        .tiptap blockquote {
          border-left: 4px solid #e2e8f0;
          padding-left: 1rem;
          margin-left: 0;
          margin-right: 0;
          font-style: italic;
        }
        .tiptap hr {
          border: none;
          border-top: 2px solid #e2e8f0;
          margin: 2rem 0;
        }
        .tiptap table {
          border-collapse: collapse;
          margin: 0;
          overflow: hidden;
          table-layout: fixed;
          width: 100%;
        }
        .tiptap table td,
        .tiptap table th {
          border: 2px solid #ced4da;
          box-sizing: border-box;
          min-width: 1em;
          padding: 0.5rem 1rem;
          position: relative;
          vertical-align: top;
        }
        .tiptap table th {
          background-color: #f8f9fa;
          font-weight: bold;
        }
        .tiptap table .selectedCell:after {
          background: rgba(200, 200, 255, 0.4);
          content: "";
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          pointer-events: none;
          position: absolute;
          z-index: 2;
        }
        .tiptap a {
          color: #3b82f6;
          text-decoration: underline;
          cursor: pointer;
        }
        .tiptap a:hover {
          color: #2563eb;
        }
        .tiptap .ProseMirror:focus {
          outline: none;
        }
        .tiptap .ProseMirror > *:focus {
          background-color: rgba(0, 0, 0, 0.05);
          border-radius: 3px;
        }
        .tiptap details {
          border: 1px solid #e2e8f0;
          border-radius: 0.5rem;
          padding: 0.5rem;
          margin: 1rem 0;
        }
        .tiptap details summary {
          font-weight: bold;
          cursor: pointer;
        }
        .tiptap .mention {
          background-color: #e2e8f0;
          border-radius: 0.25rem;
          padding: 0.125rem 0.25rem;
          font-weight: bold;
        }
        .tiptap .emoji {
          display: inline-block;
          vertical-align: middle;
        }
      `}</style>
    </div>
  );
};
export default function Home() {

  return (
    <main>
    <TextEditor />
    </main>
  );
}
