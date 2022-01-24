import ArticleCell from "@components/ArticleCell/ArticleCell";
import { article } from "Interfaces/writing";

interface ArticleListViewProps {
  articleList: article[];
  onClick: (pk: string) => void;
}

const ArticleListView = ({ articleList, onClick }: ArticleListViewProps) => {
  return (
    <div className="md:mx-[16vw] mx-auto">
      {articleList.map((article) => {
        const goArticleDetail = () =>
          onClick(`${article.pk.toString()}^${article.fields.title}`);
        return (
          <ArticleCell
            key={article.fields.title + article.pk.toString()}
            pk={article.pk}
            title={article.fields.title}
            content={article.fields.content}
            githubUrl={article.fields.github}
            menuPk={article.fields.menuPk}
            createdAt={article.fields.createdAt}
            updatedAt={article.fields.updatedAt}
            onClick={goArticleDetail}
          />
        );
      })}
    </div>
  );
};

export default ArticleListView;
