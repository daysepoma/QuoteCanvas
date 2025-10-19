"use client";

import { forwardRef } from 'react';
import type { QuoteDetails, StyleDetails } from './quote-form';
import { cn } from '@/lib/utils';

interface QuotePreviewProps {
  details: QuoteDetails;
  styles: StyleDetails;
}

const aspectRatios: { [key in StyleDetails['containerStyle']]: string } = {
  portrait: '1080 / 1350',
  square: '1 / 1',
  landscape: '16 / 9',
  reel: '9 / 16',
};

export const QuotePreview = forwardRef<HTMLDivElement, QuotePreviewProps>(
  ({ details, styles }, ref) => {
    const hasBackgroundImage = !!styles.backgroundImage;

    // We now render the preview at the visual size, and use pixelRatio to scale it up on export.
    const containerWidth = 540;
    const containerHeight = containerWidth / (eval(aspectRatios[styles.containerStyle]) || 1);

    // Adjust font sizes based on the container width for responsive scaling.
    const scaleFactor = containerWidth / 1080;
    const scaledStyles = {
      book: { ...styles.book, fontSize: styles.book.fontSize * scaleFactor },
      phrase: { ...styles.phrase, fontSize: styles.phrase.fontSize * scaleFactor },
      username: { ...styles.username, fontSize: styles.username.fontSize * scaleFactor },
    };
    const scaledPadding = 16 * scaleFactor;


    return (
        <div
          ref={ref}
          style={{ 
            backgroundColor: styles.background,
            width: `${containerWidth}px`,
            height: `${containerHeight}px`,
          }}
          className="relative"
        >
          {hasBackgroundImage && (
            <div
              style={{ 
                  backgroundImage: `url(${styles.backgroundImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
              }}
              className={cn(
                "absolute inset-0 z-0",
                styles.backgroundEffect === 'blur' && 'filter blur-sm',
              )}
            />
          )}
          {hasBackgroundImage && styles.backgroundEffect === 'grain' && (
            <div
              className="absolute inset-0 z-0 pointer-events-none"
              style={{
                backgroundImage: `
                  radial-gradient(circle, rgba(0,0,0,0.05) 1px, transparent 1px),
                  radial-gradient(circle, rgba(0,0,0,0.03) 1px, transparent 1px),
                  radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 2px)
                `,
                backgroundSize: '2px 2px, 3px 3px, 4px 4px',
                mixBlendMode: 'multiply',
                opacity: 0.55,
                filter: 'contrast(130%) brightness(105%)'
              }}
            />
          )}
          {hasBackgroundImage && styles.backgroundEffect === 'radial-shadow' && <div className="absolute inset-0 z-0" style={{background: 'radial-gradient(circle, transparent 50%, black 120%)'}} />}
          {hasBackgroundImage && styles.backgroundEffect === 'darkOverlay' && (
            <div
              className="absolute inset-0 z-0 pointer-events-none"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 20% 30%, rgba(0,0,0,0.5), transparent 70%),
                  radial-gradient(circle at 80% 70%, rgba(0,0,0,0.4), transparent 70%),
                  linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55))
                `,
                backgroundSize: '100% 100%',
                mixBlendMode: 'multiply',
                opacity: 0.85,
                filter: 'contrast(120%) brightness(90%)'
              }}
            />
          )}
          {hasBackgroundImage && <div className="absolute inset-0 z-0 bg-black/10" />}

          <div 
              className="relative z-10 h-full w-full"
              style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: `${scaledPadding * 4}px`,
              }}
          >
              <div 
                  className="w-full text-center"
                  style={{ 
                    fontSize: `${scaledStyles.book.fontSize}px`, 
                    color: styles.book.color,
                    fontFamily: `'${styles.book.fontFamily}', serif`
                  }}
              >
                {details.book}
              </div>
              <div 
                className="w-full max-w-[85%] text-center"
                style={{ 
                  fontSize: `${scaledStyles.phrase.fontSize}px`, 
                  color: styles.phrase.color,
                  fontWeight: 400,
                  lineHeight: 1.4,
                  fontFamily: `'${styles.phrase.fontFamily}', serif`
                }}
              >
                “{details.phrase}”
              </div>
              <div 
                className="w-full text-center"
                style={{ 
                  fontSize: `${scaledStyles.username.fontSize}px`, 
                  color: styles.username.color,
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                  fontFamily: `'${styles.username.fontFamily}', serif`
                }}
              >
                {details.username}
              </div>
          </div>
        </div>
    );
  }
);

QuotePreview.displayName = 'QuotePreview';
