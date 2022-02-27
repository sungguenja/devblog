import { Hastag } from "Interfaces/writing";

import style from "./ArticleCell.module.css";

interface ArticleCellProps {
  pk: number;
  title: string;
  content: string;
  menuPk: number;
  githubUrl: string;
  createdAt: Date;
  updatedAt: Date;
  thumbnail?: string;
  hashtag: Hastag[];
  onClick: VoidFunction;
}

const ArticleCell = ({
  pk,
  title,
  content,
  menuPk,
  githubUrl,
  createdAt,
  updatedAt,
  thumbnail,
  hashtag,
  onClick,
}: ArticleCellProps) => {
  return (
    <div
      className="max-w-sm mx-2 my-3 rounded overflow-hidden shadow-lg duration-300 cursor-pointer hover:scale-110"
      onClick={onClick}
    >
      <img
        className="w-full"
        src={thumbnail ?? "/image/card-default.jpg"}
        alt={title}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <a
          className={`text-gray-700 ${style.linkUnderline} ${style.linkUnderlineBlack} text-black`}
          href="#!"
        >
          {content.length >= 50
            ? `... ${content.substring(50, 100)} ...`
            : content}
        </a>
      </div>
      <div className="px-6 pt-4 pb-2">
        {hashtag.map((tag) => (
          <span
            key={tag.fields.title + title}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >
            #{tag.fields.title}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ArticleCell;
