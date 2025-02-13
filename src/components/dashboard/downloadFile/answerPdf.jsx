import React, { useEffect, useState } from "react";
import {
  Page,
  Text,
  Document,
  StyleSheet,
  Font,
  Link,
} from "@react-pdf/renderer";

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

export const PDFrenderer = ({ text }) => {
  return (
    <Document>
      <Page size="A4" style={styles.body}>
        <Text style={styles.paragraph}>{text}</Text>
      </Page>
    </Document>
  );
};
