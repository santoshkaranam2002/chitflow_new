import { TestBed } from '@angular/core/testing';

import { GroupService } from './group.service';

describe('GroupService', () => {
  it('creates a group with a computed monthly contribution', () => {
    const service = TestBed.inject(GroupService);
    const before = service.groups().length;
    const group = service.create({ name: 'Test', value: 100000, members: 20, duration: 20, start: '2026-12-01' });

    expect(service.groups().length).toBe(before + 1);
    expect(group.monthly).toBe(5000);
    expect(service.byId(group.id).name).toBe('Test');
  });
});
