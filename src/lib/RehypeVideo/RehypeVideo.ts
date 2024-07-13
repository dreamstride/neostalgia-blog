import type { Plugin } from 'unified';
import type { Root, Element } from 'hast';
import { visit } from 'unist-util-visit';
import { detailsNode } from './detailsNode';

export type RehypeVideoOptions = {
  /**
   * URL suffix verification.
   * @default /\/(.*)(.mp4|.mov)$/
   */
  test?: RegExp;
}

function isValidURL(string: string) {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
}

const properties = { controls: 'controls' };
const queryStringToObject = (url: string): Record<string, string> => {
    const params = new URLSearchParams(url.split('?')[1]);
    const result: Record<string, string> = {};
  
    params.forEach((value, key) => {
      result[key] = value;
    });
  
    return result;
  };
  

function reElement(node: Element, href: string) {
  const url = isValidURL(href.trim()) ? new URL(href) : null;
  const pathname = url?.pathname || href;
  const filename = pathname.split('/').pop()?.replace(/(\?|!|\#|$).+/, '');
  const params = queryStringToObject(href.replace(/\?\!/, "?").replace(/\?\!\#/, "?"));
  const { title = filename } = params;

  let newNode: Element = {
    type: 'element',
    tagName: 'video',
    children: [],
    properties: {...properties, src: url?.toString() || href }
  };

  newNode.tagName = 'video';
  newNode.children = [];
  newNode.properties = { ...properties, src: url?.toString() || href };

  node.tagName = 'p';
  node.children = [newNode]

  // const reNode = detailsNode(title);
  // reNode.children.push({ ...node });
  // node.children = reNode.children;
  // node.tagName = reNode.tagName;
  // node.properties = reNode.properties;
}

const RehypeVideo: Plugin<[RehypeVideoOptions?], Root> = (options) => {
  const { test = /\/(.*)(.mp4|.mov)$/, } = options || {};
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      const isChecked = (str: string) => test.test(str.replace(/(\?|!|\#|$).+/g, '').toLocaleLowerCase())
      const child = node.children[0];

      if (node.tagName === 'p' && node.children.length === 1) {
        if (child.type === 'text' && isValidURL(child.value) && isChecked(child.value)) {
          reElement(node, child.value);
        }
        if (child.type === 'element' && child.tagName === 'a' && child.properties && typeof child.properties.href === 'string' && isChecked(child.properties.href)) {
          reElement(node, child.properties.href);
        }
      }
    });
  }
}

export default RehypeVideo;