import { PipeAdminPipe } from './pipe-admin.pipe';

describe('PipeAdminPipe', () => {
  it('create an instance', () => {
    const pipe = new PipeAdminPipe();
    expect(pipe).toBeTruthy();
  });
});
