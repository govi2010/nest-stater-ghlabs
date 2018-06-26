import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiImplicitParam, ApiImplicitQuery, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { Permissions } from '../decorators/permissions.decorator';
import { Roles } from '../decorators/roles.decorator';
import { InContentTypeDto } from '../dto/in-content-type.dto';
import { OutContentTypeDto } from '../dto/out-content-type.dto';
import { OutContentTypesDto } from '../dto/out-content-types.dto';
import { AccessGuard } from '../guards/access.guard';
import { ParseIntWithDefaultPipe } from '../pipes/parse-int-with-default.pipe';
import { ContentTypesService } from '../services/content-types.service';
import { ContentType } from '../entities/content-type.entity';
import { PermissionEnum } from '../entities/enums/permission.enum';


@ApiUseTags('content-types')
@ApiBearerAuth()
@Controller('/content_types')
@UseGuards(AccessGuard)
export class ContentTypesController {
  constructor(
    private readonly service: ContentTypesService,
  ) {

  }

  @Roles('isSuperuser')
  @Permissions('add_content-type')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED, type: OutContentTypeDto,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @Post()
  async create(
    @Body() dto: InContentTypeDto,
  ) {
    try {
      return plainToClass(
        OutContentTypeDto,
        await this.service.create({
          item: plainToClass(ContentType, dto),
        }),
      );
    } catch (error) {
      throw error;
    }
  }

  @Roles('isSuperuser')
  @Permissions(PermissionEnum['change_content-type'])
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK, type: OutContentTypeDto,
    description: 'The record has been successfully updated.',
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiImplicitParam({ name: 'id', type: Number })
  @Put(':id')
  async update(
    @Param('id', new ParseIntPipe()) id,
    @Body() dto: InContentTypeDto,
  ) {
    try {
      return plainToClass(
        OutContentTypeDto,
        await this.service.update({
          id: id,
          item: plainToClass(ContentType, dto),
        }),
      );
    } catch (error) {
      throw error;
    }
  }

  @Roles('isSuperuser')
  @Permissions(PermissionEnum['delete_content-type'])
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The record has been successfully deleted.',
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiImplicitParam({ name: 'id', type: Number })
  @Delete(':id')
  async delete(
    @Param('id', new ParseIntPipe()) id,
  ) {
    try {
      return plainToClass(OutContentTypeDto,
        await this.service.delete({
          id: id,
        }),
      );
    } catch (error) {
      throw error;
    }
  }

  @Roles('isSuperuser')
  @Permissions(PermissionEnum['read_content-type'])
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK, type: OutContentTypeDto,
    description: '',
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiImplicitParam({ name: 'id', type: Number })
  @Get(':id')
  async load(
    @Param('id', new ParseIntPipe()) id,
  ) {
    try {
      return plainToClass(
        OutContentTypeDto,
        await this.service.load({
          id: id,
        }),
      );
    } catch (error) {
      throw error;
    }
  }

  @Roles('isSuperuser')
  @Permissions(PermissionEnum['read_content-type'])
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK, type: OutContentTypesDto,
    description: '',
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiImplicitQuery({ name: 'q', required: false, type: String, description: 'Text for search (default: empty)' })
  @ApiImplicitQuery({ name: 'sort', required: false, type: String, description: 'Column name for sort (default: -id)' })
  @ApiImplicitQuery({
    name: 'per_page', required: false, type: Number,
    description: 'Number of results to return per page. (default: 10)',
  })
  @ApiImplicitQuery({
    name: 'cur_page', required: false, type: Number,
    description: 'A page number within the paginated result set. (default: 1)',
  })
  @Get()
  async loadAll(
    @Query('cur_page', new ParseIntWithDefaultPipe(1)) curPage,
    @Query('per_page', new ParseIntWithDefaultPipe(10)) perPage,
    @Query('q') q,
    @Query('sort') sort,
  ) {
    try {
      return plainToClass(
        OutContentTypesDto,
        await this.service.loadAll({
          curPage: curPage,
          perPage: perPage,
          q: q,
          sort: sort,
        }),
      );
    } catch (error) {
      throw error;
    }
  }
}