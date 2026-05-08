'use client';

import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useLenis } from 'lenis/react';

interface ModalProps {
  children: React.ReactNode;
  title?: string;
}

export const Modal = ({ children }: ModalProps) => {
  const router = useRouter();
  const lenis = useLenis();

  const onDismiss = useCallback(() => router.back(), [router]);

  // Stop Lenis while modal is open — it intercepts wheel events globally
  // and prevents the modal's overflow-y-auto from receiving them.
  useEffect(() => {
    lenis?.stop();
    return () => lenis?.start();
  }, [lenis]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss();
    };
    document.addEventListener('keydown', handleKeyDown);

    const scrollY = window.scrollY;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollY);
    };
  }, [onDismiss]);

  return (
    <>
      <AnimatePresence>
        <motion.div
          key="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          // data-lenis-prevent: tell Lenis not to intercept scroll events here
          // so the native overflow-y-auto scroll works inside the modal.
          data-lenis-prevent
          className="fixed inset-0 z-[100] bg-[#010F24] overflow-y-auto overflow-x-hidden"
          style={{ overscrollBehavior: 'contain' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 48 }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            {children}
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Close button — sibling outside the scroll container so position:fixed
          anchors to the viewport, not to any transformed ancestor */}
      <button
        onClick={onDismiss}
        className="fixed top-5 right-5 z-[110] group w-10 h-10 rounded-full border border-white/15 bg-[#010F24]/80 flex items-center justify-center hover:border-[#71B8E3]/50 hover:bg-[#71B8E3]/10 transition-all duration-300"
        aria-label="Close"
      >
        <X size={15} className="text-white/60 group-hover:text-[#71B8E3] transition-colors" />
      </button>
    </>
  );
};
