import { WindowControls } from '#components';
import WindowWrapper from '#components/hoc/WindowWrapper';
import { Download } from 'lucide-react';
import { Document, Page, pdfjs } from 'react-pdf';
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import React from "react";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Correct worker for Vite + react-pdf v7
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

const Resume = () => {
  return (
    <>
      <div id="window-header">
        <WindowControls target="resume" />
        <h2>Resume.pdf</h2>

        <a href="/files/resume.pdf" download title="Download Resume">
          <Download className='icon'/>
        </a>
      </div>

      <Document file="/files/resume.pdf">
        <Page pageNumber={1} renderTextLayer renderAnnotationLayer />
      </Document>
    </>
  );
};

export default WindowWrapper(Resume, "resume");
