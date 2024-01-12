import { parse } from "node-html-parser";

export interface IUrlsExtractor {
  extractFrom: (url: URL) => Promise<URL[]>;
}

export class UrlsExtractor implements IUrlsExtractor {
  /**
   * Gets all `a` elements on a page and extracts the `href` tags.
   * And transforms relative URLs to absolute URLs.
   * @param pageUrl
   * @returns
   */
  async extractFrom(pageUrl: URL) {
    try {
      const response = await fetch(pageUrl.href);
      if (response.status !== 200) {
        console.warn(`${pageUrl.href}: returned ${response.status}`);
        return [];
      }

      const html = await response.text();
      const root = parse(html);

      // TODO: to refactor this to exclude relative section links like #something on the page.
      const urls = root
        .querySelectorAll("a")
        .map((aElt) => aElt.getAttribute("href"))
        .filter((url) => url != null && !url.startsWith("./#"))
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
   */
  toAbsoluteUrl(pageUrl: URL, url: string) {
    try {
      // TODO: review and test logic
      return new URL(
        url.startsWith("/") ? new URL(`${pageUrl.origin}${url}`) : url
      );
    } catch (error) {
      console.error(`Error parsing ${url}`, error);
      return null;
    }
  }
}
