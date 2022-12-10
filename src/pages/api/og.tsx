import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

const MAX_LEN = 18;

export default async function (req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const username = searchParams.get("username") || "";
  const avatar = searchParams.get("avatar") || "";
  const repos = trunArr(searchParams.getAll("repos"), MAX_LEN);
  const contribs = trunArr(searchParams.getAll("contribs"), MAX_LEN);
  const stars = Number(searchParams.get("stars") || "10");

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div tw="absolute inset-0 h-full w-full flex flex-col bg-black text-white px-20 pt-20">
          <img src={avatar} alt={username} tw="w-full mx-auto rounded-xl" />
          <div tw="flex flex-col w-100% items-center justify-center text-white font-bold mt-10">
            <span tw="text-4xl">@{username}</span>
          </div>
          <div tw="flex text-5xl w-full justify-between mt-10 gap-x-10">
            <div tw="flex flex-col flex-grow-0 w-1/2">
              <span tw="text-red-600"> Top Repos </span>
              <ol tw="flex flex-col mt-3 text-4xl">
                {repos.map((repo, idx) => (
                  <li key={repo} tw="align-baseline">
                    <span tw="">{idx + 1}</span> <span tw="ml-3">{repo}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div tw="flex flex-grow-0 w-1/2 flex-col">
              <span tw="text-red-600"> Top Contribs </span>
              <ol tw="flex flex-col mt-3 text-4xl">
                {contribs.map((contr, idx) => (
                  <li key={contr} tw="align-baseline">
                    <span tw="">{idx + 1}</span> <span tw="ml-3">{contr}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div tw="flex text-5xl w-full justify-between mt-10">
            <div tw="flex flex-col flex-grow-0 w-1/2">
              <span tw="text-red-600"> Stars ⭐️</span>
              <span tw="text-7xl mt-10"> {stars} </span>
            </div>
            <div tw="flex flex-grow-0 w-1/2 flex-col">
              <span tw="text-red-600"> Preferred Language </span>
              <span tw="text-7xl mt-10"> TypeScript </span>
            </div>
          </div>

          <div tw="absolute bottom-10 inset-x-16 flex items-center">
            <div tw="h-20 w-20 flex rounded-full overflow-hidden bg-red-600">
              <SHLogo />
            </div>
            <span tw="text-white text-4xl ml-5">Schrödinger Hat </span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1080,
      height: 1920,
    }
  );
}

const SHLogo = () => {
  return (
    <svg fill="black" width="100%" viewBox="0 0 1440 1440">
      <path
        fill="url(#a)"
        d="M0 0h1080v1080H0z"
        transform="matrix(1.33333 0 0 -1.33333 0 1440)"
      ></path>
      <g clipPath="url(#b)" transform="matrix(1.33333 0 0 -1.33333 0 1440)">
        <path d="M836.725 538.98c.889 3.504 1.224 7.248.761 11.178l-22.772 193.281c-2.057 17.461-22.245 26.147-36.338 15.636l-80.589-60.113c-44.512 19.349-96.877 30.513-152.926 30.513-53.873 0-104.337-10.318-147.7-28.299l-85.816 64.011c-14.093 10.512-34.281 1.826-36.338-15.635l-22.772-193.281a30.49 30.49 0 011.289-13.081 149.364 149.364 0 01-1.509-21.193c0-114.587 131.111-207.478 292.846-207.478 161.734 0 292.845 92.891 292.845 207.478 0 5.718-.34 11.381-.981 16.983"></path>
        <path
          fill="#fff"
          d="M442.202 565.793c0-25.961-21.045-47.007-47.006-47.007-25.962 0-47.007 21.046-47.007 47.007s21.045 47.006 47.007 47.006c25.961 0 47.006-21.045 47.006-47.006M707.526 518.493l-29.391 29.39-28.843-28.844-16.951 16.95 28.844 28.844-29.393 29.394 18.865 18.864 29.394-29.394 28.844 28.848 16.95-16.95-28.843-28.849 29.389-29.389z"
        ></path>
      </g>
    </svg>
  );
};

function trunArr(list: string[], maxLen: number) {
  return list.map((r) => {
    if (r.length > maxLen) {
      return r.substring(0, maxLen) + "...";
    }
    return r;
  });
}
