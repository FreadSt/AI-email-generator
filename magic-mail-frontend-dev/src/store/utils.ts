import { v4 as uuidv4 } from 'uuid'

export function arrayBufferToBlobUrl(arrayBuffer: ArrayBuffer, mimeType: string): [Blob, string] {
  const blob = new Blob([arrayBuffer], { type: mimeType })
  return [blob, URL.createObjectURL(blob)]
}

const imageStore = new Map()

export function storeImage(imageArrayBuffer: ArrayBuffer): string {
  const id = uuidv4()
  imageStore.set(id, imageArrayBuffer)
  return id
}

export function retrieveImageAndDelete(id: string): ArrayBuffer {
  const arrayBuffer = imageStore.get(id)
  imageStore.delete(id)
  return arrayBuffer
}
