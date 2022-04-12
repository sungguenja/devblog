interface IOpenGraphAndTitleProps {
  url: string;
  title: string;
  imgUrl?: string;
}
const OpenGraphAndTitle = ({ url, title, imgUrl }: IOpenGraphAndTitleProps) => {
  return (
    <>
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta
        property="og:image"
        content={
          imgUrl ??
          "https://github.com/sungguenja/lumiaimg/blob/master/blog/card-default.jpg?raw=true"
        }
      />
      <meta property="og:description" content="Description Here" />
      <meta property="og:site_name" content="myDevBlog" />
      <meta property="og:locale" content="ko_KR" />
      <title>{title}</title>
    </>
  );
};

export default OpenGraphAndTitle;
