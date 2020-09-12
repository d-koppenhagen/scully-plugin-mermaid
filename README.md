# scully-plugin-mermaid - The mermaid  `postRenderer`

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
const mermaidOptions: MermaidAPI.Config = {
  theme: 'dark',
};
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

## Example

After running the postRenderer it will convert markdown content like the following into SVG graphics:

<pre class="language-text"><code class="language-text">```mermaid
sequenceDiagram
    Alice ->> Bob: Hello Bob, how are you?
    Bob-->>John: How about you John?
    Bob--x Alice: I am good thanks!
    Bob-x John: I am good thanks!
    Note right of John: Some note.

    Bob-->Alice: Checking with John...
    Alice->John: Yes... John, how are you?
```</code></pre>

The above example will result in a graphic like this one:

<svg id="render" width="100%" xmlns="http://www.w3.org/2000/svg" height="100%" style="max-width:819px" viewBox="-50 -10 819 471"><style>#render{font-family:"trebuchet ms",verdana,arial;font-size:16px;fill:#ccc}#render .error-icon{fill:#a44141}#render .error-text{fill:#ddd;stroke:#ddd}#render .edge-thickness-normal{stroke-width:2px}#render .edge-thickness-thick{stroke-width:3.5px}#render .edge-pattern-solid{stroke-dasharray:0}#render .edge-pattern-dashed{stroke-dasharray:3}#render .edge-pattern-dotted{stroke-dasharray:2}#render .marker{fill:#d3d3d3}#render .marker.cross{stroke:#d3d3d3}#render svg{font-family:"trebuchet ms",verdana,arial;font-size:16px}#render .actor{stroke:#81b1db;fill:#1f2020}#render text.actor&gt;tspan{fill:#d3d3d3;stroke:none}#render .actor-line{stroke:#d3d3d3}#render .messageLine0{stroke-width:1.5;stroke-dasharray:none;stroke:#d3d3d3}#render .messageLine1{stroke-width:1.5;stroke-dasharray:2,2;stroke:#d3d3d3}#render #arrowhead path{fill:#d3d3d3;stroke:#d3d3d3}#render .sequenceNumber{fill:#000}#render #sequencenumber{fill:#d3d3d3}#render #crosshead path{fill:#d3d3d3;stroke:#d3d3d3}#render .messageText{fill:#d3d3d3;stroke:#d3d3d3}#render .labelBox{stroke:#81b1db;fill:#1f2020}#render .labelText,#render .labelText&gt;tspan{fill:#d3d3d3;stroke:none}#render .loopText,#render .loopText&gt;tspan{fill:#d3d3d3;stroke:none}#render .loopLine{stroke-width:2px;stroke-dasharray:2,2;stroke:#81b1db;fill:#81b1db}#render .note{stroke:rgba(255,255,255,.25);fill:#fff5ad}#render .noteText,#render .noteText&gt;tspan{fill:#1f2020;stroke:none}#render .activation0{fill:hsl(180,1.5873015873%,28.3529411765%);stroke:#81b1db}#render .activation1{fill:hsl(180,1.5873015873%,28.3529411765%);stroke:#81b1db}#render .activation2{fill:hsl(180,1.5873015873%,28.3529411765%);stroke:#81b1db}#render:root{--mermaid-font-family:"trebuchet ms",verdana,arial}#render sequence{fill:apa}</style><g></g><g><line id="actor0" x1="75" y1="5" x2="75" y2="460" class="actor-line" stroke-width="0.5px" stroke="#999"></line><rect x="0" y="0" fill="#eaeaea" stroke="#666" width="150" height="65" rx="3" ry="3" class="actor"></rect><text x="75" y="32.5" dominant-baseline="central" alignment-baseline="central" class="actor" style="text-anchor:middle;font-size:14px;font-weight:400;font-family:Open-Sans,sans-serif"><tspan x="75" dy="0">Alice</tspan></text></g><g><line id="actor1" x1="319" y1="5" x2="319" y2="460" class="actor-line" stroke-width="0.5px" stroke="#999"></line><rect x="244" y="0" fill="#eaeaea" stroke="#666" width="150" height="65" rx="3" ry="3" class="actor"></rect><text x="319" y="32.5" dominant-baseline="central" alignment-baseline="central" class="actor" style="text-anchor:middle;font-size:14px;font-weight:400;font-family:Open-Sans,sans-serif"><tspan x="319" dy="0">Bob</tspan></text></g><g><line id="actor2" x1="544" y1="5" x2="544" y2="460" class="actor-line" stroke-width="0.5px" stroke="#999"></line><rect x="469" y="0" fill="#eaeaea" stroke="#666" width="150" height="65" rx="3" ry="3" class="actor"></rect><text x="544" y="32.5" dominant-baseline="central" alignment-baseline="central" class="actor" style="text-anchor:middle;font-size:14px;font-weight:400;font-family:Open-Sans,sans-serif"><tspan x="544" dy="0">John</tspan></text></g><defs><marker id="arrowhead" refX="5" refY="2" markerWidth="6" markerHeight="4" orient="auto"><path d="M 0,0 V 4 L6,2 Z"></path></marker></defs><defs><marker id="crosshead" markerWidth="15" markerHeight="8" orient="auto" refX="16" refY="4"><path fill="black" stroke="#000000" stroke-width="1px" d="M 9,2 V 6 L16,4 Z" style="stroke-dasharray:0,0"></path><path fill="none" stroke="#000000" stroke-width="1px" d="M 0,1 L 6,7 M 6,1 L 0,7" style="stroke-dasharray:0,0"></path></marker></defs><defs><marker id="sequencenumber" refX="15" refY="15" markerWidth="60" markerHeight="40" orient="auto"><circle cx="15" cy="15" r="6"></circle></marker></defs><text x="197" y="80" text-anchor="middle" dominant-baseline="middle" alignment-baseline="middle" class="messageText" dy="1em" style="font-family:&quot;font-weight:400">Hello Bob, how are you?</text><line x1="75" y1="109" x2="319" y2="109" class="messageLine0" stroke-width="2" stroke="none" marker-end="url(#arrowhead)" style="fill:none"></line><text x="432" y="124" text-anchor="middle" dominant-baseline="middle" alignment-baseline="middle" class="messageText" dy="1em" style="font-family:&quot;font-weight:400">How about you John?</text><line x1="319" y1="153" x2="544" y2="153" class="messageLine1" stroke-width="2" stroke="none" marker-end="url(#arrowhead)" style="stroke-dasharray:3,3;fill:none"></line><text x="197" y="168" text-anchor="middle" dominant-baseline="middle" alignment-baseline="middle" class="messageText" dy="1em" style="font-family:&quot;font-weight:400">I am good thanks!</text><line x1="319" y1="197" x2="75" y2="197" class="messageLine1" stroke-width="2" stroke="none" marker-end="url(#crosshead)" style="stroke-dasharray:3,3;fill:none"></line><text x="432" y="212" text-anchor="middle" dominant-baseline="middle" alignment-baseline="middle" class="messageText" dy="1em" style="font-family:&quot;font-weight:400">I am good thanks!</text><line x1="319" y1="241" x2="544" y2="241" class="messageLine0" stroke-width="2" stroke="none" marker-end="url(#crosshead)" style="fill:none"></line><g><rect x="569" y="251" fill="#EDF2AE" stroke="#666" width="150" height="36" rx="0" ry="0" class="note"></rect><text x="644" y="256" text-anchor="middle" dominant-baseline="middle" alignment-baseline="middle" class="noteText" dy="1em" style="font-family:&quot;font-weight:400"><tspan x="644">Some note.</tspan></text></g><text x="197" y="302" text-anchor="middle" dominant-baseline="middle" alignment-baseline="middle" class="messageText" dy="1em" style="font-family:&quot;font-weight:400">Checking with John...</text><line x1="319" y1="331" x2="75" y2="331" class="messageLine1" stroke-width="2" stroke="none" style="stroke-dasharray:3,3;fill:none"></line><text x="310" y="346" text-anchor="middle" dominant-baseline="middle" alignment-baseline="middle" class="messageText" dy="1em" style="font-family:&quot;font-weight:400">Yes... John, how are you?</text><line x1="75" y1="375" x2="544" y2="375" class="messageLine0" stroke-width="2" stroke="none" style="fill:none"></line><g><rect x="0" y="395" fill="#eaeaea" stroke="#666" width="150" height="65" rx="3" ry="3" class="actor"></rect><text x="75" y="427.5" dominant-baseline="central" alignment-baseline="central" class="actor" style="text-anchor:middle;font-size:14px;font-weight:400;font-family:Open-Sans,sans-serif"><tspan x="75" dy="0">Alice</tspan></text></g><g><rect x="244" y="395" fill="#eaeaea" stroke="#666" width="150" height="65" rx="3" ry="3" class="actor"></rect><text x="319" y="427.5" dominant-baseline="central" alignment-baseline="central" class="actor" style="text-anchor:middle;font-size:14px;font-weight:400;font-family:Open-Sans,sans-serif"><tspan x="319" dy="0">Bob</tspan></text></g><g><rect x="469" y="395" fill="#eaeaea" stroke="#666" width="150" height="65" rx="3" ry="3" class="actor"></rect><text x="544" y="427.5" dominant-baseline="central" alignment-baseline="central" class="actor" style="text-anchor:middle;font-size:14px;font-weight:400;font-family:Open-Sans,sans-serif"><tspan x="544" dy="0">John</tspan></text></g></svg>