import { registerPlugin } from '@scullyio/scully';

import { MermaidPluginName } from './constants';
import { mermaidPlugin } from './mermaid';
import { validator } from './validator';

declare var require: any;

/**
 * register the plugin
 */
registerPlugin('render', MermaidPluginName, mermaidPlugin, validator);

export const getMermaidPlugin = () => MermaidPluginName;
