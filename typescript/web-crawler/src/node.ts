export class Node {
  url: URL;
  references: Array<URL> = new Array<URL>();

  constructor(url: URL, references: Array<URL>) {
    this.url = url;
    this.references = references;
  }

  print() {
    if (this.references.length == 0) {
      console.info(`${this.url.href}: 0️⃣`);
    } else {
      console.info(`${this.url.href}: ✅ ${this.references.length} links`);
      this.references.forEach((reference) =>
        console.info(`${this.url.href} ➡️➡️➡️➡️ ${reference.href}`)
      );
    }
  }
}
