/**
 * A controlled set of custom attributes used across UI components.
 * If an attribute is on this list, it will be prefixed with `data-`.
 * Otherwise, it's treated as a standard HTML attribute and passed through as-is.
 */
export const customAttributes = new Set([
  // layout components (Checked & Verified)
  'nogap',
  'no-gap', // Used in Box/Stack
  'intrinsic',
  'center',
  'end',
  'between',
  'around',
  'evenly',
  'narrow',
  'wide',
  'recursive',
  'compact',
  'spaced',
  'reverse',
  // default colors (Reserved for Primitives)
  'primary',
  'accent',
  'success',
  'warning',
  'danger',
  'info',
  'neutral',
]);

/**
 * Processes an attributes object. If an attribute is in the `customAttributes` list,
 * it gets prefixed with `data-`. Otherwise, it is passed through as a standard attribute.
 * Attributes already starting with `data-` are also passed through.
 *
 * @param {Record<string, unknown>} attrs - Attributes to be processed.
 * @returns {Record<string, unknown>} A new object of processed attributes.
 */
export const processedAttrs = (
  attrs: Record<string, unknown>,
): Record<string, unknown> => {
  const newAttrs: Record<string, unknown> = {};
  for (const key in attrs) {
    if (customAttributes.has(key) && !key.startsWith('data-')) {
      newAttrs[`data-${key}`] = attrs[key];
    } else {
      newAttrs[key] = attrs[key];
    }
  }
  return newAttrs;
};
