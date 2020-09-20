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
import { ElementWrapper, MermaidPluginConfig } from './interfaces';

const defaultSelector = '.language-mermaid';
const defaultWrapper: ElementWrapper = {
  tagName: 'div',
  classNames: ['mermaid-svg'],
};

export const mermaidPlugin = async (html: string, routeData: HandledRoute) => {
  const pluginConfig = getPluginConfig<MermaidPluginConfig>(MermaidPluginName);
  const selector = pluginConfig.selector || defaultSelector;
  let useWrapper = true;
  let wrapper: ElementWrapper = defaultWrapper;

  if (pluginConfig.wrapper === false) {
    useWrapper = false;
  }

  if (
    typeof pluginConfig.wrapper === 'object' &&
    pluginConfig.wrapper.tagName
  ) {
    wrapper = pluginConfig.wrapper;
  }

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
        initParams: Promise.resolve(pluginConfig.config || {}),
      });
      if (svgCode) {
        let mermaidTargetEl: Element;
        if (!useWrapper) {
          const templateEl = window.document.createElement('template');
          templateEl.innerHTML = svgCode.trim();
          mermaidTargetEl = templateEl.content.firstElementChild;
        } else {
          mermaidTargetEl = window.document.createElement(
            wrapper.tagName.toLowerCase(),
          );
          if (wrapper.classNames.length) {
            mermaidTargetEl.className = wrapper.classNames.join(' ');
          }
          mermaidTargetEl.innerHTML = svgCode;
        }

        const tagName = nodeList.item(i).tagName;
        if (tagName === 'PRE') {
          nodeList.item(i).replaceWith(mermaidTargetEl); // replace the whole `pre`-Element
        } else if (tagName === 'CODE') {
          nodeList.item(i).parentElement.tagName === 'PRE'
            ? nodeList.item(i).parentElement.replaceWith(mermaidTargetEl) // replace the whole parent `pre`-Element
            : nodeList.item(i).replaceWith(mermaidTargetEl); // replace the `code`-Element
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
