import { Link } from 'react-router-dom';
import { Badge, Card } from '@/components/ui';
import { abvStandard } from '@/lib/brewing';
import { num } from '@/lib/format';
import { CATEGORY_LABEL, DIFFICULTY_LABEL, fermentedGravity, type Recipe } from '@/content/recipes';
import { t } from '@/i18n';
import { GlassSwatch } from './GlassSwatch';

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link to={`/recipes/${recipe.id}`} className="group block">
      <Card className="flex h-full gap-4 p-4 transition group-hover:border-gold/50">
        <GlassSwatch color={recipe.color} />
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div>
            <h3 className="text-[1.35rem] leading-tight">{recipe.name}</h3>
            <p className="text-[0.88rem] text-muted">{recipe.tagline}</p>
          </div>
          <div className="mt-auto flex flex-wrap gap-1.5">
            <Badge tone="gold">{CATEGORY_LABEL[recipe.category]}</Badge>
            <Badge>{t.sweetness[recipe.sweetness]}</Badge>
            <Badge>≈ {num(abvStandard(recipe.og, fermentedGravity(recipe)), 0)} %</Badge>
            <Badge>{DIFFICULTY_LABEL[recipe.difficulty]}</Badge>
          </div>
        </div>
      </Card>
    </Link>
  );
}
