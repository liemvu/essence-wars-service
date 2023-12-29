const gameDataController = require('../../src/controllers/gameDataController');

describe('gameDataController', () => {
  describe('processData', () => {
    it('should return an array of objects with parsed values', () => {
      const rows = [
        ['name', 'age', 'score'],
        ['John', '25', '100'],
        ['Jane', '30', '200'],
      ];

      const expectedResult = [
        { name: 'John', age: 25, score: 100 },
        { name: 'Jane', age: 30, score: 200 },
      ];

      const result = gameDataController.processData(rows);

      expect(result).toEqual(expectedResult);
    });

    it('should handle empty rows', () => {
      const rows = [];

      const expectedResult = [];

      const result = gameDataController.processData(rows);

      expect(result).toEqual(expectedResult);
    });

    it('should handle rows with missing values', () => {
      const rows = [
        ['name', 'age', 'score'],
        ['John', '25'],
        ['Jane', '30', '200'],
      ];

      const expectedResult = [
        { name: 'John', age: 25, score: undefined },
        { name: 'Jane', age: 30, score: 200 },
      ];

      const result = gameDataController.processData(rows);

      expect(result).toEqual(expectedResult);
    });
  });
});