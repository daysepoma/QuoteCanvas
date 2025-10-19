"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Download, Share2, Twitter, Facebook, Instagram, Upload } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export interface QuoteDetails {
  book: string;
  phrase: string;
  username: string;
}

interface TextStyle {
  fontSize: number;
  color: string;
  fontFamily: string;
}

export type BackgroundEffect = 'none' | 'blur' | 'grain' | 'radial-shadow' | 'darkOverlay';
export type ContainerStyle = 'portrait' | 'square' | 'landscape' | 'reel';

export interface StyleDetails {
  book: TextStyle;
  phrase: TextStyle;
  username: TextStyle;
  background: string;
  backgroundImage: string;
  backgroundEffect: BackgroundEffect;
  containerStyle: ContainerStyle;
}

interface QuoteFormProps {
  details: QuoteDetails;
  setDetails: Dispatch<SetStateAction<QuoteDetails>>;
  styles: StyleDetails;
  setStyles: Dispatch<SetStateAction<StyleDetails>>;
  onDownload: () => void;
  onShare: () => void;
}

const FontSelect = ({ value, onValueChange }: { value: string, onValueChange: (value: string) => void }) => (
    <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger>
            <SelectValue placeholder="Select a font" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="Playfair Display">Playfair Display</SelectItem>
            <SelectItem value="Cormorant Garamond">Cormorant Garamond</SelectItem>
            <SelectItem value="Inter">Inter</SelectItem>
            <SelectItem value="Roboto">Roboto</SelectItem>
            <SelectItem value="Times New Roman">Times New Roman</SelectItem>
            <SelectItem value="Dancing Script">Dancing Script (Relatable)</SelectItem>
            <SelectItem value="Cormorant SC">Cormorant SC</SelectItem>
            <SelectItem value="EB Garamond">EB Garamond (Times New Roman)</SelectItem>
        </SelectContent>
    </Select>
);


