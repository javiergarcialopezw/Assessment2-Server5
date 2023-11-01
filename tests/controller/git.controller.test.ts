import { Request, Response } from 'express';
import GitController from '@Controller/git.controller'; 
import GitHandler from '@Handler/git.handler'; 

// In these tests:
// 1.We import the GitController and GitHandler classes.
// 2.We mock the Express Request and Response objects to simulate HTTP requests.
// 3.We mock the GitHandler methods to return specified results.
// 4.We call the getRepositories and cloneRepo methods of the GitController class.
// 5.We use the Jest expect function to check that the response status and data match the expected values.
// 6.We ensure that the GitHandler methods were called with the expected inputs.

describe('GitController', () => {
  it('should get repositories', async () => {
    // Mock Express Request and Response objects
    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(), // Mock Express response.status()
      send: jest.fn(), // Mock Express response.send()
    } as unknown as Response;

    // Mock GitHandler to return a result
    GitHandler.getRepositories = jest.fn().mockResolvedValue({ status: 200, data: [] });

    // Call the getRepositories method
    await GitController.getRepositories(req, res);

    // Verify the status and response data
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ status: 200, data: [] });

    // Ensure GitHandler.getRepositories was called with the expected inputs
    expect(GitHandler.getRepositories).toHaveBeenCalledWith(req.query);
  });

  it('should clone a repository', async () => {
    // Mock Express Request and Response objects
    const req = {
      body: { /* your request body here */ },
    } as Request;
    const res = {
      status: jest.fn().mockReturnThis(), // Mock Express response.status()
      send: jest.fn(), // Mock Express response.send()
    } as unknown as Response;

    // Mock GitHandler to return a result
    GitHandler.cloneRepository = jest.fn().mockResolvedValue(true);

    // Call the cloneRepo method
    await GitController.cloneRepo(req, res);

    // Verify the status and response data
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(true);

    // Ensure GitHandler.cloneRepository was called with the expected inputs
    expect(GitHandler.cloneRepository).toHaveBeenCalledWith(req.body);
  });
});