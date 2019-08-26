import { useEffect } from 'react';

/**
 * @param {string} containerClass
 * @param {string} stickyClass
 * @param {number} offset
 */
export default function useStickyTracer(containerClass, stickyClass, topOffset) {
  /**
   * This hook will append and remove a className "sticky" to
   * the node(stickyClass) which has less topOffset value but the nearest
   * from the topOffset parameter.
   */
  useEffect(() => {
    const container = document.querySelector(containerClass);

    function checkHeaders() {
      const headers = Array.from(document.querySelectorAll(stickyClass));
      if (headers.length > 0) {
        headers.forEach(node => node.classList.remove('sticky'));
        const topNode = headers.filter(a => a.getBoundingClientRect().top < topOffset);
        topNode[topNode.length - 1].classList.add('sticky');
      }
    }
    container.addEventListener('scroll', () => checkHeaders());

    return container.removeEventListener('scroll', () => checkHeaders);
  });
}
