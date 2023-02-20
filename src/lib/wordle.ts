function test(t: string) {
  return t;
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;

  it('test', () => {
    const t = 'Test';
    expect(test(t)).toBe(t);
  });
}
