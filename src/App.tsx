import React, { useState } from "react";
import "./App.css";

type NewsData = {
  data: {
    todayNews: {
      edges: [
        {
          node: {
            title: string;
            url: string;
          };
        }
      ];
    };
  };
};

const App = () => {
  const [news, setNews] = useState<NewsData>();
  // ニュースのデータを取得
  fetch("https://news-share-backend.herokuapp.com/graphql/", {
    // fetch("http://localhost:8000/graphql/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
              query GetTodayNews {
                todayNews {
                  edges {
                    node {
                      title
                      url
                      summary
                    }
                  }
                }
              }
            `,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((json: NewsData) => {
      // ニュースの数
      const newsCount: number = json.data.todayNews.edges.length;
      // ニュースがまだない場合
      if (newsCount === 0) {
        // backgroundへニュースの数を送信
        chrome.runtime.sendMessage(
          { newsCount: newsCount.toString() },
          (response) => {
            console.log(response);
          }
        );
        setNews(json);
        return;
      }
      setNews(json);
      // ニュースのカウントを表示
      // backgroundへニュースの数を送信
      chrome.runtime.sendMessage(
        { newsCount: newsCount.toString() },
        (response) => {
          // 受け取ったレスポンスをcontentへ送信
          console.log(response);
          //   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          //     chrome.tabs.sendMessage(
          //       tabs[0].id,
          //       JSON.stringify({ contents: response.newsCount }),
          //       (response) => {}
          //     );
          //   });
        }
      );
    });
  return (
    <div className="App">
      {news?.data.todayNews.edges.map((news, index) => {
        return <li key={index}>{news.node.title}</li>;
      })}
    </div>
  );
};

export default App;
