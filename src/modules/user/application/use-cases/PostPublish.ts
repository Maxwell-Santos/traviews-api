export class PostPublish {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly imageUploadService: ImageUploadService,
  ) {}

  async execute(data: PostPublishDTO): Promise<Post> {
    const { userId, description, imageBase64, location } = data

    // Upload the image to the cloud
    const imageUrl = await this.imageUploadService.upload(imageBase64)

    // Create the post
    const post = await this.postRepository.create({
      userId,
      description,
      imageUrl,
      location,
    })

    return post
  }
}
