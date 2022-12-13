import { Octokit, App } from "octokit";
import { env } from "../env/server.mjs";

export const gh = new Octokit({
  auth: env.GITHUB_TOKEN,
});
