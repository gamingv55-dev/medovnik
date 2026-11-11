import { Compass } from 'lucide-react';
import { Button, EmptyState } from '@/components/ui';
import { t } from '@/i18n';

export function NotFound() {
  return (
    <div className="pt-16">
      <EmptyState
        icon={<Compass size={36} strokeWidth={1.4} aria-hidden />}
        title={t.common.notFoundTitle}
        text={t.common.notFoundText}
        action={<Button to="/">{t.common.toHome}</Button>}
      />
    </div>
  );
}
