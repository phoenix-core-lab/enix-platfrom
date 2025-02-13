"use client";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { useState } from "react";
import FileSaver from "file-saver"; // For TXT and DOCX
Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
});
export default function ExportButtons() {
  const [menuVisible, setMenuVisible] = useState(false);
  const text = "Привет мир"; // Example text

  const styles = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
      fontFamily: "Roboto",
    },
    section: {
      marginBottom: 10,
      fontSize: 12,
      color: "#000",
    },
  });

  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.body}>
        <Text style={styles.section}>{text}</Text>
      </Page>
    </Document>
  );

  const handleExport = (format) => {
    if (format === "txt") {
      const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
      FileSaver.saveAs(blob, "response.txt");
    } else if (format === "docx") {
      alert("DOCX export is not implemented yet.");
    }
    setMenuVisible(false); // Hide menu after selection
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setMenuVisible(!menuVisible)}
        className="bg-yellow-400 text-black px-4 py-2 rounded-lg"
      >
        Скачать
      </button>

      {menuVisible && (
        <div>
          <button
            onClick={() => handleExport("txt")}
            className="block px-4 py-2 text-black hover:bg-gray-100"
          >
            TXT
          </button>

          <PDFDownloadLink document={<MyDocument />} fileName="response.pdf">
            {({ loading }) => (
              <button
                disabled={loading}
                className="block px-4 py-2 text-black hover:bg-gray-100"
              >
                {loading ? "Загружается PDF..." : "Скачать PDF"}
              </button>
            )}
          </PDFDownloadLink>

          <button
            onClick={() => handleExport("docx")}
            className="block px-4 py-2 text-black hover:bg-gray-100"
          >
            DOCX
          </button>
        </div>
      )}
    </div>
  );
}
