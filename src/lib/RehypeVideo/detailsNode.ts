import type { Element } from 'hast';

export function detailsNode(title?: string): Element {
    return {
        type: 'element',
        tagName: 'details',
        properties: { open: true, className: 'octicon octicon-video' },
        children: [
            {
                type: 'element',
                tagName: 'summary',
                properties: {},
                children: [
                    {
                        type: 'element',
                        tagName: 'span',
                        properties: {
                            'aria-label': `Video description ${title || ''}`
                        },
                        children: [
                            {
                                type: 'text',
                                value: title || ''
                            }
                        ]
                    },
                    {
                        type: 'element',
                        tagName: 'span',
                        properties: {
                            className: 'dropdown-caret'
                        },
                        children: []
                    }
                ]
            }
        ]
    }
}