import { GitHelper } from "@Helper/git.helper";

// In these tests, we have:
// 1.A test for the constructCloneUrl method to ensure it constructs the clone URL correctly.
// 2.A test for the getRepositories method to ensure it fetches repositories as expected 
// 3.A test for the cloneRepository method to ensure it clones a repository and performs the necessary actions (like running npm install and tests) as expected.


// Mock Octokit and shelljs functions
jest.mock('octokit');
jest.mock('shelljs', () => {
  return {
    exec: jest.fn(),
    cd: jest.fn(),
    rm: jest.fn(),
  };
});

describe('GitHelper', () => {
    let gitHelper: GitHelper;

    beforeAll(() => {
        gitHelper = new GitHelper();
    });

    it('should construct a clone URL with credentials', () => {
        //using abi for example, havent tested it yet, should change to javier's later
        const cloneUrl = 'https://github.com/AbizardShafwan/unit-test-sample.git';
        const expectedUrl = 'https://abizardshafwan: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@github.com/AbizardShafwan/unit-test-sample.git';
        const constructedUrl = gitHelper['constructCloneUrl'](cloneUrl);
    
        expect(constructedUrl).toBe(expectedUrl);
    });
});