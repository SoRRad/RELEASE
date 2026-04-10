import Head from "next/head";
import ReleaseApp from "../components/RELEASE";

export default function Home() {
  return (
    <>
      <Head>
        <title>RELEASE — Spasticity & Hand Surgery Education · Mayo Clinic</title>
        <meta
          name="description"
          content="Personalized patient education for spinal cord injury patients navigating spasticity and hand surgery at Mayo Clinic."
        />
      </Head>
      <ReleaseApp />
    </>
  );
}