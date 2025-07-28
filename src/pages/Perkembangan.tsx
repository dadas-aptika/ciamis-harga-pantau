import { useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Perkembangan = () => {
  const vizContainerRef = useRef(null);

  useEffect(() => {
    // Load Tableau script when component mounts
    const script = document.createElement("script");
    script.src = "https://public.tableau.com/javascripts/api/viz_v1.js";
    script.async = true;
    document.head.appendChild(script);

    // Function to adjust iframe size
    const adjustVizSize = () => {
      if (vizContainerRef.current) {
        const containerWidth = vizContainerRef.current.offsetWidth;
        const containerHeight = vizContainerRef.current.offsetHeight;

        const iframe = vizContainerRef.current.querySelector("iframe");
        if (iframe) {
          iframe.style.width = "100%";
          iframe.style.height = `${containerHeight}px`;
          iframe.style.minHeight = "800px";
          iframe.style.border = "none";
        }
      }
    };

    // Initial adjustment
    adjustVizSize();

    // Set up mutation observer to detect when iframe is loaded
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          adjustVizSize();
        }
      });
    });

    if (vizContainerRef.current) {
      observer.observe(vizContainerRef.current, {
        childList: true,
        subtree: true,
      });
    }

    // Adjust on window resize
    window.addEventListener("resize", adjustVizSize);

    return () => {
      // Cleanup
      document.head.removeChild(script);
      window.removeEventListener("resize", adjustVizSize);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Perkembangan Harga Komoditas
          </h1>
          <p className="text-muted-foreground">
            Dashboard analisis perkembangan harga komoditas dari berbagai pasar
          </p>
        </div>

        <div className="bg-card rounded-lg p-6 shadow-sm w-full h-full">
          <div
            ref={vizContainerRef}
            className="w-full h-full min-h-[800px]"
            dangerouslySetInnerHTML={{
              __html: `
                <noscript>
                  <a href='#'>
                    <img alt='Dashboard Harga' src='https://public.tableau.com/static/images/sa/sampel_hk/Dashboard1/1_rss.png' style='border: none' />
                  </a>
                </noscript>
                <object class='tableauViz' style='display:none;'>
                  <param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' />
                  <param name='embed_code_version' value='3' />
                  <param name='site_root' value='' />
                  <param name='name' value='sampel_hk/Dashboard1' />
                  <param name='tabs' value='no' />
                  <param name='toolbar' value='yes' />
                  <param name='static_image' value='https://public.tableau.com/static/images/sa/sampel_hk/Dashboard1/1.png' />
                  <param name='animate_transition' value='yes' />
                  <param name='display_static_image' value='yes' />
                  <param name='display_spinner' value='yes' />
                  <param name='display_overlay' value='yes' />
                  <param name='display_count' value='yes' />
                  <param name='language' value='en-US' />
                  <param name='filter' value='iframeSizedToWindow=true' />
                </object>
                <script type='text/javascript'>
                  var divElement = document.currentScript.parentElement;
                  var vizElement = divElement.getElementsByTagName('object')[0];
                  
                  vizElement.style.width = '100%';
                  vizElement.style.height = '100%';
                  vizElement.style.minHeight = '800px';
                  
                  var scriptElement = document.createElement('script');
                  scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
                  vizElement.parentNode.insertBefore(scriptElement, vizElement);
                </script>
              `,
            }}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Perkembangan;
