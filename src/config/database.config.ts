import { dataSource } from './data-source.config';
import { TypeOrmHelperModule } from 'libraries/blog/typeorm-helper';
import { config } from './orm.config';

export const databaseConfig = TypeOrmHelperModule.forRoot(config, dataSource);
