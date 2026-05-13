"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

interface PreviewSliderType {
  isModalPreviewOpen: boolean;
  openPreviewModal: (images?: string[], currentIndex?: number) => void;
  closePreviewModal: () => void;
  previewImages: string[];
  currentImageIndex: number;
}

const PreviewSlider = createContext<PreviewSliderType | undefined>(undefined);

export const usePreviewSlider = () => {
  const context = useContext(PreviewSlider);
  if (!context) {
    throw new Error("usePreviewSlider must be used within a ModalProvider");
  }
  return context;
};

export const PreviewSliderProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isModalPreviewOpen, setIsModalOpen] = useState(false);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openPreviewModal = useCallback(
    (images?: string[], currentIndex?: number) => {
      const list = images?.filter(Boolean) ?? [];
      if (!list.length) {
        setPreviewImages([]);
        setCurrentImageIndex(0);
        setIsModalOpen(false);
        return;
      }
      setPreviewImages(list);
      setCurrentImageIndex(
        Math.min(Math.max(0, currentIndex ?? 0), list.length - 1)
      );
      setIsModalOpen(true);
    },
    []
  );

  const closePreviewModal = useCallback(() => {
    setIsModalOpen(false);
    setPreviewImages([]);
    setCurrentImageIndex(0);
  }, []);

  const value = useMemo(
    () => ({
      isModalPreviewOpen,
      openPreviewModal,
      closePreviewModal,
      previewImages,
      currentImageIndex,
    }),
    [
      isModalPreviewOpen,
      openPreviewModal,
      closePreviewModal,
      previewImages,
      currentImageIndex,
    ]
  );

  return (
    <PreviewSlider.Provider value={value}>{children}</PreviewSlider.Provider>
  );
};
