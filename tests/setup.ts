// import { Nullable } from '@verdantkit/utils';
// import { vi } from 'vitest'

// // setupTests.js

// class CustomFileReader {
//   public result: unknown = null;
//   public onload: Nullable<() => void> = null;

//   readAsDataURL(blob: Blob) {
//     this.result = String("data:image/png;base64,...").concat(JSON.stringify(blob));

//     if (this.onload) {
//       this.onload()
//     };
//   }
// };

// // Mock FileReader API
// global.FileReader = CustomFileReader as typeof FileReader;

// // Mock URL.createObjectURL API
// global.URL.createObjectURL = vi.fn(() => 'mocked-object-url');

// type CanvasContextId = "2d"
//  | "bitmaprenderer"
//  | "webgl"
//  | "webgl2"
//  | string

// type CanvasContext = CanvasRenderingContext2D
//   | ImageBitmapRenderingContext
//   | WebGLRenderingContext
//   | WebGL2RenderingContext
//   | RenderingContext

// // Mock Canvas API (if needed)
// const createCanvasMock = (
//   contextId: CanvasContextId,
//   options?: CanvasRenderingContext2DSettings
// ): Nullable<CanvasContext> => {
//   return {
//     getContext: vi.fn(() => ({
//       fillRect: vi.fn(),
//       drawImage: vi.fn(),
//       getImageData: vi.fn(() => ({ data: [] })),
//       putImageData: vi.fn(),
//       createImageData: vi.fn(),
//       setTransform: vi.fn(),
//       fill: vi.fn(),
//       beginPath: vi.fn(),
//       moveTo: vi.fn(),
//       lineTo: vi.fn(),
//       closePath: vi.fn(),
//       stroke: vi.fn(),
//       save: vi.fn(),
//       restore: vi.fn(),
//       clearRect: vi.fn(),
//     })),
//     toDataURL: vi.fn(() => "data:image/png;base64,..."), // Mock base64 result
//   };
// };

// // Mock HTMLCanvasElement if needed
// global.HTMLCanvasElement.prototype.getContext = createCanvasMock;

// // Mock for URL.revokeObjectURL
// global.URL.revokeObjectURL = vi.fn();
