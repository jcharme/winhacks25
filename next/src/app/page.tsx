// import BarChart from "@components/BarChart"

import Link from "next/link";

export default function Home() {
  return (
    <>
      <Link href="/login" className="block">
        Login
      </Link>
      <Link href="/whos-next" className="block">
        Who&apos;s next?
      </Link>
    </>
  );
}
