import {
  getPluginConfig,
  HandledRoute,
  log,
  logWarn,
  yellow,
} from '@scullyio/scully';
import { JSDOM } from 'jsdom';
import { renderMermaid } from 'mermaid-render';
import { MermaidPluginName } from './constants';
import { MermaidPluginConfig } from './interfaces';

const defaultSelector = '.language-mermaid';

export const mermaidPlugin = async (html: string, routeData: HandledRoute) => {
  const pluginConfig = getPluginConfig<MermaidPluginConfig>(MermaidPluginName);
  const selector = pluginConfig.selector || defaultSelector;
  let mermaidMatches = 0;
  const route = routeData.route;
  try {
    const dom = new JSDOM(html);
    const { window } = dom;

    const nodeList = window.document.querySelectorAll(selector);
    const elements = [].slice.call(nodeList);

    // count the mermaid matches for logging
    mermaidMatches = elements.length;

    for (let i = 0; i < elements.length; i++) {
      const svgCode = await renderMermaid(elements[i].textContent, {
        initParams: Promise.resolve(pluginConfig.config),
      });
      if (svgCode) {
        const mermaidDivEl = window.document.createElement('div');
        mermaidDivEl.className = 'mermaid-svg';
        mermaidDivEl.innerHTML = svgCode;

        const tagName = nodeList.item(i).tagName;
        if (tagName === 'PRE') {
          nodeList.item(i).replaceWith(mermaidDivEl); // replace the whole `pre`-Element
        } else if (tagName === 'CODE') {
          nodeList.item(i).parentElement.tagName === 'PRE'
            ? nodeList.item(i).parentElement.replaceWith(mermaidDivEl) // replace the whole parent `pre`-Element
            : nodeList.item(i).replaceWith(mermaidDivEl); // replace the `code`-Element
        } else {
          logWarn(
            `Selector '${yellow(
              selector,
            )}' matches neither a 'pre' nor a 'code' element. Can't render / insert graphic.`,
          );
        }
      }
    }

    log(`Rendered ${mermaidMatches} Mermaid SVGs`);
    return Promise.resolve(dom.serialize());
  } catch (e) {
    logWarn(`error in mermaidPlugin, didn't handle route '${yellow(route)}'`);
  }
  // in case of failure return unchanged HTML to keep flow going
  return Promise.resolve(html);
};
