// ✅ Server-renderable — الـ parent هو Client Component
import Image from 'next/image';
import { X } from 'lucide-react';

interface ImageZoomModalProps {
  src: string;
  closeLabel?: string;
  onClose: () => void;
}

export const ImageZoomModal = ({ src, closeLabel = 'Close', onClose }: ImageZoomModalProps) => (
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
      className="relative w-full max-w-4xl h-[85vh]"
      onClick={e => e.stopPropagation()}
    >
      <Image src={src} alt="" fill className="object-contain" sizes="100vw" />
    </div>
  </div>
);