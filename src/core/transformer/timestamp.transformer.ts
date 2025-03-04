import { ValueTransformer } from 'typeorm';
import { isNumber } from 'lodash';

export class TimestampTransformer implements ValueTransformer {
    to(value: number | Date): Date {
        if (isNumber(value)) {
            return new Date(value * 1000);
        }

        return value;
    }

    from(value: Date): number {
        if (!value) {
            return value;
        }

        return Math.round(+new Date(value) / 1000);
    }
}
