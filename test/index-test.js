import { expect } from 'chai';
import { CLIEngine } from 'eslint';
import config from '../index';

const cli = new CLIEngine({
  useEslintrc: false,
  configFile: 'index.js',
});

describe('index', () => {
  it('contains extends', () => {
    expect(config).to.include.keys('extends');
  });

  it('does not contain rules', () => {
    expect(config).not.to.include.keys('rules');
  });

  it('forces space in between function name and parens', () => {
    const report = cli.executeOnText('const func = function() {};\nfunc();\n');
    expect(report.errorCount).to.equal(1);

    const { ruleId } = report.results[0].messages.filter((message) => {
      return message.severity === 2;
    })[0];
    expect(ruleId).to.equal('space-before-function-paren');
  });

  it('enforces line length', () => {
    let longString = '';
    for (let index = 0; index < 10; index++) {
      longString += 'abcedefghi';
    }

    const code =
      'function func() {\n' +
      `  return '${longString}';\n` +
      '}\n' +
      'func();\n';
    const report = cli.executeOnText(code);
    expect(report.errorCount).to.equal(1);
    expect(report.results[0].messages[0].ruleId).to.equal('max-len');
  });

  it('prefers parens for arrow functions', () => {
    const report = cli.executeOnText('const func = blah => blah;\nfunc();\n');
    expect(report.errorCount).to.equal(1);
    expect(report.results[0].messages[0].ruleId).to.equal('arrow-parens');
  });

  it.skip('handles destructuring', () => {
    const code =
      'const func = ({ a, ...other }) => {\n' +
      `  return a + other.b;\n` +
      '}\n' +
      'func();\n';
    const report = cli.executeOnText(code);
    expect(report.errorCount).to.equal(0);
  });

  it('allows for multiple stateless react components', () => {
    const code =
      'const c1 = () => <div />;\n' +
      'const c2 = () => <div />;\n' +
      'c1();\nc2();\n';
    const report = cli.executeOnText(code);
    expect(report.errorCount).to.equal(0);
  });

  it('uses one indent for switch statements', () => {
    const code =
      'const c1 = (x) => {\n' +
      '  switch (x) {\n' +
      '    default:\n' +
      '  }\n' +
      '};\n' +
      'c1();\n';
    const report = cli.executeOnText(code);
    expect(report.errorCount).to.equal(0);
  });

  // This test case is dependent on switch to eslint 2.0
  it.skip('throws an error for window being a global', () => {
    const code =
      'const c1 = () => window;\n' +
      'c1();\n';
    const report = cli.executeOnText(code);
    expect(report.errorCount).to.equal(1);
  });
});
