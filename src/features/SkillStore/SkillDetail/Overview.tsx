'use client';

import { Flexbox, Icon, Tag, Text, Typography } from '@lobehub/ui';
import { cssVar } from 'antd-style';
import { CheckCircle2, ExternalLink, Loader2 } from 'lucide-react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { useDetailContext } from './DetailContext';
import { styles } from './styles';

const Overview = memo(() => {
  const { t } = useTranslation(['plugin']);
  const {
    author,
    authorUrl,
    localizedIntroduction,
    localizedDescription,
    tools,
    toolsLoading,
    isConnected,
  } = useDetailContext();

  const handleAuthorClick = () => {
    if (authorUrl) {
      window.open(authorUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const toolsCount = tools.length;

  return (
    <Flexbox gap={24}>
      {/* Description */}
      {localizedDescription && (
        <Flexbox gap={8}>
          <span className={styles.sectionTitle}>{t('skillDetail.description')}</span>
          <Typography className={styles.introduction}>{localizedDescription}</Typography>
        </Flexbox>
      )}

      {/* Introduction */}
      {localizedIntroduction && (
        <Flexbox gap={8}>
          <span className={styles.sectionTitle}>{t('skillDetail.introduction')}</span>
          <Typography className={styles.introduction}>{localizedIntroduction}</Typography>
        </Flexbox>
      )}

      {/* Details */}
      <Flexbox gap={12}>
        <span className={styles.sectionTitle}>{t('skillDetail.details')}</span>
        <Flexbox gap={16} horizontal wrap="wrap">
          {/* Author */}
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>{t('skillDetail.author')}</span>
            <span
              className={styles.authorLink}
              onClick={handleAuthorClick}
              style={{ cursor: authorUrl ? 'pointer' : 'default' }}
            >
              {author}
              {authorUrl && <Icon icon={ExternalLink} size={12} />}
            </span>
          </div>

          {/* Tools Count */}
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>{t('skillDetail.tools')}</span>
            <Flexbox align="center" gap={4} horizontal>
              {toolsLoading ? <Icon icon={Loader2} size={14} spin /> : <Tag>{toolsCount}</Tag>}
            </Flexbox>
          </div>

          {/* Connection Status */}
          {isConnected !== undefined && (
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>{t('skillDetail.status')}</span>
              <Flexbox align="center" gap={4} horizontal>
                {isConnected ? (
                  <>
                    <Icon color={cssVar.colorSuccess} icon={CheckCircle2} size={14} />
                    <Text style={{ fontSize: 12 }}>{t('skillDetail.status.connected')}</Text>
                  </>
                ) : (
                  <Text style={{ fontSize: 12 }} type="secondary">
                    {t('skillDetail.status.notConnected')}
                  </Text>
                )}
              </Flexbox>
            </div>
          )}
        </Flexbox>
      </Flexbox>

      {/* Developed by */}
      <Flexbox gap={8}>
        <Flexbox align="center" gap={4} horizontal>
          <span className={styles.sectionTitle}>{t('skillDetail.developedBy')}</span>
          <span
            className={styles.authorLink}
            onClick={handleAuthorClick}
            style={{ cursor: authorUrl ? 'pointer' : 'default' }}
          >
            {author}
            {authorUrl && <Icon icon={ExternalLink} size={12} />}
          </span>
        </Flexbox>
        <Text className={styles.trustWarning} type="secondary">
          {t('skillDetail.trustWarning')}
        </Text>
      </Flexbox>
    </Flexbox>
  );
});

export default Overview;
