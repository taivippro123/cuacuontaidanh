"use client";

import { useState, useEffect } from "react";
import "../css/style.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { ModalProvider } from "../context/QuickViewModalContext";
import { ReduxProvider } from "@/redux/provider";
import QuickViewModal from "@/components/Common/QuickViewModal";
import { PreviewSliderProvider } from "../context/PreviewSliderContext";
import PreviewSliderModal from "@/components/Common/PreviewSlider";

import ScrollToTop from "@/components/Common/ScrollToTop";
import PreLoader from "@/components/Common/PreLoader";

export default function AppSiteShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return <PreLoader />;
  }

  return (
    <>
      <ReduxProvider>
        <ModalProvider>
          <PreviewSliderProvider>
            <Header />
            {children}
            <QuickViewModal />
            <PreviewSliderModal />
          </PreviewSliderProvider>
        </ModalProvider>
      </ReduxProvider>
      <ScrollToTop />
      <Footer />
    </>
  );
}
