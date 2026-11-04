import { IFM_CONNECTION_TECHNOLOGY_CATEGORY } from './ifmInductiveSubcategories.ts';

const IFM_CONNECTION_TECHNOLOGY_IMAGE_PATH = '/images/ifm/connection-technology-subcategories';

const connectionTechnologySubcategoryGroups = [
  {
    title: 'Câbles prêts à l’emploi / au mètre',
    names: [
      'Câbles de raccordement, extrémité du câble ouverte',
      'Prolongateurs',
      'Câbles de raccordement pour systèmes de contrôle-commande',
      'Câbles de programmation et de communication',
      'Câble au mètre',
    ],
  },
  {
    title: 'Connecteurs',
    names: ['À câbler', 'Bornes', 'Connecteurs intégrés'],
  },
  {
    title: 'Répartiteurs',
    names: ['Répartiteur', 'Répartiteurs en Y'],
  },
] as const;

let connectionTechnologySubcategoryIndex = 0;

export const IFM_CONNECTION_TECHNOLOGY_GROUPS = connectionTechnologySubcategoryGroups.map(
  ({ title, names }) => ({
    title,
    subcategories: names.map((name) => {
      connectionTechnologySubcategoryIndex += 1;

      return {
        name,
        image: `${IFM_CONNECTION_TECHNOLOGY_IMAGE_PATH}/connection-${String(connectionTechnologySubcategoryIndex).padStart(2, '0')}.png`,
      };
    }),
  }),
);

export { IFM_CONNECTION_TECHNOLOGY_CATEGORY };
