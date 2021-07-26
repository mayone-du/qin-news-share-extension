import { useEffect, useState } from "react";

export const useCreateNews = () => {
  const [inputNewsUrl, setInputNewsUrl] = useState("");
  const [inputUserName, setInputUserName] = useState("");

  useEffect(() => {
    // storageからユーザー名を取得
    chrome.storage.sync.get("QinUserName", (value) => {
      setInputUserName(value.QinUserName);
    });
  }, []);

  const handleChangeNewsUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputNewsUrl(e.target.value);
  };
  const handleChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputUserName(e.target.value);
  };

  // ニュースの作成
  const handleCreateNews = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // storageにユーザー名を保存
      chrome.storage.sync.set({ QinUserName: inputUserName });

      // URLのチェック
      if (
        inputNewsUrl === "" ||
        !inputNewsUrl.includes("http") ||
        !inputNewsUrl.includes("https")
      ) {
        alert("正しい形式でURLを入力してください。");
        return;
      }
      const now = new Date().getTime();
      fetch("https://news-share-backend.herokuapp.com/graphql/", {
        // fetch("http://localhost:8000/graphql/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            mutation CreateNews(
              $url: String!
              $createdAt: Int!
              $contributorName: String
              $selectCategoryId: ID
              $tagIds: [ID]
            ) {
              createNews(
                input: {
                  url: $url
                  createdAt: $createdAt
                  contributorName: $contributorName
                  selectCategoryId: $selectCategoryId
                  tagIds: $tagIds
                }
              ) {
                news {
                  title
                  url
                  summary
                }
              }
            }
          `,
          variables: {
            url: inputNewsUrl,
            createdAt: Math.floor(now / 1000),
            contributorName: inputUserName,
          },
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          // エラーハンドリング
          try {
            if (json.data.createNews === null) {
              throw new Error("既に登録済みの可能性があります。");
            }
            setInputNewsUrl("");
          } catch (error) {
            alert(error.message);
          }
          // TODO: 新規追加したニュースを表示
        });
    } catch (error) {
      alert(error);
    }
  };
  return {
    inputNewsUrl,
    inputUserName,
    handleChangeNewsUrl,
    handleChangeUserName,
    handleCreateNews,
  };
};
