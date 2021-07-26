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
      <form onSubmit={handleCreateNews}>
        <input type="url" value={inputNewsUrl} onChange={handleChangeNewsUrl} />
        <input
          type="text"
          value={inputUserName}
          onChange={handleChangeUserName}
        />
        <button type="submit">シェア</button>
      </form>
      <ul className="bl_newsList">
        {news?.data.todayNews.edges.map((news, index) => {
          return (
            <li className="bl_news" key={index}>
              {news.node.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
