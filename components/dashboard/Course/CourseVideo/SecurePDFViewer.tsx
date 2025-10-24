import { useState, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface SecurePDFViewerProps {
  pdfUrl: string;
  width?: number;
  height?: number;
  className?: string;
}

interface PDFDocumentProxy {
  numPages: number;
}

type PDFPageNumber = number;

const SecurePDFViewer: React.FC<SecurePDFViewerProps> = ({
                                                           pdfUrl,
                                                           width = 800,
                                                           className = ''
                                                         }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<PDFPageNumber>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  const onDocumentLoadSuccess = useCallback(({ numPages }: PDFDocumentProxy): void => {
    setNumPages(numPages);
    setIsLoading(false);
    setHasError(false);
  }, []);

  const onDocumentLoadError = useCallback((error: Error): void => {
    console.error('Error loading PDF:', error);
    setIsLoading(false);
    setHasError(true);
  }, []);

  // Prevent right-click and context menu
  const preventDownload = useCallback((e: React.MouseEvent): boolean => {
    e.preventDefault();
    return false;
  }, []);

  const goToPreviousPage = (): void => {
    setPageNumber(prev => Math.max(1, prev - 1));
  };

  const goToNextPage = (): void => {
    setPageNumber(prev => Math.min(numPages || 1, prev + 1));
  };

  const calculatedWidth = Math.min(width, window.innerWidth - 40);

  return (
    <div
      className={`secure-pdf-viewer ${className}`}
      onContextMenu={preventDownload}
      style={{
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none'
      }}
    >
      {/* Disable text selection and right-click */}
      <style>
        {`
          .secure-pdf-viewer * {
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
          }
        `}
      </style>

      {/* Navigation Controls */}
      <div
        className="pdf-controls"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '10px',
          gap: '10px'
        }}
      >
        <button
          disabled={pageNumber <= 1}
          onClick={goToPreviousPage}
          style={{ padding: '5px 10px' }}
        >
          Previous
        </button>

        <span>
          Page {pageNumber} of {numPages || '--'}
        </span>

        <button
          disabled={pageNumber >= (numPages || 0)}
          onClick={goToNextPage}
          style={{ padding: '5px 10px' }}
        >
          Next
        </button>
      </div>

      {/* PDF Document */}
      <div
        style={{
          border: '1px solid #ccc',
          borderRadius: '8px',
          overflow: 'hidden',
          maxWidth: '100%',
          minHeight: '400px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {isLoading && <div>Loading PDF...</div>}
        {hasError && <div>Error loading PDF!</div>}

        {!isLoading && !hasError && (
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={null}
            error={null}
          >
            <Page
              pageNumber={pageNumber}
              width={calculatedWidth}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
        )}
      </div>
    </div>
  );
};

// Usage with TypeScript
export default function PDFSection(): JSX.Element {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Secure PDF Viewer</h2>
      <SecurePDFViewer
        pdfUrl="/path/to/your/document.pdf"
        width={800}
        className="custom-pdf-viewer"
      />
    </div>
  );
}