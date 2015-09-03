import { expect } from 'chai';
import { CLIEngine } from 'eslint';

const cli = new CLIEngine({
  useEslintrc: false,
  configFile: 'eslintrc.json',
});

describe('index', () => {
  it('does not allow space in between function name and parens', () => {
    const report = cli.executeOnText('function () {\n}');
    expect(report.errorCount).to.equal(1);
  });
});
