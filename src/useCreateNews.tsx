import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import type { CreatedNewsData } from "./types";
export const useCreateNews = () => {
  const [inputNewsUrl, setInputNewsUrl] = useState("");
  const [inputUserName, setInputUserName] = useState("");
  // const [createdNews, setCreatedNews] = useState<CreatedNewsData[] | []>([]);
  const [createdNews, setCreatedNews] = useState<any>([]);
  const [isCreating, setIsCreating] = useState(false);
  useEffect(() => {
    // storageからユーザー名を取得
    chrome.storage.sync.get("QinUserName", (value) => {
      setInputUserName(value.QinUserName);
    });
    // 現在開いているページのURLを取得してサジェスト表示
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      const currentPageUrl = tabs[0].url;
      const currentPageTitle = tabs[0].title;
      // 開いているページのURLがあり、ovice以外のページだったら表示
      if (currentPageUrl && !currentPageUrl.includes("qin.ovice.in")) {
        setInputNewsUrl(currentPageUrl);
        // 現在のページのURLであることを伝える
        currentPageTitle &&
          toast.success(`"${currentPageTitle}" のURLを入力しました`);
      }
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
      setIsCreating(true);
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
                  imagePath
                  createdAt
                  contributorName
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
        .then((json: CreatedNewsData) => {
          // エラーハンドリング
          try {
            if (json.data.createNews === null) {
              throw new Error("既に登録済みの可能性があります。");
            }
            // TODO: type
            setCreatedNews((prev: any) => {
              const newsList = prev;
              prev.push(json);
              return newsList;
            });
            setInputNewsUrl("");
            setIsCreating(false);
          } catch (error) {
            setIsCreating(false);
            alert(error.message);
          }
          // TODO: 新規追加したニュースを表示
          // location.reload();
        });
    } catch (error) {
      alert(error);
    }
  };
  return {
    inputNewsUrl,
    setInputNewsUrl,
    inputUserName,
    handleChangeNewsUrl,
    handleChangeUserName,
    handleCreateNews,
    createdNews,
    isCreating,
  };
};
