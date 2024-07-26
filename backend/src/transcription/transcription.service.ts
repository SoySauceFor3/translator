import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import OpenAI from 'openai';
import * as path from 'path';

@Injectable()
export class TranscriptionService {
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }

  async transcribe(file: Express.Multer.File): Promise<string> {
    // Store it locally.
    const uploadDir = path.join(__dirname, '..', '..', 'tmp');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    const filePath = path.join(uploadDir, file.originalname);
    fs.writeFileSync(filePath, file.buffer);
    const fileStream = fs.createReadStream(filePath);

    // Transcribe the file.
    const response = await this.openai.audio.transcriptions.create({
      file: fileStream,
      model: 'whisper-1',
    });

    // Delete the file.
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Error deleting file ${filePath}:`, err);
      }
    });

    return response.text;
  }
}
