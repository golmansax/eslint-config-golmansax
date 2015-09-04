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
    const report = cli.executeOnText('function () {\n}');
    expect(report.errorCount).to.equal(1);
  });
});
