import Markdoc from '@markdoc/markdoc';
import content from './the-poor-tax.md';

const html = Markdoc.renderers.html(content);
