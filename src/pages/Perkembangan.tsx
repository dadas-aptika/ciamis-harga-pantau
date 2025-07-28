import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Perkembangan = () => {
  useEffect(() => {
    // Load Tableau script when component mounts
    const script = document.createElement('script');
    script.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup script when component unmounts
      document.head.removeChild(script);
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

        <div className="w-full">
          <div 
            className='tableauPlaceholder w-full' 
            id='viz1718257506765' 
            style={{position: 'relative', width: '100%', height: '1200px'}}
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
                </object>
                <script type='text/javascript'>
                  var divElement = document.getElementById('viz1718257506765');
                  var vizElement = divElement.getElementsByTagName('object')[0];
                  vizElement.style.width='100%';
                  vizElement.style.height='1200px';
                  vizElement.style.minHeight='1200px';
                  var scriptElement = document.createElement('script');
                  scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
                  vizElement.parentNode.insertBefore(scriptElement, vizElement);
                </script>
              `
            }}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Perkembangan;