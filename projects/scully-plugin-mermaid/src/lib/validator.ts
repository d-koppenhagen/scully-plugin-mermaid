import { getPluginConfig } from '@scullyio/scully';

import { MermaidPluginName } from './constants';
import { MermaidPluginConfig } from './interfaces';

export const validator = async (/* conf */) => {
  const mermaidConfig = getPluginConfig<MermaidPluginConfig>(MermaidPluginName);
  const errors: string[] = [];
  return errors;
};
