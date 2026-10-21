import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

export function createApplication() {
  return NestFactory.create(AppModule, { abortOnError: false });
}
