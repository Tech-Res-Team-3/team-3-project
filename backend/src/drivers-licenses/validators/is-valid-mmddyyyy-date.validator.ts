import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsValidMMDDYYYYDate(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidMMDDYYYYDate',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, _args: ValidationArguments) {
          if (typeof value !== 'string') return false;

          // Check format
          const regex = /^\d{2}-\d{2}-\d{4}$/;
          if (!regex.test(value)) return false;

          // Check actual date validity
          const [month, day, year] = value.split('-').map(Number);
          const date = new Date(`${year}-${month}-${day}`);

          return (
            date instanceof Date &&
            !isNaN(date.getTime()) &&
            date.getUTCFullYear() === year &&
            date.getUTCMonth() + 1 === month &&
            date.getUTCDate() === day
          );
        },
        defaultMessage(_args: ValidationArguments) {
          return 'expirationDate must be a valid date in MM-DD-YYYY format';
        },
      },
    });
  };
}