import { SupabaseClient } from '@supabase/supabase-js'
import { MediaStorageFacade } from '../../domain/contracts/MediaStorateFacade'

export class SupabaseMediaStorageProvider implements MediaStorageFacade {
  private readonly bucket = process.env.SUPABASE_BUCKET!
  private readonly url = process.env.SUPABASE_URL!

  constructor(private readonly supabase: SupabaseClient) {}

  generatePublicUrl(filePath: string): string {
    return `${this.url}/storage/v1/object/public/${this.bucket}/${filePath}`
  }

  async generateSignedUploadUrl(path: string): Promise<{ filePath: string; uploadUrl: string }> {
    const { data, error } = await this.supabase.storage
      .from(this.bucket)
      .createSignedUploadUrl(path, { upsert: true }) // 15 min por padrão

    if (error) throw error

    return {
      filePath: path,
      uploadUrl: data.signedUrl,
    }
  }
}
