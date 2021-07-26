import React, { useCallback } from "react";
import "./App.css";
import { useCreateNews } from "./useCreateNews";
import { useGetTodayNews } from "./useGetTodayNews";

export const App = () => {
  const { news } = useGetTodayNews();
  const {
    inputNewsUrl,
    inputUserName,
    handleChangeNewsUrl,
    handleChangeUserName,
    handleCreateNews,
    createdNews,
    isCreating,
  } = useCreateNews();

  const fixDateFormat = useCallback((createdAt: string): string => {
    const parsedTimestamp = Date.parse(createdAt);
    const newDate = new Date(parsedTimestamp);
    const newMonth =
      newDate.getMonth() + 1 < 10
        ? "0" + (newDate.getMonth() + 1)
        : newDate.getMonth() + 1;
    const newDay =
      newDate.getDate() < 10 ? "0" + newDate.getDate() : newDate.getDate();
    const newHours =
      newDate.getHours() < 10 ? "0" + newDate.getHours() : newDate.getHours();
    const newMinutes =
      newDate.getMinutes() < 10
        ? "0" + newDate.getMinutes()
        : newDate.getMinutes();
    const fixedDate = `${newMonth}/${newDay} ${newHours}:${newMinutes}`;

    return fixedDate;
  }, []);

  const handleReload = useCallback(() => {
    location.reload();
  }, []);

  return (
    <div className="ly_container">
      {/* リロードボタン */}
      <button className="bl_reloadButton" onClick={handleReload}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="bl_refreshButton"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      </button>
      <h1>Qin夜活ニュースシェア</h1>
      {/* ニュース作成（シェア）中のローディング画面 */}
      {isCreating && (
        <div className="bl_loading">
          <svg
            className="mr-3 -ml-1 w-5 h-5 text-black animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      )}

      {/* ニュース作成フォーム */}
      <form onSubmit={handleCreateNews}>
        <input
          type="url"
          value={inputNewsUrl}
          onChange={handleChangeNewsUrl}
          placeholder="https://google.com/news/..."
          autoFocus
        />
        <input
          type="text"
          value={inputUserName}
          onChange={handleChangeUserName}
          placeholder="ユーザーネーム"
        />
        <button className="bl_utilButton" type="submit">
          シェア
        </button>
      </form>

      <section>
        <h2>今日のニュース</h2>
        {/* ローディング画面 */}
        {news === undefined && (
          <div className="bl_loading">
            <svg
              className="mr-3 -ml-1 w-5 h-5 text-black animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        )}
        {/* ニュース一覧 */}
        <ul className="bl_newsList">
          {news?.data.todayNews.edges.map((news, index) => {
            return (
              <li className="bl_newsList_news" key={index}>
                <a
                  href={news.node.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={news.node.imagePath} alt="" />
                  <div className="newsInfo">
                    <span className="title">{news.node.title}</span>
                    <span className="summary">
                      {news.node.summary === ""
                        ? "概要はありません。"
                        : news.node.summary}
                    </span>
                    <div className="newsSubInfo">
                      <span className="contributorName">
                        {news.node.contributorName}
                      </span>
                      <span className="createdAt">
                        {fixDateFormat(news.node.createdAt)}
                      </span>
                    </div>
                  </div>
                </a>
              </li>
            );
          })}
          {/* 追加したニュース */}
          {/* TODO: 上と同じ要素なのでリファクタする */}
          {createdNews.length !== 0 &&
            createdNews.map((newsData: any, index: any) => {
              return (
                <li className="bl_newsList_news" key={index}>
                  <a
                    href={newsData.data.createNews.news.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={newsData.data.createNews.news.imagePath} alt="" />
                    <div className="newsInfo">
                      <span className="title">
                        {newsData.data.createNews.news.title}
                      </span>
                      <span className="summary">
                        {newsData.data.createNews.news.summary === ""
                          ? "概要はありません。"
                          : newsData.data.createNews.news.summary}
                      </span>
                      <div className="newsSubInfo">
                        <span className="contributorName">
                          {newsData.data.createNews.news.contributorName}
                        </span>
                        <span className="createdAt">
                          {fixDateFormat(
                            newsData.data.createNews.news.createdAt
                          )}
                        </span>
                      </div>
                    </div>
                  </a>
                </li>
              );
            })}
        </ul>
      </section>
    </div>
  );
};
