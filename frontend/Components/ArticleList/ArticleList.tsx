import ArticleCell from "@components/ArticleCell/ArticleCell";
import { Article } from "Interfaces/writing";

interface ArticleListViewProps {
  articleList: Article[];
  onClick: (pk: string) => void;
}

const ArticleListView = ({ articleList, onClick }: ArticleListViewProps) => {
  return (
    <div className="md:mx-[16vw] mx-auto grid grid-cols-3 my-10">
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
            thumbnail={article.fields.thumbnail}
            hashtag={article.hashtag}
            onClick={goArticleDetail}
          />
        );
      })}
    </div>
  );
};

export default ArticleListView;
