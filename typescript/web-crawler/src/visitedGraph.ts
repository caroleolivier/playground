import { Node } from "./node";

export class VisitedGraph {
  nodes: Node[] = new Array<Node>();

  add(url: URL, references: URL[]) {
    this.nodes.push(new Node(url, references));
  }

  print() {
    console.log("############# CRAWLING RESULT #############");
    for (let node of this.nodes) {
      node.print();
    }
  }
}
