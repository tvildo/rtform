import { MaskedFieldResult } from './MaskedFieldResult';
import { UseFieldResult } from '../core/UseFieldResult';

export const useCreditCardMask = (field: UseFieldResult<string>, maxLength: number): MaskedFieldResult => {
  const trimmed = field.value ? field.value.trim() : field.value;

  // no work to do
  if (!trimmed) {
    return {
      ...field,
      maskedValue: '',
      maxLength,
    };
  }

  // unmask value ! important
  const unMaskedValue = trimmed.replace(/\s+/g, '').toLowerCase();
  const length = unMaskedValue.length;

  const groupSize = 4;
  let result = '';
  let cursor = 0;
  let countPadding = 0;

  for (; cursor < length; cursor++) {
    // how many chars are remaining
    const remainingChars = length - cursor;
    // next group of chars to be apended
    const currentGroup = unMaskedValue.substr(cursor, groupSize);

    // if remaining char count is greater than group size we should add padding ' '
    if (remainingChars / groupSize > 1) {
      result = result.concat(`${currentGroup} `);
      countPadding++;
    } else {
      result = result.concat(currentGroup);
    }

    cursor = cursor + currentGroup.length - 1;
  }

  return {
    ...field,
    value: unMaskedValue,
    maskedValue: result,
    maxLength: maxLength + countPadding,
  };
};
