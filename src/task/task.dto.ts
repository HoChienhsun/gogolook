import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteTaskSuccessResponse {
  @ApiProperty()
  readonly status: number;
  @ApiProperty({ type: Boolean })
  readonly data: Boolean;
}

export class PostTaskRequestBody {
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly status: number;
}

export class PostTaskSuccessBody {
  @ApiProperty()
  readonly id: number;
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly status: number;
}

export class PostTaskSuccessResponse {
  @ApiProperty()
  readonly status: number;
  @ApiProperty({ type: PostTaskSuccessBody })
  readonly data: PostTaskSuccessBody;
}

export class GetTaskSuccessBody {
  @ApiProperty()
  readonly id: number;
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly status: number;
}

export class GetTaskSuccessResponse {
  @ApiProperty()
  readonly status: number;
  @ApiProperty({ type: [GetTaskSuccessBody] })
  readonly data: GetTaskSuccessBody[];
}
