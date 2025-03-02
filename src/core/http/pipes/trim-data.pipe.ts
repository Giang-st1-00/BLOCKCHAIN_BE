import { PipeTransform, Injectable } from '@nestjs/common';
import { isArray, isPlainObject, isString, mapValues } from 'lodash';

@Injectable()
export class TrimDataPipe implements PipeTransform {
    transform(value: any): any {
        return this.trimDeep(value);
    }

    trimDeep(data: any): any {
        switch (true) {
            case isArray(data):
                return data.map((item: any) => this.trimDeep(item));
            case isPlainObject(data):
                return mapValues(data, (value: any) => this.trimDeep(value));
            case isString(data):
                return data.trim();
            default:
                return data;
        }
    }
}
