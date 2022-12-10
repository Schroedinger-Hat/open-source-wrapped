import { Octokit, App } from "octokit";
import { env } from "../env/server.mjs";

export const gh = new Octokit({
  appId: env.GITHUB_APP_ID,
  privateKey: env.GITHUB_CLIENT_SECRET,
});
