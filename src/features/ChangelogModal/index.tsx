'use client';

import { useTimeout } from 'ahooks';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGlobalStore } from '@/store/global';

const ChangelogModal = memo<{ currentId?: string }>(({ currentId }) => {
  const [latestChangelogId, updateSystemStatus, hasShownChangelog] = useGlobalStore((s) => [
    s.status.latestChangelogId,
    s.updateSystemStatus,
    s.status.hasShownChangelog,
  ]);
  const navigate = useNavigate();

  useTimeout(() => {
    if (!currentId) return;
    if (hasShownChangelog) return;

    if (!latestChangelogId) {
      updateSystemStatus({ hasShownChangelog: true, latestChangelogId: currentId });
    } else if (latestChangelogId !== currentId) {
      updateSystemStatus({ hasShownChangelog: true });
      navigate('/changelog/modal');
    }
  }, 1000);

  return null;
});

export default ChangelogModal;
