import { PlasmicCanvasHost } from '@plasmicapp/loader-nextjs';
import { Plasmic } from 'lib/plasmic/plasmic';
import Script from 'next/script';

const PlasmicHost = () => {
  return (
    Plasmic && (
      <div>
        <Script
          src={process.env.NEXT_PUBLIC_PLASMIC_PREAMBLE_SCRIPT_URL}
          strategy="beforeInteractive"
        />
        <PlasmicCanvasHost />
      </div>
    )
  );
};

export default PlasmicHost;
