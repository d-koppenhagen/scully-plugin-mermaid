import { getPluginConfig } from '@scullyio/scully';
import MermaidAPI from 'mermaid/mermaidAPI';

import { MermaidPluginName } from './constants';

export const validator = async (/* conf */) => {
  const mermaidConfig = getPluginConfig<MermaidAPI.Config>(MermaidPluginName);
  const errors: string[] = [];
  return errors;
};
