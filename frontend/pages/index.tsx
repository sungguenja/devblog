import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";

import { GET_MAINMENU_PROPS } from "@constants/Url";
import { useGetAsync } from "hooks/useAsync";
import { Article } from "Interfaces/writing";
import ArticleCell from "@components/ArticleCell/ArticleCell";

import styles from "../styles/Home.module.css";

const carouselLength = 3;
const carouselSpeed = 300;

interface IndexPageProps {
  nowArticle: Article[];
}

const Home = ({ nowArticle }: IndexPageProps) => {
  const listDiv = useRef<HTMLDivElement>(null);
  const [carouselIndex, setCarouselIndex] = useState<number>(1);
  const [carouselStringArray, setCarouselStringArray] = useState<string[]>([]);
  const [isLast, setIsLast] = useState<boolean>(false);
  const [isFirst, setIsFirst] = useState<boolean>(false);
  const router = useRouter();

  const goArticle = useCallback(() => {
    router.push({
      pathname: "/article/[pk]",
      query: { pk: `${nowArticle[0].pk}^${nowArticle[0].fields.title}` },
    });
  }, [nowArticle]);

  const goGithub = () => {
    window.location.href = "https://github.com/sungguenja";
  };

  const goBlogCode = () => {
    window.location.href = "https://github.com/sungguenja/devblog";
  };

  const nextButtonClick = useCallback(() => {
    setCarouselIndex((beforeIndex) => beforeIndex + 1);
    if (carouselIndex >= carouselLength) {
      setTimeout(() => {
        setIsLast(true);
        console.log("?", carouselIndex);
        setCarouselIndex(1);
        setTimeout(() => {
          setIsLast(false);
        }, carouselSpeed);
      }, carouselSpeed);
    }
  }, [carouselIndex]);

  const beforeButtonClick = useCallback(() => {
    setCarouselIndex((beforeIndex) => beforeIndex - 1);
    if (carouselIndex <= 1) {
      setTimeout(() => {
        setIsFirst(true);
        console.log("?", carouselIndex);
        setCarouselIndex(carouselLength);
        setTimeout(() => {
          setIsFirst(false);
        }, carouselSpeed);
      }, carouselSpeed);
    }
  }, [carouselIndex]);

  useEffect(() => {
    const firstElement = listDiv.current?.firstElementChild;
    const lastElement = listDiv.current?.lastElementChild;
    if (
      firstElement !== null &&
      firstElement !== undefined &&
      lastElement !== null &&
      lastElement !== undefined
    ) {
      const cloneFirst = firstElement.cloneNode(true);
      const cloneLast = lastElement.cloneNode(true);

      listDiv.current?.appendChild(cloneFirst);
      listDiv.current?.insertBefore(
        cloneLast,
        listDiv.current.firstElementChild,
      );
    }
    setCarouselStringArray([
      "깃허브에 방문해주세요!",
      nowArticle[0].fields.title,
      "블로그의 코드가 궁금하다면?",
      "깃허브에 방문해주세요!",
      nowArticle[0].fields.title,
    ]);
  }, [listDiv]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Dev Blog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} md:mx-[16vw] mx-auto`}>
        <div className={styles.slideWrap}>
          <div className={styles.slideBox}>
            <div
              className={styles.slideList}
              style={{
                width: "500vw",
                height: "100%",
                transform: `translate3d(-${carouselIndex * 20}%,0px,0px)`,
                transition: `${
                  isLast || isFirst ? "0ms" : `${carouselSpeed}ms`
                }`,
              }}
              ref={listDiv}
            >
              <div
                className={`${styles.slideItem} carousel-item cursor-pointer`}
                onClick={goArticle}
              >
                <img
                  className="w-full"
                  src={
                    nowArticle[0].fields.thumbnail ?? "/image/card-default.jpg"
                  }
                  alt={nowArticle[0].fields.title}
                  style={{ width: "100%", height: "44vh", objectFit: "cover" }}
                />
              </div>
              <div
                className={`${styles.slideItem} carousel-item cursor-pointer`}
              >
                <img
                  className="w-full"
                  src="/image/coding.jpg"
                  alt="blog code"
                  style={{ width: "100%", height: "44vh", objectFit: "cover" }}
                />
              </div>
              <div
                className={`${styles.slideItem} carousel-item cursor-pointer`}
              >
                <img
                  className="w-full"
                  src="/image/github.png"
                  alt="blog code"
                  style={{ width: "50%", height: "44vh", objectFit: "cover" }}
                />
              </div>
            </div>

            <div
              className={styles.cardDiv}
              onClick={
                carouselIndex === 1
                  ? goArticle
                  : carouselIndex === 2
                  ? goBlogCode
                  : goGithub
              }
            >
              <h1
                className={`text-gray-700 ${styles.linkUnderline} ${styles.linkUnderlineBlack} text-lg cursor-pointer`}
              >
                {carouselStringArray[carouselIndex]}
              </h1>
            </div>
          </div>
          <div className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={beforeButtonClick}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={nextButtonClick}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </div>
        </div>

        <div className="mt-[15vh]">
          <h1 className="font-bold text-2xl">최신 글</h1>
          <div className="grid grid-cols-2">
            {nowArticle.map((article) => {
              const goArticleDetail = () =>
                router.push({
                  pathname: "/article/[pk]",
                  query: { pk: `${article.pk}^${article.fields.title}` },
                });
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
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export async function getServerSideProps() {
  const result = await useGetAsync(GET_MAINMENU_PROPS);
  const nowArticle = result.data;
  return { props: { nowArticle } };
}

export default Home;
