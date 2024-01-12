import { argv } from "process";
import { Crawler } from "./crawler";
import { UrlsExtractor } from "./urlsExtractor";

export async function main() {
  try {
    if (argv.length !== 3) {
      console.error(`Invalid number of arguments: ${argv.length} - expects 1`);
      console.info("Exiting");
      return;
    }

    const urlStr = process.argv[2];
    const url = new URL(urlStr);
    const domain = url.hostname;
    console.info(`Running crawler on domain ${domain}`);

    const urlExtractor = new UrlsExtractor();
    const crawler = new Crawler(url, urlExtractor);
    const graph = await crawler.crawl(url);

    graph.print();
  } catch (error) {
    console.error("Unexpected exception", error);
  }
}

if (require.main === module) {
  console.info("Starting the crawler...");
  main()
    .then(() => console.info("Finished"))
    .catch((err) => console.error(err));
}
