import Head from "next/head";

import ArticleCell from "@components/ArticleCell/ArticleCell";
import { Article } from "Interfaces/writing";

interface ArticleListViewProps {
  articleList: Article[];
  onClick: (pk: string) => void;
}

const ArticleListView = ({ articleList, onClick }: ArticleListViewProps) => {
  return (
    <div className="md:mx-[16vw] mx-auto grid grid-cols-3">
      <Head>
        <title>글 목록</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
            description={article.fields.description}
          />
        );
      })}
    </div>
  );
};

export default ArticleListView;
