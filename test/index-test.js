import { expect } from 'chai';
import { CLIEngine } from 'eslint';
import config from '../index';

const cli = new CLIEngine({
  useEslintrc: false,
  configFile: 'configs/index.json',
});

describe('index', () => {
  it('contains rules', () => {
    expect(config).to.include.keys('rules');
  });

  it('does not allow space in between function name and parens', () => {
    const report = cli.executeOnText('const f = function () {};\nf();\n');
    console.log(report.results[0]);
    expect(report.errorCount).to.equal(1);

    const { ruleId } = report.results[0].messages.filter((message) => {
      return message.severity === 2;
    })[0];
    expect(ruleId).to.equal('space-before-function-paren');
  });

  it('enforces line length', () => {
    let long_name = '';
    for (let i = 0; i < 10; i++) {
      long_name += 'abcedefghi';
    }

    const code =
      'function f() {\n' +
      `  return ${long_name};\n` +
      '}\n' +
      'f();\n';
    const report = cli.executeOnText(code);
    expect(report.errorCount).to.equal(1);
    expect(report.results[0].messages[0].ruleId).to.equal('max-len');
  });
});
