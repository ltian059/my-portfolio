export type Note = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  summary: string;
  content: string[];
};

export const notes: Note[] = [
  {
    slug: "how-to-use-app-router",
    title: "Next.js App Router 入门：路由是如何生成的？",
    date: "2026-01-13",
    tags: ["nextjs", "app-router"],
    summary: "用最小例子理解 app 目录、page/layout、动态路由与导航。",
    content: [
      "App Router 的核心是“约定式路由”：文件夹结构就是 URL 结构。",
      "一个路由段里放 page.tsx 就会生成页面；放 layout.tsx 会包住该段下所有子页面。",
      "动态路由用 [slug] 这种文件夹名表示，params 会通过函数参数传入。",
    ],
  },
  {
    slug: "leetcode-template",
    title: "刷题笔记模板（可直接复用）",
    date: "2026-01-13",
    tags: ["leetcode", "notes"],
    summary: "题意、思路、复杂度、易错点、参考实现的结构化记录方式。",
    content: [
      "题意：一句话复述 + 输入输出边界。",
      "思路：为什么这样做？关键不变量是什么？",
      "复杂度：时间/空间，最坏情况。",
      "易错点：下标、重复元素、溢出、空数组等。",
    ],
  },
];

