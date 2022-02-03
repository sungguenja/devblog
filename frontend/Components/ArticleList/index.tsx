import { Article } from "Interfaces/writing";
import { useRouter } from "next/router";
import ArticleListView from "./ArticleList";

interface ArticleListIndexProps {
  articleList: Article[];
}

const ArticleListIndex = ({ articleList }: ArticleListIndexProps) => {
  const router = useRouter();
  const onClick = (pk: string) => {
    router.push({ pathname: "/article/[pk]", query: { pk } });
  };

  return <ArticleListView articleList={articleList} onClick={onClick} />;
};

export default ArticleListIndex;
