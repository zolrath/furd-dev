// @ts-nocheck
import { Resvg } from '@resvg/resvg-js';
import sharp from "sharp";
import { readFile } from "node:fs/promises";
import satori, { type SatoriOptions } from "satori";
import { getIconCode, loadEmoji } from "./twemoji";
import { longDate } from '.';

const generateOgImage = async (
  text: string = "Default Title",
  coverImage: string = "/og.png",
  date: Date = new Date()
): Promise<Buffer> => {
  const options: SatoriOptions = {
    width: 1200,
    height: 630,
    embedFont: true,
    fonts: [
      {
        name: "Archivo Narrow",
        data: await readFile("./src/assets/font/ArchivoNarrow-Bold.ttf"),
        weight: 600,
        style: "normal",
      },
      {
        name: "Inter",
        data: await readFile("./src/assets/font/Inter-Regular.ttf"),
        weight: 400,
        style: "normal",
      },
      {
        name: "Rubik Mono One",
        data: await readFile("./src/assets/font/RubikMonoOne-Regular.ttf"),
        weight: 400,
        style: "normal",
      },
    ],
    loadAdditionalAsset: async (code: string, segment: string) => {
      if (code === "emoji") {
        // if segment is an emoji
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        return `data:image/svg+xml;base64,${btoa(await loadEmoji("twemoji", getIconCode(segment)))}`;
      }
      // if segment is normal text
      return code;
    },
  };

  const base64buffer = await sharp("." + coverImage).toBuffer("base64");
  const base64 = `data:image/png;base64,${base64buffer.toString('base64')}`

  const svg = await satori(
    Template({
      title: text,
      coverImage: base64,
      date: date,
    }),
    options
  );
  const resvg = new Resvg(svg)
  return resvg.render().asPng();
};

export default generateOgImage;

export const getOgImagePath = (filename: string = "Default Value") => {
  if (filename.startsWith("/")) filename = filename.substring(1);

  if (filename.endsWith("/"))
    filename = filename.substring(0, filename.length - 1);

  if (filename === "") filename = "Default Value";

  return `./open-graph/${filename}.png`;
};

export interface OgData {
  title: string;
  coverImage: string;
  date: Date;
}

const Template = (props: OgData) => (
  <div tw="flex text-white bg-[#040a1a] w-full h-full justify-center items-stretch" style={{
    fontFamily: "Inter",
  }}>
    <img tw="absolute left-0 top-0 w-[100%] h-[100%]" src={props.coverImage} height={630} width={1200} style={{ filter: "blur(8px)" }} />
    <div tw="h-full w-full flex font-sans p-8" style={{
      background: "linear-gradient(174deg, rgba(0, 0, 0, 0.90) 5.01%, rgba(0, 0, 0, 0.75) 57.2%, rgba(0, 0, 0, 0.65) 94.99%)"
    }}>
      <div tw="flex flex-col justify-between border-4 rounded-xl border-[#0a434199] w-full h-full p-8">
        <div tw="text-8xl text-[#3AF0CF] font-bold flex-1 flex" style={{
          fontFamily: "Archivo Narrow",
        }}>
          {props.title}
        </div>
        <div tw="text-5xl font-bold flex justify-between items-center" style={{
          fontFamily: "Inter"
        }}>
          <div>{longDate(props.date)}</div>
          <div tw="flex text-6xl items-center">
            <span tw="mr-4" style={{ fontFamily: "Rubik Mono One" }}>furd.dev</span>
          </div>
        </div>
      </div>
    </div>
  </div >
)
