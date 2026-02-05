import classNames from 'classnames';
import { extendTailwindMerge, twMerge } from 'tailwind-merge';

const customTwMerge = extendTailwindMerge({
  // Add a custom class group for background images
  extend: {
    classGroups: {
      'bg-image': [{ 'bg-image': ['none', 'url(', 'gradient']}], // Adjust values as per your config
    },
  }
});

/**
 * Combines class names from multiple arguments into a single string, removing duplicates
 * and merging Tailwind CSS classes intelligently.
 *
 * @param {...classNames.ArgumentArray} classes - A list of arguments that can include strings, arrays, or objects
 *        representing CSS class names to be combined.
 * @return {string} A single string of combined class names.
 */
function cn (...classes: classNames.ArgumentArray): string {
  return customTwMerge(classNames(...classes));
}

export { cn };
export default cn;
