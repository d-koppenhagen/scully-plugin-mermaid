import { ScullyConfig, setPluginConfig } from '@scullyio/scully';
import MermaidAPI from 'mermaid/mermaidAPI';
import {
  getMermaidPlugin,
  MermaidPluginName,
} from './dist/scully-plugin-mermaid';

/**
 * configuration for the mermaid plugin
 */
const mermaidOptions: MermaidAPI.Config = {};
const MermaidPlugin = getMermaidPlugin();
setPluginConfig(MermaidPlugin, mermaidOptions);

export const config: ScullyConfig = {
  projectRoot: './src',
  projectName: 'scully-mermaid',
  outDir: './dist/static',
  routes: {
    '/blog/:slug': {
      type: 'contentFolder',
      postRenderers: [MermaidPluginName],
      slug: {
        folder: './blog',
      },
    },
  },
};
