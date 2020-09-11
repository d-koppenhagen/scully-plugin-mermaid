# scully-plugin-mermaid - The mermaid  `postRenderer`

![Build Status](https://github.com/d-koppenhagen/scully-plugin-mermaid/workflows/Node.js%20CI/badge.svg)
[![npm](https://img.shields.io/npm/v/scully-plugin-mermaid.svg)](https://www.npmjs.com/package/scully-plugin-mermaid)
[![Dependency Status](https://david-dm.org/d-koppenhagen/scully-plugin-mermaid.svg)](https://david-dm.org/d-koppenhagen/scully-plugin-mermaid)
[![devDependency Status](https://david-dm.org/d-koppenhagen/scully-plugin-mermaid/dev-status.svg)](https://david-dm.org/d-koppenhagen/scully-plugin-mermaid?type=dev)

[![npm](https://img.shields.io/npm/l/scully-plugin-mermaid.svg)](https://www.npmjs.com/package/scully-plugin-mermaid)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=102)](https://github.com/ellerbrock/open-source-badge/)

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)

## Installation

To install this library with `npm` run:

```sh
npm i scully-plugin-mermaid --save-dev
```

## Usage

Apply the postRenderer plugin via your scully config file (`scully.<project-name>.config.ts`):

```ts
/*
* The options for mermaid will be passed 1:1
*/
import MermaidAPI from 'mermaid/mermaidAPI';
import { getMermaidPlugin, MermaidPluginName } from 'scully-plugin-mermaid';

/**
 * configuration for the mermaid plugin
 * All params as defined here are valid:
 * https://mermaid-js.github.io/mermaid/getting-started/Setup.html#mermaidapi-configuration-defaults
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
      postRenderers: [MermaidPluginName], // apply the postRenderer
      slug: {
        folder: './blog',
      },
    },
  },
};
```

By default, you don't need to add any options. The defaults from Mermaid will be used [as described in the official docs](https://mermaid-js.github.io/mermaid/getting-started/Setup.html#mermaidapi-configuration-defaults).
You can use any of the described mermaid config parameter.