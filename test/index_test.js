import { expect } from 'chai';
import { CLIEngine } from 'eslint';
import config from '../index';

const cli = new CLIEngine({
  useEslintrc: false,
  configFile: 'configs/index.json',
});

describe('index', () => {
  it('is an object', () => {
    expect(config).to.be.an('object');
  });

  it('does not allow space in between function name and parens', () => {
    const report = cli.executeOnText('function () {\n}');
    expect(report.errorCount).to.equal(1);
  });
});
