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
    @Body() body: { conditionIds: string[] },
  ) {
    return this.profileService.updateConditions(userId, body.conditionIds);
  }

  @Patch(':userId/allergies')
  updateAllergies(
    @Param('userId') userId: string,
    @Body() body: { allergyIds: string[] },
  ) {
    return this.profileService.updateAllergies(userId, body.allergyIds);
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
