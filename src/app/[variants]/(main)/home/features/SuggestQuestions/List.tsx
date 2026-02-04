'use client';

import { Flexbox } from '@lobehub/ui';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { type StarterMode } from '@/store/home';

import Item from './Item';
import { useRandomQuestions } from './useRandomQuestions';

interface ListProps {
  mode: StarterMode;
}

const List = memo<ListProps>(({ mode }) => {
  const { t } = useTranslation('suggestQuestions');
  const questions = useRandomQuestions(mode);

  if (questions.length === 0) {
    return null;
  }

  return (
    <Flexbox gap={12} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
      {questions.map((item) => {
        const prompt = t(item.promptKey as any);
        return (
          <Item
            description={prompt}
            key={item.id}
            prompt={prompt}
            title={t(item.titleKey as any)}
          />
        );
      })}
    </Flexbox>
  );
});

export default List;
