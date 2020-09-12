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
import MermaidAPI from 'mermaid/mermaidAPI';

export const mermaidPlugin = async (html: string, routeData: HandledRoute) => {
  const mermaidConfig = getPluginConfig<MermaidAPI.Config>(MermaidPluginName);
  let mermaidMatches = 0;
  const route = routeData.route;
  try {
    // TODO: try to modify and return updated HTML
    const dom = new JSDOM(html);
    const { window } = dom;

    const elements = [].slice.call(
      window.document.querySelectorAll('.language-mermaid'),
    );

    mermaidMatches = elements.length;

    for (const el of elements) {
      const svgCode = await renderMermaid(el.textContent, {
        initParams: Promise.resolve(mermaidConfig),
      });
      /*
      const mermaidDivEl = window.document.createElement('div');
      mermaidDivEl.className = 'mermaid-svg';
      mermaidDivEl.innerHTML = svgCode;
      nodeList.item(i).parentElement.replaceWith(mermaidDivEl);
      */
      el.innerHTML = svgCode;
    }
    log(`Rendered ${mermaidMatches} Mermaid SVGs`);
    return Promise.resolve(dom.serialize());
  } catch (e) {
    logWarn(`error in mermaidPlugin, didn't handle route '${yellow(route)}'`);
  }
  // in case of failure return unchanged HTML to keep flow going
  return Promise.resolve(html);
};
