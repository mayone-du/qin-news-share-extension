import React from "react";
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
  } = useCreateNews();

  return (
    <div className="ly_container">
      <h1>Qin夜活ニュースシェア</h1>
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
        <button type="submit">シェア</button>
      </form>

      <h2>今日のニュース</h2>
      {/* loading */}
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
      <ul className="bl_newsList">
        {news?.data.todayNews.edges.map((news, index) => {
          return (
            <li className="bl_newsList_news" key={index}>
              <a href={news.node.url} target="_blank" rel="noopener noreferrer">
                <span className="title">{news.node.title}</span>
                <span className="summary">{news.node.summary}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
