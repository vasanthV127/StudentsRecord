import { GlobalWorkerOptions } from 'pdfjs-dist';

// Dynamically import the worker loader from the package
GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;
