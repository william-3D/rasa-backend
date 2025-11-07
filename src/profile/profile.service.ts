import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdateConditionsDto } from './dto/update-conditions.dto';
import { UpdateAllergiesDto } from './dto/update-allergies.dto';
import { S3Service } from '../s3/s3.service';

@Injectable()
export class ProfileService {
  private readonly logger = new Logger(ProfileService.name);

  constructor(
    private prisma: PrismaService,
    private s3Service: S3Service,
  ) {}

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        conditions: {
          include: {
            condition: true,
          },
        },
        allergies: {
          include: {
            allergy: true,
          },
        },
      },
    });

    if (!user) return null;

    let profilePictureUrl = user.profilePicture;
    if (user.profilePicture) {
      profilePictureUrl = await this.s3Service.getSignedUrl(
        user.profilePicture,
      );
    }

    return {
      id: user.id,
      fullName: user.fullName,
      username: user.username,
      profilePicture: profilePictureUrl,
      conditions: user.conditions.map((uc) => ({
        id: uc.condition.id,
        name: uc.condition.name,
      })),
      allergies: user.allergies.map((ua) => ({
        id: ua.allergy.id,
        name: ua.allergy.name,
      })),
    };
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    return this.prisma.user.update({
      where: { id: userId },
      data: dto,
    });
  }

  async updateConditions(userId: string, dto: UpdateConditionsDto) {
    await this.prisma.userCondition.deleteMany({
      where: { userId },
    });

    await this.prisma.userCondition.createMany({
      data: dto.conditionIds.map((conditionId) => ({
        userId,
        conditionId,
      })),
    });

    return this.getProfile(userId);
  }

  async updateAllergies(userId: string, dto: UpdateAllergiesDto) {
    await this.prisma.userAllergy.deleteMany({
      where: { userId },
    });

    await this.prisma.userAllergy.createMany({
      data: dto.allergyIds.map((allergyId) => ({
        userId,
        allergyId,
      })),
    });

    return this.getProfile(userId);
  }

  async uploadProfilePicture(userId: string, file: Express.Multer.File) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { profilePicture: true },
    });

    if (user?.profilePicture) {
      this.logger.log(`Deleting old profile picture: ${user.profilePicture}`);
      await this.s3Service.deleteFile(user.profilePicture);
      this.logger.log('Old profile picture deleted successfully');
    }

    const key = await this.s3Service.uploadFile(file, userId);
    this.logger.log(`New profile picture uploaded: ${key}`);
    await this.prisma.user.update({
      where: { id: userId },
      data: { profilePicture: key },
    });
    return this.getProfile(userId);
  }
}
