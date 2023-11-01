import { HttpStatusCode } from "axios";
import {
  CloneRepositoriesInput,
  GetRepositoriesInput,
  GitHelper,
} from "@Helper/git.helper";
import { ReturnHelper } from "@Helper/return.helper";
import { TestHistroyCrud } from "./test-history/crud.handler";

type GitRepos = {
  name: string;
  description: string;
  cloneUrl: string;
};

class GitHandler {
  private gitHelper: GitHelper;
  private testHistoryCrud: TestHistroyCrud;

  constructor() {
    this.gitHelper = new GitHelper();
    this.testHistoryCrud = new TestHistroyCrud();
  }

  public async getRepositories(inputs: GetRepositoriesInput) {
    const gitRepos = await this.gitHelper.getRepositories(inputs);
    const reposData: any[] = gitRepos.data;

    const sanitizedData: GitRepos[] = [];
    for (const data of reposData) {
      sanitizedData.push({
        name: data["full_name"],
        description: data["description"],
        cloneUrl: data["clone_url"],
      });
    }

    const toReturn = new ReturnHelper(HttpStatusCode.Ok, sanitizedData);
    return toReturn;
  }

  public async cloneRepository(inputs: CloneRepositoriesInput) {
    const callback = async () => {
      await this.testHistoryCrud.insertData({
        repo_name: inputs.repo_name,
        // TODO:
        // If i can, please also setup the S3
        // so we can save the shelljs output for each test run
        outfile_url: "should_be_s3_file_url",
      });
    };
    
    this.gitHelper.cloneRepository({ ...inputs, save_callback: callback });

    return new ReturnHelper(
      HttpStatusCode.Ok,
      [],
      "We are cloning your repo, sit tight!!",
    );
  }
}

export default new GitHandler();
