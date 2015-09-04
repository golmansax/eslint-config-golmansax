import { expect } from 'chai';
import { CLIEngine } from 'eslint';
import config from '../index';

const cli = new CLIEngine({
  useEslintrc: false,
  configFile: 'configs/react_native.json',
});

describe('react-native', () => {
  it('is an object', () => {
    expect(config).to.be.an('object');
  });

  it('does not break when using let', () => {
    const code =
      'function f() {\n' +
      '  let x = 5;\n' +
      '  x = 6;\n' +
      '  return x;\n' +
      '}\n' +
      'f();\n';

    const report = cli.executeOnText(code);
    const messages = report.results[0].messages.map((data) => data.message);
    expect(report.errorCount).to.equal(0, messages.join(', '));
  });

  it('does not break when using const', () => {
    const code =
      'function f() {\n' +
      '  const x = 5;\n' +
      '  return x;\n' +
      '}\n' +
      'f();\n';

    const report = cli.executeOnText(code);
    expect(report.errorCount).to.equal(0);
  });
});
