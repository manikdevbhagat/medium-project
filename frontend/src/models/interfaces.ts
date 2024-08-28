export interface Blog {
  id: string;
  title: string;
  content: string;
  publishedAt: string;
  author: {
    name: string;
  };
}
