import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { DynamicModule } from '@nestjs/common';

export class TypeOrmHelperModule {
    static forRoot(config: TypeOrmModuleOptions, datasource: DataSource): DynamicModule {
        return TypeOrmModule.forRootAsync({
            useFactory: () => config,
            dataSourceFactory: async () => datasource
        });
    }
}
