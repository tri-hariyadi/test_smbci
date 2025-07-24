module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Remove import React from "react"'
    },
    fixable: 'code',
    schema: [] // no options
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        if (
          node.source.value === 'react' &&
          node.specifiers.length === 1 &&
          node.specifiers[0].type === 'ImportDefaultSpecifier' &&
          node.specifiers[0].local.name === 'React'
        ) {
          context.report({
            node,
            message: 'Remove unused import React',
            fix(fixer) {
              return fixer.remove(node);
            }
          });
        }
      }
    };
  }
};
