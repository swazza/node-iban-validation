module.exports = {
  preset: 'ts-jest',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: '.',
        outputName: 'test-report.unit.xml',
      },
    ],
  ],
  testEnvironment: 'node',
  testMatch: ['**/*.unit.spec.ts'],
}
