import MermaidAPI from 'mermaid/mermaidAPI';

export interface MermaidPluginConfig {
  selector: string;
  wrapper: ElementWrapper | boolean;
  config: MermaidAPI.Config;
}

export interface ElementWrapper {
  tagName: string;
  classNames?: string[];
}
