import { SampleRepository } from "@/domains/repository/sampleRepository";

export interface TestRepository {
  sampleRepository: SampleRepository;
}

export class TestRepositoryImpl implements TestRepository {
  id: string = "TestRepository";
  sampleRepository: SampleRepository;
  constructor(sampleRepository: SampleRepository) {
    this.sampleRepository = sampleRepository;
  }
}

export class MockTestRepositoryImpl implements TestRepository {
  name: string = "MockTestRepository";
  sampleRepository: SampleRepository;
  constructor(sampleRepository: SampleRepository) {
    this.sampleRepository = sampleRepository;
  }
}
