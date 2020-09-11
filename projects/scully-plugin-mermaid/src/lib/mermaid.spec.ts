import { HandledRoute, setPluginConfig } from '@scullyio/scully';
import MermaidAPI from 'mermaid/mermaidAPI';

import { getMermaidPlugin } from './index';
import { mermaidPlugin } from './mermaid';

describe('mermaidPlugin', () => {
  let defaultValidHtml: string;
  let defaultRouteDataConfig: HandledRoute;
  let mermaidConfig: MermaidAPI.Config;
  let MermaidPlugin: any;

  beforeEach(() => {
    defaultValidHtml = `<body>
  <h1>Before Blog Main Content</h1>
  <div class="blog">
    <p>Some content before headings</p>
    <div id="mermaid"></div>
    <h1 id="h1-1">H1-1</h1>
    <p>foo</p>
    <h2 id="h2-1">H2-1</h2>
    <span>bar</span>
    <h3 id="h3-1">H3-1</h3>
    baz
    <h4 id="h4-1">H4-1</h4>
    <h5 id="h5-1">H5-1</h5>
    <h6 id="h6-1">H6-1</h6>
    <h4 id="h4-2">H4-2</h4>
    <h1 id="h1-2">H1-2</h1>
    <h2 id="h2-2">H2-2</h2>
  </div>
</body>`;

    defaultRouteDataConfig = {
      type: '',
      route: '/foo/bar',
      data: {
        language: 'de',
      },
    };

    mermaidConfig = {};
    MermaidPlugin = getMermaidPlugin();
  });
  it('should return the HTML including mermaid by respecting the configured options', async () => {
    const html = await mermaidPlugin(defaultValidHtml, defaultRouteDataConfig);
    expect(html).toEqual('');
  });
});
