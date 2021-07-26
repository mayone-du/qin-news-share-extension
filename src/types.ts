export type NewsData = {
  data: {
    todayNews: {
      edges: [
        {
          node: {
            title: string;
            url: string;
            summary: string;
            imagePath: string;
            createdAt: string;
            contributorName: string;
          };
        }
      ];
    };
  };
}

export type CreatedNewsData = {
  data: {
    createNews: {
      title: string;
      url: string;
      summary: string;
      imagePath: string;
      createdAt: string;
      contributorName: string;
    };
  };
};