import { PlayCircle, Video } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const videoSections = [
  {
    title: "Getting Started",
    description: "Everything you need to install, set up, and start using the product explained step by step.",
    embedUrl: "../videos/How-Install-and-Setup.mp4",
  },
  {
    title: "Create Custom Actions",
    description: "Design powerful actions to automate workflows and extend what Spark can do.",
    embedUrl: "../videos/How-to-create-custom-actions.mp4",
  },
  {
    title: "Uninstall Guide",
    description: "Follow this quick guide to completely uninstall the application from your device.",
    embedUrl: "../videos/How-to-Uninstall.mp4",
  },
];

const WatchVideos = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Watch Spark Videos"
        description="Watch Spark demos, tutorials, and feature walkthrough videos."
        path="/watch-videos"
        keywords={["Spark demo videos", "Spark tutorials", "Spark feature walkthrough"]}
      />

      <Navbar />

      <main className="relative pt-28 md:pt-36 pb-20 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-72 w-[36rem] rounded-full bg-primary/10 blur-[110px]" />
        </div>

        <div className="container max-w-6xl mx-auto px-6">
          <div className="text-center mb-12 md:mb-14">
            <h1 className="text-4xl md:text-5xl font-bold tracking-[-0.03em] text-gradient mb-4">
              Watch Spark Videos
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Watch step-by-step demos, tutorials, and walkthroughs to learn how to use Spark effectively.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {videoSections.map((section) => (
              <section
                key={section.title}
                className="rounded-2xl border border-border/70 bg-card/80 p-6"
              >
                <div className="flex items-center gap-2 text-foreground mb-3">
                  <PlayCircle className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-semibold">{section.title}</h2>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{section.description}</p>

                {section.embedUrl ? (
                  <div className="overflow-hidden rounded-xl border border-border/80 bg-background/70">
                    <div className="relative aspect-video w-full">
                      <video
                        className="absolute inset-0 h-full w-full"
                        src={section.embedUrl}
                        controls
                        muted
                        loop
                        autoPlay
                        playsInline
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-xl border border-dashed border-border/80 bg-background/70 p-8 flex flex-col items-center justify-center text-center min-h-[220px]">
                    <Video className="w-8 h-8 text-primary/80 mb-3" />
                    <p className="text-sm font-medium text-foreground">YouTube Embed Placeholder</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Replace this block with your embedded video iframe.
                    </p>
                  </div>
                )}
              </section>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default WatchVideos;
