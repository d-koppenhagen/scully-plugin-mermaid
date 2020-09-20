import MermaidAPI from 'mermaid/mermaidAPI';

export interface MermaidPluginConfig {
  selector: string;
  config: MermaidAPI.Config;
}
