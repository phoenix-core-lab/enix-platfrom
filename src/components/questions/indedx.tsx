import AccordionItem from "@/components/questions/accordionItem";

const QuestionsContent = () => {
  return (
    <main className="min-h-screen w-full bg-white p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <h1 className="mb-2 text-4xl font-medium text-slate-600">
            PRIVACY POLICY
          </h1>
          <div className="mx-auto h-0.5 w-48 bg-slate-300"></div>
        </div>
        <div className="hidden space-y-12 md:block">
          <section>
            <h2 className="mb-6 text-2xl text-slate-700">
              Our Privacy Policy explains:
            </h2>
            <p className="text-lg leading-relaxed text-slate-600">
              What information we collect and why we collect it. How we use that
              information. The choices we offer, including how to access and
              update information. We've tried to keep it as simple as possible,
              but if you're not familiar with terms like cookies, IP addresses,
              pixel tags and browsers, then read about these key terms first.
              Your privacy matters to us.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              We collect information to provide better services to all of our
              users – from figuring out basic stuff like which language you
              speak, to more complex things like which ads you'll find most
              useful, the people who matter most to you online, or which YouTube
              videos you might like.
            </p>
          </section>
          <section>
            <h2 className="mb-6 text-2xl text-slate-700">
              We collect information in the following ways:
            </h2>
            <p className="text-lg leading-relaxed text-slate-600">
              Information you give us. For example, many of our services require
              you to sign up for an account. When you do, we'll ask for personal
              information, like your name, email address, telephone number or
              credit card to store with your account.
            </p>
          </section>
          <section>
            <h2 className="mb-6 text-2xl text-slate-700">Log Information:</h2>
            <p className="text-lg leading-relaxed text-slate-600">
              When you use our services or view content provided by us, we
              automatically collect and store certain information in server
              logs. This includes: details of how you used our service, such as
              your search queries. Internet protocol address, browser type,
              browser language, the date and time of your request and referral
              URL, cookies that may uniquely identify your browser or your
              Account.
            </p>
          </section>
          <section>
            <h2 className="mb-6 text-2xl text-slate-700">
              Location Information:
            </h2>
            <p className="text-lg leading-relaxed text-slate-600">
              When you use our services, we may collect and process information
              about your actual location.
            </p>
          </section>
          <section>
            <h2 className="mb-6 text-2xl text-slate-700">Local Storage:</h2>
            <p className="text-lg leading-relaxed text-slate-600">
              We may collect and store information (including personal
              information) locally on your device.
            </p>
          </section>
          <section>
            <h2 className="mb-6 text-2xl text-slate-700">
              Cookies and Similar Technologies:
            </h2>
            <p className="text-lg leading-relaxed text-slate-600">
              We and our partners use various technologies to collect and store
              information when you visit our service.
            </p>
          </section>
        </div>
        <div className="space-y-1 md:hidden">
          <AccordionItem title="Our Privacy Policy explains:">
            <p className="text-gray-600">
              What information we collect and why we collect it. How we use that
              information. The choices we offer, including how to access and
              update information. We've tried to keep it as simple as possible,
              but if you're not familiar with terms like cookies, IP addresses,
              pixel tags and browsers, then read about these key terms first.
              Your privacy matters to us.
            </p>
            <p className="mt-4 text-gray-600">
              We collect information to provide better services to all of our
              users – from figuring out basic stuff like which language you
              speak, to more complex things like which ads you'll find most
              useful, the people who matter most to you online, or which YouTube
              videos you might like.
            </p>
          </AccordionItem>
          <AccordionItem title="We collect information in the following ways:">
            <p className="text-gray-600">
              Information you give us. For example, many of our services require
              you to sign up for an account. When you do, we'll ask for personal
              information, like your name, email address, telephone number or
              credit card to store with your account.
            </p>
          </AccordionItem>
          <AccordionItem title="Log Information:">
            <p className="text-gray-600">
              When you use our services or view content provided by us, we
              automatically collect and store certain information in server
              logs. This includes: details of how you used our service, such as
              your search queries. Internet protocol address, browser type,
              browser language, the date and time of your request and referral
              URL, cookies that may uniquely identify your browser or your
              Account.
            </p>
          </AccordionItem>
          <AccordionItem title="Location Information:">
            <p className="text-gray-600">
              When you use our services, we may collect and process information
              about your actual location.
            </p>
          </AccordionItem>
          <AccordionItem title="Local Storage:">
            <p className="text-gray-600">
              We may collect and store information (including personal
              information) locally on your device.
            </p>
          </AccordionItem>
          <AccordionItem title="Cookies and Similar Technologies:">
            <p className="text-gray-600">
              We and our partners use various technologies to collect and store
              information when you visit our service.
            </p>
          </AccordionItem>
        </div>
      </div>
    </main>
  );
};
export default QuestionsContent;
