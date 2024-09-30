import { object, string, number, boolean, InferType, array } from "yup";

export const userSchema = object().shape({
  avatar_url: string().required(),
  events_url: string().required(),
  followers_url: string().required(),
  following_url: string().required(),
  gists_url: string().required(),
  gravatar_id: string(),
  html_url: string().url().required(),
  id: number().positive().integer().required(),
  login: string().required(),
  node_id: string().required(),
  organizations_url: string().url().required(),
  received_events_url: string().url().required(),
  repos_url: string().url().required(),
  score: number().positive().required(),
  site_admin: boolean().required(),
  starred_url: string().required(),
  subscriptions_url: string().url().required(),
  type: string().required(),
  url: string().url().required(),
});

export const userPaginationSchema = object().shape({
  incomplete_results: boolean().required(),
  items: array().of(userSchema).required(),
  total_count: number().integer().required(),
});

export type User = InferType<typeof userSchema>;

export type UserPagination = InferType<typeof userPaginationSchema>;
