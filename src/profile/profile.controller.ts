import {
  Controller,
  Get,
  Param,
  Patch,
  Body,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdateConditionsDto } from './dto/update-conditions.dto';
import { UpdateAllergiesDto } from './dto/update-allergies.dto';

// TODO: Are you planning to create a User controller as well? Especially to handle the creation a new users or deletion as well

// Consider separating user management operations (create/delete) into a dedicated UserController
// The ProfileController should focus on profile-specific operations, while user management should be handled separately
// This separation will provide clearer boundaries even though both controllers interact with the User model

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get(':userId')
  getProfile(@Param('userId') userId: string) {
    return this.profileService.getProfile(userId);
  }

  @Patch(':userId')
  updateProfile(
    @Param('userId') userId: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.profileService.updateProfile(userId, updateProfileDto);
  }

  @Patch(':userId/conditions')
  updateConditions(
    @Param('userId') userId: string,
    @Body() dto: UpdateConditionsDto,
  ) {
    return this.profileService.updateConditions(userId, dto.conditionIds);
  }

  @Patch(':userId/allergies')
  updateAllergies(
    @Param('userId') userId: string,
    @Body() dto: UpdateAllergiesDto,
  ) {
    return this.profileService.updateAllergies(userId, dto.allergyIds);
  }

  @Post(':userId/profile-picture')
  @UseInterceptors(FileInterceptor('file'))
  uploadProfilePicture(
    @Param('userId') userId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.profileService.uploadProfilePicture(userId, file);
  }
}
