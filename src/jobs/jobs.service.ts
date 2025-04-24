/* eslint-disable prettier/prettier */
//* eslint-disable @typescript-eslint/no-unsafe-member-access */
//* eslint-disable @typescript-eslint/no-unsafe-return */
//* eslint-disable-next-line prettier/prettier
//* eslint-disable @typescript-eslint/no-unsafe-call */
//* eslint-disable-next-line prettier/prettier
//* eslint-disable @typescript-eslint/require-await */
//* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './entity/job.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CreateJobDto } from './dto/create-job.dto';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private jobsRepository: Repository<Job>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(
    createJobDto: CreateJobDto,
    file: Express.Multer.File,
  ): Promise<Job> {
    const applicationDeadline = new Date(createJobDto.applicationDeadline);

    const job = new Job();
    Object.assign(job, createJobDto);
    if (file) {
      job.companyProfilePhoto = await this.cloudinaryService.uploadImage(file);
    }

    job.applicationDeadline = applicationDeadline;
    job.createdAt = new Date(); // Manually set the createdAt field

    return this.jobsRepository.save(job);
  }
  async findAll(filters: {
    searchTerm?: string;
    location?: string;
    jobType?: string;
    salaryRange?: string;
  }): Promise<Job[]> {
    console.log('Filters:', filters);
    const query = this.jobsRepository.createQueryBuilder('job');
  
    // Filter by search term
    if (filters.searchTerm?.trim()) {
      const searchTerm = filters.searchTerm.trim();
      query.andWhere(
        '(LOWER(job.title) LIKE LOWER(:searchTerm) OR LOWER(job.description) LIKE LOWER(:searchTerm))', 
        {
          searchTerm: `%${searchTerm}%`,
        }
      );
    }
  
    // Filter by location
  // Filter by location
// Filter by location
if (filters.location?.trim()) {
  const location = filters.location.trim();
  query.andWhere(
    'LOWER(TRIM(job.location)) LIKE LOWER(TRIM(:location))',
    {
      location: `%${location}%`, // Use LIKE for partial matches
    }
  );
}

// Filter by job type
if (filters.jobType?.trim()) {
  const jobType = filters.jobType.trim().toLowerCase().replace(/\s+/g, ''); // Normalize input
  query.andWhere(
    "LOWER(REPLACE(job.jobType, ' ', '')) = :jobType",
    {
      jobType: jobType, // Ensure case-insensitive and space-normalized comparison
    }
  );
}
   
    // DEBUG: Log the generated SQL
    console.log('SQL Query:', query.getQueryAndParameters());
    
    const jobs = await query.getMany();
    console.log('Results:', jobs);
    return jobs;
  }
}
