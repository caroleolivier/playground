import { IUrlsExtractor } from "./urlsExtractor";
import { VisitedGraph } from "./visitedGraph";

export class Crawler {
  graph: VisitedGraph;
  // TODO: should this be on the visited graph?
  visitedUrls: Set<string> = new Set<string>();
  startingUrl: URL;
  urlsExtractor: IUrlsExtractor;

  constructor(startingUrl: URL, urlsExtractor: IUrlsExtractor) {
    this.startingUrl = startingUrl;
    this.urlsExtractor = urlsExtractor;
    this.graph = new VisitedGraph();
  }

  async crawl(url: URL): Promise<VisitedGraph> {
    try {
      console.info(`${url}: crawling...`);
      if (this.visitedUrls.has(url.href)) {
        console.debug(`${url.href}: already visited`);
        return this.graph;
      }

      if (url.hostname != this.startingUrl.hostname) {
        console.debug(`${url.href}: belongs to a different domain`);
        return this.graph;
      }

      console.debug(`${url}: processing`);
      this.visitedUrls.add(url.href);

      const urls = await this.urlsExtractor.extractFrom(url);
      this.graph.add(url, urls);

      const promises = urls.map((url) => this.crawl(url));
      await Promise.all(promises);

      console.info(`${url}: finished crawling.`);
    } catch (error) {
      // TODO: record status of crawling for the page
      console.error(`${url.href}: failed`, error);
    }
    return this.graph;
  }
}
