import { HandledRoute, setPluginConfig } from '@scullyio/scully';

import { getMermaidPlugin } from './index';
import { MermaidPluginConfig } from './interfaces';
import { mermaidPlugin, getSvg } from './mermaid';

describe('mermaidPlugin', () => {
  let defaultHtml: string;
  let defaultMermaidChart: string;
  let mermaidConfig: MermaidPluginConfig;
  let defaultRouteDataConfig: HandledRoute;
  let MermaidPlugin: any;

  beforeEach(() => {
    defaultHtml = `<html><head></head><body>PLACEHOLDER</body></html>`;
    defaultMermaidChart = `
pie
  "Dogs" : 386
  "Cats" : 85
  "Rats" : 15
`;
    defaultRouteDataConfig = {
      route: 'foo',
    };
    mermaidConfig = {};
    MermaidPlugin = getMermaidPlugin();

    const getSvgMock = jest.fn(getSvg);
    getSvgMock.mockReturnValue(Promise.resolve('<svg></svg>'));
  });

  afterEach(() => {
    MermaidPlugin = undefined;
  });

  it('should not render anything when default selector does not match', async () => {
    const testHtml = defaultHtml.replace(
      'PLACEHOLDER',
      `<pre><code>${defaultMermaidChart}</code></pre>`,
    );
    const html = await mermaidPlugin(testHtml, defaultRouteDataConfig);
    expect(html).toEqual(`<html><head></head><body><pre><code>
pie
  "Dogs" : 386
  "Cats" : 85
  "Rats" : 15
</code></pre></body></html>`);
  });
});
