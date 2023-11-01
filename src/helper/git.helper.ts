import { appConfig } from "@Config/app";
import { Octokit } from "octokit";
import path from "path";
import { stringify as urlParamStringify } from "querystring";
import { exec as shellExec, cd as shellCd, rm as shellRm } from "shelljs";

export type GetRepositoriesInput = {
  per_page: number;
  page: number;
};

export type CloneRepositoriesInput = {
  repo_name: string;
  clone_url: string;
  save_callback?: Function;
};

export class GitHelper {
  private client: Octokit;
  private owner: string;
  private accessToken: string;

  constructor() {
    this.owner = appConfig.GITHUB.OWNER;
    this.accessToken = appConfig.GITHUB.ACCESS_TOKEN;
    this.client = new Octokit({
      auth: appConfig.GITHUB.ACCESS_TOKEN,
    });
  }

  public async getRepositories(inputs: GetRepositoriesInput) {
    const urlParams = urlParamStringify(inputs);
    const requestUrl = `GET /user/repos?${urlParams}`;

    return this.client.request(requestUrl, {
      owner: this.owner,
      request: {
        fetch,
      },
    });
  }

  public async cloneRepository(inputs: CloneRepositoriesInput) {
    const rootFolderPath = path.join(__dirname, "..", "..");
    const repoFolder = rootFolderPath + "/cloned-repos/" + inputs.repo_name;

    const cloneUrl = this.constructCloneUrl(inputs.clone_url);
    shellExec(
      `git clone ${cloneUrl} ${repoFolder}`,
      { silent: true },
      async (_code, _output) => {
        console.log("Cd into cloned repo and run install")
        shellCd(repoFolder);
        shellExec("npm install", { silent: true });
        console.log("npm install done")

        console.log("Run unit jest test")
        shellExec("npm run test", { silent: true });
        console.log("npm run test done")

        console.log("Clean up clone folder")
        shellCd("..");
        shellRm("-rf", repoFolder);
        console.log("Done with the clone repo process!!, now saving to database...")

        if (inputs.save_callback) await inputs.save_callback();
        console.log("Done with save!!, have a nice day!")
      },
    );

    return true;
  }

  private constructCloneUrl(cloneUrl: string) {
    const extractedArr = cloneUrl.split("//");
    const credential = `${this.owner}:${this.accessToken}`;
    return `${extractedArr[0]}//${credential}@${extractedArr[1]}`;
  }
}
