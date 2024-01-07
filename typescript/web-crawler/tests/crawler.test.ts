import { Crawler } from "../src/crawler";
import { IUrlsExtractor } from "../src/urlsExtractor";

class MockedUrlExtractor implements IUrlsExtractor {
  urls: Record<string, URL[]> = {};

  mock(urls: Record<string, URL[]>) {
    this.urls = urls;
  }

  extractFrom(currentUrl: URL): Promise<URL[]> {
    return Promise.resolve(this.urls[currentUrl.href]);
  }
}

describe("given valid URL and crawler", () => {
  const startingUrl = new URL("https://www.theguardian.com");

  let mockedUrlsExtractor: MockedUrlExtractor;
  let crawler: Crawler;

  beforeEach(() => {
    mockedUrlsExtractor = new MockedUrlExtractor();

    crawler = new Crawler(startingUrl, mockedUrlsExtractor);
  });

  describe("when there is no link", () => {
    test("prints no links", async () => {
      mockedUrlsExtractor.mock({
        [startingUrl.href]: [],
      });

      const visitedGraph = await crawler.crawl(startingUrl);

      expect(visitedGraph.nodes).toHaveLength(1);
      expect(visitedGraph.nodes[0].references).toHaveLength(0);
    });
  });

  describe("when a link does not belong to the same domain", () => {
    const cases = [
      "http://something.else/",
      `https://community.${startingUrl.hostname}/`,
    ];
    test.each(cases)(
      "like %p then prints it and does not visit",
      async (otherDomainLink) => {
        mockedUrlsExtractor.mock({
          [startingUrl.href]: [new URL(otherDomainLink)],
        });

        const visitedGraph = await crawler.crawl(startingUrl);

        expect(visitedGraph.nodes).toHaveLength(1);
        expect(visitedGraph.nodes[0].references).toHaveLength(1);
        expect(visitedGraph.nodes[0].references[0].href).toEqual(
          otherDomainLink
        );
      }
    );
  });

  describe("when a link references the currently crawled page", () => {
    test("prints it and does not crawl it", async () => {
      mockedUrlsExtractor.mock({
        [startingUrl.href]: [startingUrl],
      });

      const visitedGraph = await crawler.crawl(startingUrl);

      expect(visitedGraph.nodes).toHaveLength(1);
      expect(visitedGraph.nodes[0].references).toHaveLength(1);
      expect(visitedGraph.nodes[0].references[0].href).toEqual(
        startingUrl.href
      );
    });
  });

  describe("when a link references an already crawled page", () => {
    test("prints it and does not crawl it", async () => {
      mockedUrlsExtractor.mock({
        [startingUrl.href]: [new URL(`${startingUrl.origin}/business`)],
        [`${startingUrl.origin}/business`]: [
          new URL(`${startingUrl.origin}/personal`),
          startingUrl,
        ],
        [`${startingUrl.origin}/personal`]: [startingUrl],
      });

      const visitedGraph = await crawler.crawl(startingUrl);

      expect(visitedGraph.nodes).toHaveLength(3);
      const startingNode = visitedGraph.nodes[0];
      expect(startingNode.references).toHaveLength(1);
      expect(visitedGraph.nodes[0].references[0].href).toEqual(
        `${startingUrl.origin}/business`
      );

      const businessNode = visitedGraph.nodes[1];
      expect(businessNode.references).toHaveLength(2);
      expect(businessNode.references[0].href).toEqual(
        `${startingUrl.origin}/personal`
      );
      expect(businessNode.references[1].href).toEqual(startingUrl.href);

      const personalNode = visitedGraph.nodes[2];
      expect(personalNode.references).toHaveLength(1);
      expect(personalNode.references[0].href).toEqual(startingUrl.href);
    });
  });
});
