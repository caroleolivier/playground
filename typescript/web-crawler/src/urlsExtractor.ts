import { parse } from "node-html-parser";

export interface IUrlsExtractor {
  extractFrom: (url: URL) => Promise<URL[]>;
}

export class UrlsExtractor implements IUrlsExtractor {
  async extractFrom(pageUrl: URL) {
    try {
      const response = await fetch(pageUrl.href);
      if (response.status !== 200) {
        console.warn(`${pageUrl.href}: returned ${response.status}`);
        return [];
      }

      const html = await response.text();
      const root = parse(html);
      const aElements = root.querySelectorAll("a");

      // TODO: to refactor
      const urls = aElements
        .map((aElt) => aElt.getAttribute("href"))
        .filter((url) => url != null)
        .map((url) => this.toAbsoluteUrl(pageUrl, url!))
        .filter((url): url is URL => url != null);

      return urls;
    } catch (error) {
      console.error(`${pageUrl.href} Fail fetching URLs`, error);
      return [];
    }
  }

  /***
   * Transforms relative links to absolute links.
   * TODO: review logic
   */
  toAbsoluteUrl(pageUrl: URL, url: string) {
    try {
      return new URL(
        url.startsWith("/") ? new URL(`${pageUrl.origin}${url}`) : url
      );
    } catch (error) {
      console.error(`Error parsing ${url}`, error);
      return null;
    }
  }
}
