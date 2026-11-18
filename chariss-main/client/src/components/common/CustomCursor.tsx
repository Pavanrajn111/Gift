import React, { useEffect, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cur = cursorRef.current;
    if (!cur) return;

    const fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
    if (!fine) return;

    document.body.classList.add('hascur');

    const handleMouseMove = (e: MouseEvent) => {
      cur.style.left = `${e.clientX}px`;
      cur.style.top = `${e.clientY}px`;

      const target = e.target as HTMLElement | null;
      const cursorTarget = target?.closest('[data-cursor]') as HTMLElement | null;
      const isButtonOrLink = target?.closest('button, a, input, select');

      if (cursorTarget) {
        cur.className = 'big';
        cur.textContent = cursorTarget.dataset.cursor || '';
      } else if (isButtonOrLink) {
        cur.className = 'cta';
        cur.textContent = '';
      } else {
        cur.className = '';
        cur.textContent = '';
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.classList.remove('hascur');
    };
  }, []);

  return <div id="cur" ref={cursorRef} aria-hidden="true" />;
};
