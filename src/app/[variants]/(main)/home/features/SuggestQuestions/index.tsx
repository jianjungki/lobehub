'use client';

import { Lightbulb } from 'lucide-react';
import { Suspense, memo } from 'react';
import { useTranslation } from 'react-i18next';

import type { StarterMode } from '@/store/home';

import GroupBlock from '../components/GroupBlock';
import List from './List';
import SuggestQuestionsSkeleton from './Skeleton';

interface SuggestQuestionsProps {
  mode: StarterMode;
}

const SuggestQuestions = memo<SuggestQuestionsProps>(({ mode }) => {
  const { t } = useTranslation('common');

  if (!mode || !['agent', 'group', 'write'].includes(mode)) {
    return null;
  }

  return (
    <GroupBlock icon={Lightbulb} title={t('home.suggestQuestions')}>
      <Suspense fallback={<SuggestQuestionsSkeleton />}>
        <List mode={mode} />
      </Suspense>
    </GroupBlock>
  );
});

export default SuggestQuestions;
