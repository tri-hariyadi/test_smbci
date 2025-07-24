module.exports = {
  meta: {
    type: 'layout',
    fixable: 'whitespace',
    docs: {
      description: 'Require blank line before export default'
    },
    schema: []
  },
  create(context) {
    return {
      ExportDefaultDeclaration(node) {
        const sourceCode = context.getSourceCode();
        const prevToken = sourceCode.getTokenBefore(node);

        if (!prevToken) return;

        const linesBetween = node.loc.start.line - prevToken.loc.end.line;

        if (linesBetween < 2) {
          context.report({
            node,
            message: 'Expected blank line before export default.',
            fix(fixer) {
              return fixer.insertTextBefore(node, '\n');
            }
          });
        }
      }
    };
  }
};
