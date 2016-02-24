import { describe, it } from 'global-mocha';
import { expect } from 'chai';
import { CLIEngine } from 'eslint';
import config from '../react-native';

const cli = new CLIEngine({
  useEslintrc: false,
  configFile: 'react-native.js',
});

describe('react-native', () => {
  it('contains extends', () => {
    expect(config).to.include.keys('extends');
  });

  it('does not contain rules', () => {
    expect(config).not.to.include.keys('rules');
  });

  it('does not break when using let', () => {
    const code =
      'function func() {\n' +
      '  let attr = 5;\n' +
      '  attr = 6;\n' +
      '  return attr;\n' +
      '}\n' +
      'func();\n';

    const report = cli.executeOnText(code);
    const messages = report.results[0].messages.map((data) => data.message);
    expect(report.errorCount).to.equal(0, messages.join(', '));
  });

  it('does not break when using const', () => {
    const code =
      'function func() {\n' +
      '  const attr = 5;\n' +
      '  return attr;\n' +
      '}\n' +
      'func();\n';

    const report = cli.executeOnText(code);
    expect(report.errorCount).to.equal(0);
  });

  it('does not break on object destructuring', () => {
    const code =
      'function func() {\n' +
      '  var { attr } = { attr: 5 };\n' +
      '  return attr;\n' +
      '}\n' +
      'func();\n';

    const report = cli.executeOnText(code);
    expect(report.errorCount).to.equal(0);
  });
});
