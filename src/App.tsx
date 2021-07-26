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
