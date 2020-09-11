import MermaidAPI from 'mermaid/mermaidAPI';
import { setPluginConfig } from '@scullyio/scully';

import { validator } from './validator';
import { getMermaidPlugin } from './index';

describe('validator', () => {
  let options: MermaidAPI.Config;
  let MermaidPlugin: any;

  beforeEach(() => {
    MermaidPlugin = getMermaidPlugin();
    options = {};
  });
  it('should validate something', async () => {
    setPluginConfig(MermaidPlugin, options);
    const validationResult = await validator();
    expect(validationResult.length).toEqual(0);
  });
});
