// ✅ لا يحتاج 'use client' — الـ parent (GalleryClient) هو Client Component
import Image from 'next/image';
import { X } from 'lucide-react';
import type { GalleryItem } from '../types/gallery.types';

interface LightboxModalProps {
  item: GalleryItem;
  closeLabel: string;
  onClose: () => void;
}

export const LightboxModal = ({ item, closeLabel, onClose }: LightboxModalProps) => (
  <div
    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
    onClick={onClose}
  >
    <button
      onClick={onClose}
      aria-label={closeLabel}
      className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full 
      flex items-center justify-center hover:bg-gray-200 transition-colors z-10"
    >
      <X className="w-6 h-6" />
    </button>

    <div
      className="relative w-full max-w-4xl max-h-[90vh]"
      onClick={e => e.stopPropagation()}
    >
      {item.type === 'image' ? (
        // ✅ next/image بدل img
        <div className="relative h-[80vh]">
          <Image
            src={item.url}
            alt=""
            fill
            className="object-contain"
            sizes="100vw"
          />
        </div>
      ) : (
        // ✅ Map embed
        <iframe
          src={item.embedSrc}
          className="w-full h-[80vh] rounded-lg"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Map"
        />
      )}
    </div>
  </div>
);