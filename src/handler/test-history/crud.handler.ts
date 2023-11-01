import AppDataSource from "@Src/data-source";
import { TestHistory } from "@Src/models/test-history.model";
import { Repository } from "typeorm";

type NewTestHistoryInput = {
  repo_name: string;
  outfile_url?: string;
};

export class TestHistroyCrud {
  private repo: Repository<TestHistory>;
  constructor() {
    this.repo = AppDataSource.getRepository(TestHistory);
  }

  async insertData(inputs: NewTestHistoryInput) {
    const newTestHistory = new TestHistory();
    newTestHistory.repository_name = inputs.repo_name;
    if (inputs.outfile_url) {
      newTestHistory.outputfile_url = inputs.outfile_url;
    }

    const currentDate = new Date();
    newTestHistory.created_at = currentDate;
    newTestHistory.updated_at = currentDate;

    return this.repo.save(newTestHistory);
  }
}
