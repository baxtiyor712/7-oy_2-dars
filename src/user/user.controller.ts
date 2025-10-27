import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { Roles } from 'src/shared/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('user')
@UseGuards(AuthGuard, RolesGuard)
@Roles(Role.Admin, Role.User)
@ApiTags("user")
@ApiBearerAuth("JWT-auth")
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiOperation({ description: "Create user" })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: "create user" })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }


  @ApiOperation({ description: "Get All users" })
  @ApiResponse({ status: 200, description: "get all user" })
  @Get()
  findAll() {
    return this.userService.findAll();
  }


  @ApiOperation({ description: "Get One user" })
  @ApiParam({ name: "id", description: "params id" })
  @ApiResponse({ status: 200, description: "get one user" })
  @ApiResponse({ status: 404, description: "User not found" })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }


  @ApiOperation({ description: "Update user" })
  @ApiBody({ type: UpdateUserDto })
  @ApiParam({ name: "id", description: "params id" })
  @ApiResponse({ status: 404, description: "User not found" })
  @ApiResponse({ status: 200, description: "Update user" })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }


  @ApiOperation({ description: "Delete user" })
  @ApiParam({ name: "id", description: "params id" })
  @ApiResponse({ status: 404, description: "User not found" })
  @ApiResponse({ status: 200, description: "Delete user" })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
