import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";

import { Article } from "Interfaces/writing";
import styles from "styles/Markdown.module.css";
import "katex/dist/katex.min.css";

interface ArticleMainProps {
  nowArticle: Article;
}

const articleMain = ({ nowArticle }: ArticleMainProps) => {
  return (
    <ReactMarkdown
      className={styles.markdownBody}
      remarkPlugins={[remarkMath, remarkGfm]}
      rehypePlugins={[rehypeKatex]}
      children={nowArticle.fields.content}
      components={{
        p: ({ node, children }) => {
          if ((node.children[0] as unknown as Element).tagName === "img") {
            const image: any = node.children[0];
            return (
              <div className="flex justify-center">
                <div className="">
                  <Image
                    src={image.properties.src}
                    alt={image.properties.alt}
                    width="600"
                    height="300"
                  />
                  <p className="text-center">{image.properties.alt}</p>
                </div>
              </div>
            );
          }
          return <p>{children}</p>;
        },
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              children={String(children).replace(/\n$/, "")}
              style={dracula}
              language={match[1]}
              PreTag="div"
              {...props}
            />
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    />
  );
};

export default articleMain;
