export interface MediaStorageFacade {
  generateSignedUploadUrl(path: string): Promise<{ filePath: string; uploadUrl: string }>
  generatePublicUrl(filePath: string): string
}
