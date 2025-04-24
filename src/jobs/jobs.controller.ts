/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  Get,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('companyProfilePhoto'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createJobDto: CreateJobDto,
  ) {
    console.log('Received DTO:', createJobDto);
    console.log('Received File:', file?.originalname);
    return this.jobsService.create(createJobDto, file);
  }

  @Get()
  async findAll(
    @Query('searchTerm') searchTerm?: string,
    @Query('location') location?: string,
    @Query('jobType') jobType?: string,
    @Query('salaryRange') salaryRange?: string,
  ) {
    return this.jobsService.findAll({
      searchTerm,
      location,
      jobType,
      salaryRange,
    });
  }
}
