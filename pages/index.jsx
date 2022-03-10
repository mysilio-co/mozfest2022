import Link from "next/link";
import Head from "next/head";
import { MysilioPointer } from "../components/MonetizationPicker";
import { useWebMonetization } from "../model/utils";

export default function ExquisiteIntro() {
  const { isMonetizing } = useWebMonetization();

  return (
    <main className="min-h-screen bg-gradient-to-r from-my-green via-ocean to-my-purple">
      <Head>
        <meta name="monetization" content={MysilioPointer} key="monetization" />
      </Head>
      <section className="min-h-screen relative mx-auto w-4/5 bg-white/90 shadow-2xl py-20">
        <div className="text-lg max-w-prose mx-auto">
          <h1>
            <span className="block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase">
              Mysilio Presents
            </span>
            <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              MozFest Reflections
            </span>
          </h1>
        </div>
        <div className="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto">
          <p className="mt-8 text-xl text-gray-500 leading-8">
            Welcome to Reflections, a Web Monetized way to share your thoughts
            on MozFest with the community. Participating is easy! Just&nbsp;
            {!isMonetizing ? (
              <span>click the link below to get started.</span>
            ) : (
              <Link href="/reflect">
                <a>click here to get started.</a>
              </Link>
            )}
            &nbsp; You’ll be taken to a screen with a reflections written by
            previous participants, as well as a form to submit your own
            reflection. Don't forget to tip the contributions you love the
            most!
          </p>
          <h2>Who built this?</h2>
          <p>
            <a href="https://mysilio.com/">Mysilio</a> is a consulting firm
            dedicated to building web technology that supports networks of
            caring, interdependent humans. This is one of many experiments we're
            running with Web Monetization and Solid, supported by the generous
            grant funding of&nbsp;
            <a href="https://www.grantfortheweb.org/">Grant for the Web</a>. To
            learn more about our work and our experiments, you can&nbsp;
            <ul>
              <li>
                <a href="https://mailchi.mp/865966fe3848/mysilio-waitlist">
                  Join our mailing list
                </a>
              </li>
              <li>
                <a href="https://twitter.com/my_silio">Follow us on Twitter</a>
              </li>
              <li>
                <a
                  className="font-bold"
                  href="https://mailchi.mp/865966fe3848/mysilio-waitlist"
                >
                  Register for our prototype Web Monetized publishing platform
                </a>
              </li>
            </ul>
          </p>
          <h2>What is Web Monetization?</h2>
          <p>
            <a href="https://webmonetization.org/docs/explainer/">
              Web Monetization
            </a>
            &nbsp; is a proposed W3C standard that enables website visitors with
            the ability to stream micropayments directly to content creators,
            tip to reward particularly good content, and even gate content on
            payment, providing a viable alternative to advertising based
            buisiness models on the web. Monetizing your site is easy! All you
            need to do is add the following
            <span className="font-mono text-rose-600">{" <meta> "}</span>
            tag to the
            <span className="font-mono text-rose-600">{" <head> "}</span>
            section of all pages on your website.
          </p>
          <p>
            <span className="font-mono text-rose-600">
              {'<meta name="monetization" content="$YourPaymentPointer" />'}
            </span>
          </p>
          <h2>What is Solid?</h2>
          <p>
            <a href="https://solidproject.org/">Social Linked Data</a>, or
            Solid, is a proposed W3C standard for giving users control over
            their online presence and ownship over their data. With Solid
            personal data is stored in shared RDF datastores, and the user can
            upload, revoke, or reshare the data in their datastore at any time,
            with any app. For developers building apps on top of this data,
            Solid provides a rich toolset for data interoperability and storage,
            allowing interactive applications like this one to be built quickly
            without deploying additional backend servers.
          </p>
          <div className="text-right">
            {!isMonetizing ? (
              <h2>Please enable Web Monetization to participate</h2>
            ) : (
              <h2>
                <Link href={`/reflect`}>
                  <a>Add your reflection</a>
                </Link>
              </h2>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
