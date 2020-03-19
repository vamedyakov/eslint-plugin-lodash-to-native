"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Use Array#map instead of lodash#map",
      category: "Best Practices",
      recommended: true
    },
    fixable: "code",
    schema: [] // no options
  },
  create: function (context) {
    return {
      "CallExpression[callee.object.name='_'][callee.property.name='map'][arguments.length>1]": function (node) {
        const source = context.getSourceCode();
        const firstArgSource = source.getText(node.arguments[0]);

        const tokensBefore = source.getTokensBefore(node, { filter: token => token.type === "Identifier" && token.value === "_" });
        for (let i = 0; i < tokensBefore.length; i++) {
          const tokenNode = source.getNodeByRangeIndex(source.getIndexFromLoc(tokensBefore[i].loc.start));
          if (tokenNode.parent.type === "AssignmentExpression") {
            return;
          }
        }

        if (node.parent.type === "ConditionalExpression") {
          if (source.getText(node.parent.test) === `Array.isArray(${firstArgSource})`) {
            return;
          }
        }

        if (node.arguments[0].type === "ObjectExpression") {
          return;
        }

        const fixer = ((context, node) => (fixer) => {
          const source = context.getSourceCode();
          const firstArgSource = source.getText(node.arguments[0]);
          const secondArgSource = source.getText(node.arguments[1]);

          if (node.arguments[0].type === "ArrayExpression") {
            return fixer.replaceText(node, `${firstArgSource}.map(${secondArgSource})`);
          }

          return fixer.replaceText(node, [
            `(Array.isArray(${firstArgSource})) `,
            `? ${firstArgSource}.map(${secondArgSource}) `,
            `: _.map(${firstArgSource}, ${secondArgSource})`
          ].join(''));
        })(context, node);

        context.report({
          node: node,
          message: 'Use native Array#map method if possible.',
          fix: fixer
        });
      }
    };
  }
};
