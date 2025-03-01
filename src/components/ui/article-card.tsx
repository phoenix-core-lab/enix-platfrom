import React from "react";

const ArtileCard = () => {
  return (
    <button
      style={{ border: "1px solid #FFFFFF1A" }}
      className="hidden flex-col items-start gap-2 rounded-[8px]  p-3 text-left text-sm transition-all hover:bg-background-hover  lg:flex"
    >
      <div className="flex w-full flex-col gap-1">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <div className="font-semibold text-text ">William Smith</div>
          </div>
          <div className="ml-auto text-xs text-muted-foreground">
            over 1 year ago
          </div>
        </div>
        <div className="text-xs font-medium text-text">Meeting Tomorrow</div>
      </div>
      <div className="line-clamp-2 text-xs text-muted-foreground">
        Hi, let's have a meeting tomorrow to discuss the project. I've been
        reviewing the project details and have some ideas I'd like to share.
        It's crucial that we align on our next steps to ensure the project's
        success. Please come prepared with any questions or insights you may
        have. Looking forward to
      </div>
      <div className="flex items-center gap-2">
        <div className="inline-flex items-center rounded-[6px] border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
          meeting
        </div>
        <div className="inline-flex items-center rounded-[6px] border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80">
          work
        </div>
        <div className="inline-flex items-center rounded-[6px] border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
          important
        </div>
      </div>
    </button>
  );
};

export default ArtileCard;
