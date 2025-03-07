import React, { useState, useEffect } from "react";
import { FileText, FileIcon, BoxIcon } from "lucide-react";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import {
  Document,
  Page,
  Text,
  StyleSheet,
  Font,
  pdf,
} from "@react-pdf/renderer";
import { useCookies } from "react-cookie";

interface DownloadButtonProps {
  text: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    fontFamily: "Roboto",
  },
  paragraph: {
    fontSize: 12,
    textAlign: "left",
    marginBottom: 21,
  },
});

const MyDocument = ({ text }: { text: string }) => (
  <Document>
    <Page size="A4" style={styles.body}>
      <Text style={styles.paragraph}>{text}</Text>
    </Page>
  </Document>
);

export const DownloadButton = ({
  text,
  isOpen,
  setIsOpen,
}: DownloadButtonProps) => {
  const t = useTranslations("Dashboard");
  const [cookiesTheme] = useCookies(["theme"]);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    setTheme(cookiesTheme.theme || "dark");
  }, [cookiesTheme]);

  useEffect(() => {
    document.body.classList.toggle("light", theme === "light");
  }, [theme]);

  const downloadTxt = () => {
    setIsOpen(false);
    const blob = new Blob([text], { type: "text/plain" });
    const fileName = "result.txt";

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);

    toast.success(t("Tostify.successDownload"));
  };

  const downloadWord = () => {
    setIsOpen(false);
    const blob = new Blob([text], { type: "application/msword" });
    const fileName = "result.doc";

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);

    toast.success(t("Tostify.successDownload"));
  };

  const downloadPdf = async () => {
    setIsOpen(false);
    try {
      const blob = await pdf(<MyDocument text={text} />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "result.pdf";
      a.click();
      URL.revokeObjectURL(url);
      toast.success(t("Tostify.successDownload"));
    } catch (error) {
      console.error("Ошибка генерации PDF:", error);
      toast.error("Ошибка скачивания PDF");
    }
  };

  return (
    <div className="relative">
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/20 z-20"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute mt-1.5 w-44 bg-background-header rounded-[10px] shadow-lg border border-gray-700/50 overflow-hidden z-50">
            <div className="p-1">
              <button
                onClick={downloadPdf}
                className="flex items-center gap-2 w-full px-2 py-1.5 text-gray-300 hover:bg-gray-700/40 rounded-sm transition-all duration-150"
              >
                <div className="p-1 rounded-sm bg-gray-700/30 text-red-400">
                  <BoxIcon size={14} />
                </div>
                <div className="text-left flex-1 min-w-0">
                  <div className="text-[11px] font-medium text-gray-200 truncate">
                    PDF 
                  </div>
                </div>
              </button>

              <button
                onClick={downloadWord}
                className="flex items-center gap-2 w-full px-2 py-1.5 text-gray-300 hover:bg-gray-700/40 rounded-sm transition-all duration-150"
              >
                <div className="p-1 rounded-sm bg-gray-700/30 text-blue-400">
                  <FileText size={14} />
                </div>
                <div className="text-left flex-1 min-w-0">
                  <div className="text-[11px] font-medium text-gray-200 truncate">
                    Word
                  </div>
                </div>
              </button>

              <button
                onClick={downloadTxt}
                className="flex items-center gap-2 w-full px-2 py-1.5 text-gray-300 hover:bg-gray-700/40 rounded-sm transition-all duration-150"
              >
                <div className="p-1 rounded-sm bg-gray-700/30 text-green-400">
                  <FileIcon size={14} />
                </div>
                <div className="text-left flex-1 min-w-0">
                  <div className="text-[11px] font-medium text-gray-200 truncate">
                    Text
                  </div>
                </div>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
