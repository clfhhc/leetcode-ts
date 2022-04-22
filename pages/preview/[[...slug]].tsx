import {
  ComponentRenderData,
  PlasmicComponent,
  PlasmicRootProvider,
} from '@plasmicapp/loader-nextjs';
import { Plasmic } from 'lib/plasmic/plasmic';
import { getUrqlClientOptions } from 'lib/urql/getUrqlClientOptions';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import Error from 'next/error';

export interface PageProps {
  plasmicData?: ComponentRenderData;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await Plasmic.fetchPages();
  return {
    paths: pages.map((page) => ({
      params: {
        slug: page.path.substring(1).split('/'),
      },
    })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<PageProps> = async (ctx) => {
  const { slug } = ctx.params ?? {};

  const plasmicPath =
    typeof slug === 'string'
      ? slug
      : Array.isArray(slug)
      ? `/${slug.join('/')}`
      : '/';

  const plasmicData = await Plasmic.maybeFetchComponentData(plasmicPath);

  if (plasmicData) {
    return {
      props: {
        plasmicData,
      },
      revalidate: 300,
    };
  } else {
    return {
      props: {},
    };
  }
};

const CatchallPage: NextPage<PageProps> = ({ plasmicData }) => {
  if (!plasmicData || plasmicData.entryCompMetas.length === 0) {
    return <Error statusCode={404} />;
  }

  const pageMeta = plasmicData.entryCompMetas[0];
  return (
    <PlasmicRootProvider loader={Plasmic} prefetchedData={plasmicData}>
      {
        // plasmicData.entryCompMetas[0].name contains the name
        // of the component you fetched.
      }
      <PlasmicComponent component={pageMeta.name} />
    </PlasmicRootProvider>
  );
};

export default withUrqlClient(getUrqlClientOptions())(CatchallPage);
