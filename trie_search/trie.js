class TrieNode {
  constructor() {
    this.children = {};
    this.isEnd = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (const c of word.toLowerCase()) {
      if (!node.children[c]) node.children[c] = new TrieNode();
      node = node.children[c];
    }
    node.isEnd = true;
  }

  search(prefix) {
    let node = this.root;
    for (const c of prefix.toLowerCase()) {
      if (!node.children[c]) return [];
      node = node.children[c];
    }
    const results = [];
    this._dfs(node, prefix.toLowerCase(), results);
    return results;
  }

  _dfs(node, word, results) {
    if (node.isEnd) results.push(word);
    for (const [c, child] of Object.entries(node.children))
      this._dfs(child, word + c, results);
  }
}
