'use client';

import * as React from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '#/lib/utils';

gsap.registerPlugin(ScrollTrigger);

export interface TypographyRevealProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  /** The content to reveal. Can be a string or any valid ReactNode. */
  children: React.ReactNode;
  /**
   * The unit by which to reveal the text.
   * @default 'word'
   */
  revealType?: 'word' | 'line' | 'character';
  /**
   * The visual style of the reveal animation.
   * @default 'fadeInUp'
   */
  animationType?: 'fadeInUp' | 'blurIn' | 'flipIn' | 'colorizeIn';
  /**
   * The starting direction for the 'fadeInUp' animation.
   * @default 'bottom'
   */
  fromDirection?: 'top' | 'bottom' | 'left' | 'right';
  /** The initial color for the 'colorizeIn' animation. */
  mutedColor?: string;
  /**
   * The duration of the animation for each unit, in seconds.
   * @default 0.5
   */
  duration?: number;
  /**
   * The delay between each unit's animation, in seconds.
   * @default 0.04
   */
  stagger?: number;
  /**
   * The ScrollTrigger start position.
   * @default 'top 85%'
   */
  start?: string;
  /**
   * The ScrollTrigger end position. Most relevant for scrub animations.
   * @default 'bottom 50%'
   */
  end?: string;
  /**
   * The GSAP ease function for the animation.
   * @default 'power3.out'
   */
  ease?: string;
}

/**
 * A component that reveals text content unit-by-unit as it scrolls into view,
 * using GSAP for a variety of animation effects.
 */
const TypographyReveal = React.forwardRef<
  HTMLParagraphElement,
  TypographyRevealProps
>(
  (
    {
      children,
      className,
      revealType = 'word',
      animationType = 'fadeInUp',
      fromDirection = 'bottom',
      mutedColor = 'var(--muted)',
      duration = 0.5,
      stagger = 0.04,
      start = 'top 85%',
      end = 'bottom 50%',
      ease = 'power3.out',
      ...props
    },
    ref
  ) => {
    const containerRef = React.useRef<HTMLParagraphElement>(null);
    const internalRef = ref || containerRef;
    const textToRender = React.Children.toArray(children).join('');

    useGSAP(
      () => {
        const targets = {
          word: '.reveal-word',
          line: '.reveal-line',
          character: '.reveal-character',
        }[revealType];
        const elements = gsap.utils.toArray(targets, containerRef.current);

        if (elements.length === 0) return;

        // DECISION: The 'colorizeIn' animation is a special case. It's a scroll-linked
        // (scrub) animation, unlike the others which are "fire-and-forget."
        // It requires a separate GSAP timeline for direct control via scroll position.
        if (animationType === 'colorizeIn') {
          gsap.set(elements, { color: mutedColor });
          gsap.to(elements, {
            color: 'inherit',
            stagger: stagger,
            // An ease of 'none' provides a direct, linear mapping between scroll
            // progress and animation progress, which is ideal for scrubbing.
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: start,
              end: end,
              scrub: true,
            },
          });
          return;
        }

        const animationVars: gsap.TweenVars = {
          opacity: 1,
          duration,
          ease,
          stagger,
          scrollTrigger: {
            trigger: containerRef.current,
            start: start,
            once: true,
          },
        };

        switch (animationType) {
          case 'blurIn':
            animationVars.filter = 'blur(0px)';
            break;
          case 'flipIn':
            animationVars.rotateX = 0;
            break;
          case 'fadeInUp':
          default:
            if (fromDirection === 'left' || fromDirection === 'right') {
              animationVars.x = 0;
            } else {
              animationVars.y = 0;
            }
            break;
        }
        gsap.to(elements, animationVars);
      },
      {
        scope: containerRef,
        dependencies: [
          textToRender,
          revealType,
          animationType,
          fromDirection,
          end,
        ],
      }
    );

    const getPreAnimationClasses = () => {
      if (animationType === 'colorizeIn') return '';
      let classes = 'opacity-0 will-change-transform,opacity,filter';
      switch (animationType) {
        case 'blurIn':
          return (classes += ' blur-md');
        case 'flipIn':
          return (classes +=
            ' [transform:rotateX(-90deg)] [transform-origin:bottom_center]');
        case 'fadeInUp':
        default:
          switch (fromDirection) {
            case 'top':
              return (classes += ' -translate-y-full');
            case 'left':
              return (classes += ' -translate-x-full');
            case 'right':
              return (classes += ' translate-x-full');
            case 'bottom':
            default:
              return (classes += ' translate-y-full');
          }
      }
    };

    const renderContent = () => {
      const preAnimationClasses = getPreAnimationClasses();
      const unitClass = `inline-block ${preAnimationClasses}`;
      const lineUnitClass = `block ${preAnimationClasses}`;

      switch (revealType) {
        case 'character':
          return textToRender.split('').map((char, i) => (
            <span
              key={i}
              // This wrapper span with overflow-hidden acts as a mask, ensuring
              // the reveal effect is clean and contained.
              className={cn('inline-block', {
                'overflow-hidden': animationType !== 'colorizeIn',
              })}
            >
              <span className={`reveal-character ${unitClass}`}>
                {/* Use a non-breaking space to prevent layout shifts. */}
                {char === ' ' ? '\u00A0' : char}
              </span>
            </span>
          ));
        case 'line':
          return textToRender.split('\n').map((line, i) => (
            <span
              key={i}
              className={cn('block', {
                'overflow-hidden': animationType !== 'colorizeIn',
              })}
            >
              <span className={`reveal-line ${lineUnitClass}`}>
                {line.trim() === '' ? '\u00A0' : line}
              </span>
            </span>
          ));
        case 'word':
        default:
          return textToRender.split(' ').map((word, i) => (
            <React.Fragment key={i}>
              <span
                className={cn('inline-block', {
                  'overflow-hidden': animationType !== 'colorizeIn',
                })}
              >
                <span className={`reveal-word ${unitClass}`}>{word}</span>
              </span>
              {/* Add a non-breaking space between words. */}
              {i < textToRender.split(' ').length - 1 && '\u00A0'}
            </React.Fragment>
          ));
      }
    };

    return (
      <p
        ref={internalRef}
        className={cn(
          'text-left',
          // The 'flipIn' animation requires a 3D perspective context
          // on the parent container to render correctly.
          { '[perspective:800px]': animationType === 'flipIn' },
          className
        )}
        {...props}
        aria-label={textToRender}
      >
        {renderContent()}
      </p>
    );
  }
);
TypographyReveal.displayName = 'TypographyReveal';

export { TypographyReveal };
