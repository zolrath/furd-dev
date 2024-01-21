import { Resvg } from '@resvg/resvg-js';
import { readFile } from "node:fs/promises";
import satori, { type SatoriOptions } from "satori";
import { getIconCode, loadEmoji } from "./twemoji";

const generateOgImage = async (
  text: string = "Default Title",
  date: Date = new Date()
): Promise<Buffer> => {
  const options: SatoriOptions = {
    width: 600,
    height: 315,
    embedFont: true,
    fonts: [
      {
        name: "Archivo Narrow",
        data: await readFile("./src/assets/font/ArchivoNarrow-SemiBold.ttf"),
        weight: 600,
        style: "normal",
      },
      {
        name: "Inter",
        data: await readFile("./src/assets/font/Inter-Regular.ttf"),
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

  const svg = await satori(
    Template({
      title: text,
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
  date: Date;
}

const Template = (props: OgData) => (
  <div
    style={{
      height: "100%",
      width: "100%",
      display: "flex",
      backgroundColor: "white",
      backgroundImage:
        "radial-gradient(circle at 25px 25px, lightgray 2%, transparent 0%), radial-gradient(circle at 75px 75px, lightgray 2%, transparent 0%)",
      backgroundSize: "100px 100px",
      fontFamily: "Archivo Narrow",
    }}
  >
    <div
      style={{
        padding: "20px",
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "stretch",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          border: "1px solid #374151",
          boxShadow: "5px 5px 0px #374151",
          width: "100%",
          height: "100%",
          padding: "10px",
        }}
      >
        <div
          style={{
            fontSize: "32px",
            fontWeight: "900",
            lineHeight: "3rem",
            padding: "10px 0 50px 0",
            color: "#374151",
            flex: 1,
            display: "flex",
            fontFamily: "Inter",
          }}
        >
          {props.title}
        </div>
        <div
          style={{
            fontSize: "16px",
            fontWeight: "900",
            color: "#374151",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            {props.date.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ marginRight: "16px" }}>furd.dev</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);
