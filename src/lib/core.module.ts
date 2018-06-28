import { Module } from '@nestjs/common';

import { controllers } from './controllers';
import { services } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([...entities])],
  controllers: [...controllers],
  providers: [...services],
  exports: [...services],
})
export class CoreModule {}
