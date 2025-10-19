"use client";

import { useState, useRef, useCallback } from 'react';
import { toPng } from 'html-to-image';
import { QuoteForm, type QuoteDetails, type StyleDetails } from '@/components/quote-form';
import { QuotePreview } from '@/components/quote-preview';
import { useToast } from '@/hooks/use-toast';

export default function Home() {
  const { toast } = useToast();
  const [details, setDetails] = useState<QuoteDetails>({
    book: "Joe Dispenza · Deja de ser tú",
    phrase: "¿Sabías que tu mente no distingue entre lo que imaginas y lo real?",
    username: "usermame",
  });

  const [styles, setStyles] = useState<StyleDetails>({
    book: {
      fontSize: 30,
      color: '#333333',
      fontFamily: 'Times New Roman',
    },
    phrase: {
      fontSize: 50,
      color: '#222222',
      fontFamily: 'EB Garamond',
    },
    username: {
      fontSize: 26,
      color: '#777777',
      fontFamily: 'Cormorant SC',
    },
    background: '#F8F6F2',
    backgroundImage: '',
    backgroundEffect: 'none',
    containerStyle: 'portrait',
  });

  const previewRef = useRef<HTMLDivElement>(null);

  const generateBlob = useCallback(async (): Promise<Blob | null> => {
    if (previewRef.current === null) {
      return null;
    }
    
    try {
      const dataUrl = await toPng(previewRef.current, { 
        cacheBust: true,
        pixelRatio: 2, // Capture at 2x resolution (540px * 2 = 1080px)
        fetchRequestInit: {
          mode: 'cors',
          credentials: 'omit'
        },
      });
      const res = await fetch(dataUrl);
      return await res.blob();
    } catch (err) {
      console.error('Oops, something went wrong!', err);
      toast({
        title: "Error generating image",
        description: "Could not generate the image. Please try again.",
        variant: "destructive",
      });
      return null;
    }
  }, [previewRef, toast]);

  const handleDownload = useCallback(async () => {
    const blob = await generateBlob();
    if (blob) {
      const dataUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = 'quote-canvas.png';
      link.href = dataUrl;
      link.click();
      URL.revokeObjectURL(dataUrl);
    }
  }, [generateBlob]);

  const handleShare = useCallback(async () => {
    const blob = await generateBlob();
    if (!blob) return;

    const file = new File([blob], "quote-canvas.png", { type: "image/png" });
    const shareData = {
      files: [file],
      title: 'My Quote',
    };

    if (navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // Handle share error, e.g., user cancelled
        if ((err as Error).name !== 'AbortError') {
          console.error("Share failed:", err);
           toast({
            title: "Sharing failed",
            description: "Could not share the image. Please try again.",
            variant: "destructive",
          });
        }
      }
    } else {
       try {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        toast({
          title: "Copied to clipboard",
          description: "Image copied to clipboard successfully.",
        });
      } catch (err) {
        console.error('Failed to copy to clipboard', err);
        toast({
          title: "Failed to copy",
          description: "Could not copy image to clipboard. Please use the download button.",
          variant: "destructive",
        });
      }
    }
  }, [generateBlob, toast]);


  const aspectRatios: { [key in StyleDetails['containerStyle']]: number } = {
    portrait: 1080 / 1350,
    square: 1 / 1,
    landscape: 16 / 9,
    reel: 9 / 16,
  };

  const previewWidth = 540;
  const previewHeight = previewWidth / aspectRatios[styles.containerStyle];


  return (
  <main className="min-h-screen bg-muted/30 p-4 sm:p-6 lg:p-8 flex items-center">
    <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-8 lg:grid-cols-3 xl:gap-12 items-start justify-center">
    <div className="lg:col-span-1 flex items-start justify-center">
      <div className="sticky top-8 w-full max-w-md mx-auto">
        <QuoteForm
          details={details}
          setDetails={setDetails}
          styles={styles}
          setStyles={setStyles}
          onDownload={handleDownload}
          onShare={handleShare}
        />
      </div>
    </div>


      <div className="lg:col-span-2 flex flex-col items-center justify-center">
        <div
          className="shadow-2xl rounded-xl overflow-hidden bg-white"
          style={{
            width: `${previewWidth}px`,
            height: `${previewHeight}px`,
          }}
        >
          <div
            ref={previewRef}
            style={{
              width: `${previewWidth}px`,
              height: `${previewHeight}px`,
            }}
          >
            <QuotePreview details={details} styles={styles} />
          </div>
        </div>
      </div>
    </div>
  </main>
  );
}
