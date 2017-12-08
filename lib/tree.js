export function buildTree(input) {
    return input.reduce((acc, curr) => {
        let [match, app, weight, subApps] = curr.match(/(\w*)\s\((\d*)\)(?: -> ([\w, ]*))?/);

        if (subApps) {
          subApps
            .split(', ')
            .forEach(subApp => {
              acc[subApp] = acc[subApp] || {};
              acc[subApp].parent = app;

            });
        }

        acc[app] = Object.assign({}, acc[app], {
          app,
          weight: parseInt(weight, 10),
          subApps: subApps ? subApps.split(', ') : []
        });

        return acc;
      }, {});
  }

export function findRoot(tree) {
  return Object
    .keys(tree)
    .find(node => tree[node].parent === undefined)
}

export const summarizeNode = (nodes, root) => {
    let node = nodes[root];

    node.sumWeight = 0;
    node.appWeight = {};
    node.subApps.forEach(sub =>  {
      let subWeight = summarizeNode(nodes, sub);
      node.sumWeight += subWeight;
      node.appWeight[subWeight] = node.appWeight[subWeight] || [];
          node.appWeight[subWeight].push(sub);
    });

    return node.weight + node.sumWeight;
  }

export const findUnbalanced = nodes => Object.keys(nodes)
  .map(n => nodes[n])
  .reduce((acc, node) => {
    if (Object.keys(node.appWeight).length > 1) {

      let sinner = Object
        .keys(node.appWeight)
        .find(sub => node.appWeight[sub].length == 1);

      let expected = Object.keys(node.appWeight).filter(w => w != sinner)[0];
      return {
        sinner: nodes[node.appWeight[sinner]],
        wight: sinner,
        expected: expected,
        corrected: nodes[node.appWeight[sinner]].weight - (sinner - expected)
      }
    }

    return acc;
  }, null);
