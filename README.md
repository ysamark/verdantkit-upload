# Verdant Kit Upload Client toolkit

A set of upload helpers of the verdant toolkit

## Install

### YARN

```bash
yarn add @verdantkit/utils @verdantkit/upload
```

### NPM

```bash
npm install --save @verdantkit/utils @verdantkit/upload
```

### PNPM

```bash
pnpm add @verdantkit/utils @verdantkit/upload
```

Can use this to upload images to any server side using verdant provided adapter or even by custom adapters

## Use

You can use verdant upload client in a Next.JS App, firstly gotta create an instance of UploadClient from verdantkit.

```typescript
import { UploadClient, Adapters } from '@verdantkit/upload'

const googleDriveAdapter = new Adapters.GoogleDrive({
  googleDriveClientId: 'env:GOOGLE_DRIVE_CLIENT_ID',
  googleDriveClientSecret: 'env:GOOGLE_DRIVE_CLIENT_SECRET',
})

export const uploadClient = new UploadClient({
  adapter: googleDriveAdapter,
  set: 'my-public-images',
  sizes: {
    large: '2000x2000',
    medium: '900x900',
    small: '200x200'
  }
})
```

To upload from a client component (frontend)

```tsx
import { uploadClient } from '@services/uploadClient'

function MyForm () {
  const [file, setFile] = useState<File>()

  async function formSubmitHandler () {
    const uploadedFile = await uploadClient.uploadFile(file)

    // >>> { id: number, ..., variants: [...] }
  }

  return (
    <form method="post" onSubmit={formSubmitHandler}>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button type="submit">Send</button>
    </form>
  )
}
```

```typescript
// verdant/refuge/[...refuge]/route.ts

import { createRouteHandlers } from '@verdantkit/upload/next'

import { uploadClient } from '@services/uploadClient'

export const { GET, POST, DELETE, PUT } = createRouteHandlers(uploadClient)
```
