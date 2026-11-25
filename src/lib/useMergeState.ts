import { useCallback, useState } from 'react';

/**
 * Class-component style state: `setState(partial)` shallow-merges into the
 * current state. Keeps screen logic close to how the design prototype was written.
 */
export function useMergeState<S extends object>(initial: S) {
  const [state, set] = useState<S>(initial);
  const setState = useCallback((patch: Partial<S>) => set((prev) => ({ ...prev, ...patch })), []);
  return [state, setState] as const;
}
