import { FileUpload } from '@apollographql/graphql-upload-8-fork';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UploadPayload } from './payload/upload.payload';
import { GraphQLUpload } from './upload.scalar';
import { UploadService } from './upload.service';

@Resolver(() => UploadPayload)
export class UploadResolver {
  constructor(private readonly uploadService: UploadService) {}

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }

  @Mutation(() => UploadPayload)
  public async singleUpload(
    @Args({ name: 'file', type: () => GraphQLUpload })
    file: FileUpload
  ) {
    return await this.uploadProcess(file);
  }

  @Mutation(() => [UploadPayload])
  public async multipleUpload(
    @Args({ name: 'files', type: () => [GraphQLUpload] })
    files: Array<FileUpload>
  ) {
    return await Promise.all(
      files.map((file) => {
        return this.uploadProcess(file);
      })
    );
  }

  private async uploadProcess(file: FileUpload) {
    const res = await this.uploadService.storeFileByFs(file);

    return {
      url: res.filePath
    };
  }
}
