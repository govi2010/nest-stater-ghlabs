import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiImplicitParam, ApiImplicitQuery, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { Permissions } from '../decorators/permissions.decorator';
import { Roles } from '../decorators/roles.decorator';
import { InCreateUserDto } from '../dto/in-create-user.dto';
import { InUserDto } from '../dto/in-user.dto';
import { OutUserDto } from '../dto/out-user.dto';
import { OutUsersDto } from '../dto/out-users.dto';
import { AccessGuard } from '../guards/access.guard';
import { ParseIntWithDefaultPipe } from '../pipes/parse-int-with-default.pipe';
import { UsersService } from '../services/users.service';
import { User } from '../entities/user.entity';
import { PermissionEnum } from '../entities/enums/permission.enum';

@ApiUseTags('users')
@ApiBearerAuth()
@Controller('/users')
@UseGuards(AccessGuard)
export class UsersController {
  constructor(
    private readonly service: UsersService,
  ) {

  }

  @Roles('isSuperuser')
  @Permissions(PermissionEnum.add_user)
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED, type: OutUserDto,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @Post()
  async create(
    @Body() dto: InCreateUserDto,
  ) {
    try {
      return plainToClass(
        OutUserDto,
        await this.service.create({
          item: plainToClass(User, dto).setPassword(dto.password),
        }),
      );
    } catch (error) {
      throw error;
    }
  }

  @Roles('isSuperuser')
  @Permissions(PermissionEnum.change_user)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK, type: OutUserDto,
    description: 'The record has been successfully updated.',
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiImplicitParam({ name: 'id', type: Number })
  @Put(':id')
  async update(
    @Param('id', new ParseIntPipe()) id,
    @Body() dto: InUserDto,
  ) {
    try {
      return plainToClass(
        OutUserDto,
        await this.service.update({
          id,
          item: plainToClass(User, dto).setPassword(dto.password),
        }),
      );
    } catch (error) {
      throw error;
    }
  }

  @Roles('isSuperuser')
  @Permissions(PermissionEnum.delete_user)
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
      return plainToClass(OutUserDto,
        await this.service.delete({
          id,
        }),
      );
    } catch (error) {
      throw error;
    }
  }

  @Roles('isSuperuser')
  @Permissions(PermissionEnum.read_user)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK, type: OutUserDto,
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
        OutUserDto,
        await this.service.load({
          id,
        }),
      );
    } catch (error) {
      throw error;
    }
  }

  @Roles('isSuperuser')
  @Permissions(PermissionEnum.read_user)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK, type: OutUsersDto,
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
  @ApiImplicitQuery({
    name: 'group', required: false, type: Number,
    description: 'Group id for filter data by group. (default: empty)',
  })
  @Get()
  async loadAll(
    @Query('cur_page', new ParseIntWithDefaultPipe(1)) curPage,
    @Query('per_page', new ParseIntWithDefaultPipe(10)) perPage,
    @Query('q') q,
    @Query('group') group,
    @Query('sort') sort,
  ) {
    try {
      return plainToClass(
        OutUsersDto,
        await this.service.loadAll({
          curPage,
          perPage,
          q,
          sort,
          group,
        }),
      );
    } catch (error) {
      throw error;
    }
  }
}