export function QuoteForm({ details, setDetails, styles, setStyles, onDownload, onShare }: QuoteFormProps) {

  const handleDetailChange = (field: keyof QuoteDetails, value: string) => {
    setDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleStyleChange = (element: keyof Omit<StyleDetails, 'background' | 'backgroundImage' | 'backgroundEffect' | 'containerStyle'>, property: keyof TextStyle, value: string | number) => {
    setStyles(prev => ({
      ...prev,
      [element]: {
        ...prev[element],
        [property]: value
      }
    }));
  };
  
  const handleGenericStyleChange = (field: 'background' | 'backgroundImage' | 'backgroundEffect' | 'containerStyle', value: string) => {
    setStyles(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setStyles(prev => ({ ...prev, backgroundImage: event.target.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">QuoteCanvas</CardTitle>
        <CardDescription>Design your social media quote card.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="content">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="customize">Customize</TabsTrigger>
          </TabsList>
          <TabsContent value="content" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="book">Book / Author</Label>
              <Input id="book" value={details.book} onChange={(e) => handleDetailChange('book', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phrase">Quote</Label>
              <Textarea id="phrase" value={details.phrase} onChange={(e) => handleDetailChange('phrase', e.target.value)} rows={4} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" value={details.username} onChange={(e) => handleDetailChange('username', e.target.value)} />
            </div>
          </TabsContent>
          <TabsContent value="customize" className="pt-4">
            <Accordion type="single" collapsible defaultValue="phrase" className="w-full">
              <AccordionItem value="general">
                <AccordionTrigger>General Styles</AccordionTrigger>
                <AccordionContent className="space-y-4 pt-2">
                  <div className="space-y-2">
                    <Label>Container Style</Label>
                    <Select value={styles.containerStyle} onValueChange={(value) => handleGenericStyleChange('containerStyle', value as ContainerStyle)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a container style" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="portrait">Social Post (Portrait)</SelectItem>
                            <SelectItem value="square">Square Post</SelectItem>
                            <SelectItem value="landscape">Landscape Post</SelectItem>
                            <SelectItem value="reel">Reel / Story</SelectItem>
                        </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Background Color</Label>
                    <Input type="color" value={styles.background} onChange={(e) => handleGenericStyleChange('background', e.target.value)} className="w-16 h-10 p-1" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bg-image-upload">Background Image</Label>
                    <div className="flex gap-2">
                      <Input id="bg-image-upload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                      <Label htmlFor="bg-image-upload" className="flex-1">
                        <Button asChild className="w-full" variant="outline">
                          <div>
                            <Upload className="mr-2 h-4 w-4" />
                            Choose Image
                          </div>
                        </Button>
                      </Label>
                    </div>
                  </div>
                   {styles.backgroundImage && (
                     <div className="space-y-2">
                       <Label>Background Effect</Label>
                       <Select value={styles.backgroundEffect} onValueChange={(value) => handleGenericStyleChange('backgroundEffect', value as BackgroundEffect)}>
                           <SelectTrigger>
                               <SelectValue placeholder="Select an effect" />
                           </SelectTrigger>
                           <SelectContent>
                               <SelectItem value="none">None</SelectItem>
                               <SelectItem value="blur">Blur</SelectItem>
                               <SelectItem value="grain">Grainy Texture</SelectItem>
                               <SelectItem value="radial-shadow">Radial Shadow</SelectItem>
                               <SelectItem value="darkOverlay">Dark Overlay</SelectItem>
                           </SelectContent>
                       </Select>
                     </div>
                   )}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="book">
                <AccordionTrigger>Book / Author</AccordionTrigger>
                <AccordionContent className="space-y-4 pt-2">
                    <div className="space-y-2">
                      <Label>Font Family</Label>
                      <FontSelect value={styles.book.fontFamily} onValueChange={(value) => handleStyleChange('book', 'fontFamily', value)} />
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex-1 space-y-2">
                          <Label>Size (px)</Label>
                          <Input type="number" value={styles.book.fontSize} onChange={(e) => handleStyleChange('book', 'fontSize', parseInt(e.target.value))} />
                        </div>
                        <div className="space-y-2">
                          <Label>Color</Label>
                          <Input type="color" value={styles.book.color} onChange={(e) => handleStyleChange('book', 'color', e.target.value)} className="w-16 h-10 p-1"/>
                        </div>
                    </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="phrase">
                <AccordionTrigger>Quote</AccordionTrigger>
                <AccordionContent className="space-y-4 pt-2">
                    <div className="space-y-2">
                      <Label>Font Family</Label>
                      <FontSelect value={styles.phrase.fontFamily} onValueChange={(value) => handleStyleChange('phrase', 'fontFamily', value)} />
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex-1 space-y-2">
                            <Label>Size (px)</Label>
                            <Input type="number" value={styles.phrase.fontSize} onChange={(e) => handleStyleChange('phrase', 'fontSize', parseInt(e.target.value))} />
                        </div>
                        <div className="space-y-2">
                            <Label>Color</Label>
                            <Input type="color" value={styles.phrase.color} onChange={(e) => handleStyleChange('phrase', 'color', e.target.value)} className="w-16 h-10 p-1"/>
                        </div>
                    </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="username">
                <AccordionTrigger>Username</AccordionTrigger>
                <AccordionContent className="space-y-4 pt-2">
                    <div className="space-y-2">
                      <Label>Font Family</Label>
                      <FontSelect value={styles.username.fontFamily} onValueChange={(value) => handleStyleChange('username', 'fontFamily', value)} />
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex-1 space-y-2">
                            <Label>Size (px)</Label>
                            <Input type="number" value={styles.username.fontSize} onChange={(e) => handleStyleChange('username', 'fontSize', parseInt(e.target.value))} />
                        </div>
                        <div className="space-y-2">
                            <Label>Color</Label>
                            <Input type="color" value={styles.username.color} onChange={(e) => handleStyleChange('username', 'color', e.target.value)} className="w-16 h-10 p-1"/>
                        </div>
                    </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex-col gap-4 items-stretch pt-4">
        <Button onClick={onDownload} size="lg">
          <Download className="mr-2 h-4 w-4" />
          Download Image
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="w-full" onClick={onShare}>
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button variant="ghost" size="icon" disabled><Instagram className="h-5 w-5"/></Button>
          <Button variant="ghost" size="icon" disabled><Twitter className="h-5 w-5"/></Button>
          <Button variant="ghost" size="icon" disabled><Facebook className="h-5 w-5"/></Button>
        </div>
      </CardFooter>
    </Card>
  );
}
