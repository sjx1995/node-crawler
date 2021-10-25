/*
 * @Description:
 * @Author: Sunly
 * @Date: 2021-10-22 16:08:43
 */
export type IWebsite = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type IContent = {
  id: number;
  title: string;
  summary: string;
  link: string;
  createdAt: string;
  updatedAt: string;
  websiteId: number;
};
